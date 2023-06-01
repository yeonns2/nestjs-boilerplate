import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CustomRepository } from 'src/util/decorators/typeorm.ex/typeorm-ex.decorator';

@CustomRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    const user = this.create({
      email,
      password,
    });
    await this.save(user);
    return user;
  }
}
