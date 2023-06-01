import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  async createUser(createUserDto: CreateUserDto) {
    return this.usersRepository.createUser(createUserDto);
  }

  async getUsers() {
    return this.usersRepository.find();
  }

  async getUserById(id: number) {
    const found = await this.usersRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException('해당 유저가 존재하지 않습니다.');
    }
    return found;
  }

  async updateUserPassword(id: number, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;
    const user = await this.getUserById(id);
    user.password = password;
    await this.usersRepository.save(user);
    return user;
  }

  async deleteUser(id: number) {
    const result = this.usersRepository.delete(id);
    if ((await result).affected === 0) {
      throw new NotFoundException('삭제할 유저가 없습니다.');
    }
  }
}
