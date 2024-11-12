import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findOneByEmail({ email }: { email: string }): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create({
    email,
    password,
    name,
    age,
  }: {
    email: string;
    password: string;
    name: string;
    age: number;
  }): Promise<User> {
    const user = await this.findOneByEmail({ email });
    // if (user) throw new HttpException('이미 등록된 이메일입니다.', HttpStatus.CONFLICT);
    if (user) throw new ConflictException('이미 등록된 이메일입니다.');

    /* Hash 알고리즘 + salt로 패스워드를 암호화 */
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersRepository.save({
      email,
      password: hashedPassword,
      name,
      age,
    });
  }
}
