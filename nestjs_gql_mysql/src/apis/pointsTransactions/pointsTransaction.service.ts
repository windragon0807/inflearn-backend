import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import {
  POINT_TRANSACTION_STATUS_ENUM,
  PointTransaction,
} from './entities/pointTransaction.entity';
import { IAuthUser } from 'src/common/interfaces/context';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PointsTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    /* DataSource 객체는 이미 TypeOrm Module을 import 한 것만으로도 의존성을 가져올 수 있습니다. */
    private readonly dataSource: DataSource,
  ) {}

  async create({
    impUid,
    amount,
    user: _user,
  }: {
    impUid: string;
    amount: number;
    user: IAuthUser['user'];
  }): Promise<PointTransaction> {
    /** 트랜잭션 시작 */
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      /** 1. PointTransaction 테이블에 거래기록 1줄 생성 */
      const pointTransaction = this.pointTransactionRepository.create({
        impUid,
        amount,
        user: _user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      // await this.pointTransactionRepository.save(pointTransaction);
      await queryRunner.manager.save(pointTransaction);

      /** 2. 유저의 돈 찾아서 업데이트하기 */
      const id = _user.id;
      await queryRunner.manager.increment(User, { id }, 'point', amount);
      await queryRunner.commitTransaction();

      /** 트랜잭션 커밋 */
      await queryRunner.commitTransaction();

      /** 최종결과 브라우저에 돌려주기 */
      return pointTransaction;
    } catch (error) {
      /** 트랜잭션 롤백 */
      await queryRunner.rollbackTransaction();
    } finally {
      /** 트랜잭션 종료 */
      /* release를 하지 않으면 커넥션이 끊기지 않아서 계속 누적됩니다. */
      await queryRunner.release();
    }
  }
}

/**
 * 조작하고자 하는 데이터가 숫자가 아닌 경우 아래와 같이 직접 조회, 갱신을 처리해야 합니다.
 * 2. 유저의 돈 찾아오기
 *   // const user = await this.usersRepository.findOne({
 *   //   where: { id: _user.id },
 *   // });
 *   const user = await queryRunner.manager.findOne(User, {
 *     where: { id: _user.id }, // row-lock
 *     lock: { mode: 'pessimistic_write' },
 *   });

 * 3. 유저의 돈 업데이트
 *   // await this.usersRepository.update(
 *   //   { id: _user.id },
 *   //   { point: user.point + amount },
 *   // );
 *   # id 속성이 포함되어 있으면 생성이 아닌 업데이트로 처리됩니다.
 *   const updatedUser = this.usersRepository.create({
 *     ...user,
 *     point: user.point + amount,
 *   });
 *   await queryRunner.manager.save(updatedUser);
 */
