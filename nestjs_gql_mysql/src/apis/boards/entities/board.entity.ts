import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  number: number;

  @Column()
  @Field(() => String)
  writer: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;
}

/**
 * @Entity : Board class가 실행될 때, typeorm에 의해 Entity 테이블을 만들어 줍니다.
 * @PrimaryGeneratedColumn : 자동으로 생성될 값의 컬럼입니다.
 *   - increment : 데이터가 한 줄씩 쌓일 때마다 자동으로 숫자가 1씩 증가하여 값이 생성됩니다.
 *   - uuid : 중복되지 않는 문자열 ID가 자동으로 생성됩니다.
 * @Column : 표 형태에서 열에 해당. 실제 들어갈 데이터의 값의 컬럼입니다.
 */

/**
 * @ObjectType : GraphQL에서 사용할 수 있는 타입으로 변환
 * @Field : GraphQL 필드와 타입 지정
 */
