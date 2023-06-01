import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: '1',
    description: '유저 아이디',
  })
  id: number;

  @Column()
  @ApiProperty({
    example: 'annjy@clacorp.co.kr',
    description: '이메일',
  })
  email: string;

  @Column()
  @ApiProperty({
    example: 'swagger',
    description: '비밀번호',
  })
  password: string;
}
