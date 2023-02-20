import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  async create(body: CreateUserDto, password: string): Promise<CreateUserDto> {
    const user = this.repo.create({ ...body, password })
    return this.repo.save(user);
  }

  find(email) {
    return this.repo.find(email)
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number): Promise<CreateUserDto> {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({id});
  }
  findByUserName(userName: string) {
    if (!userName) {
      return null;
    }
    return this.repo.findOneBy({ userName })
  }

  findByEmail(email: string) {
    return this.repo.findOneBy({ email })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async updatePassword(data:any){
     return this.repo.createQueryBuilder()
     .update(User)
     .set({password:data})
    //  .where("id = :id", { id: id })
     .execute();
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
