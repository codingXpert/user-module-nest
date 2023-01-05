import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  async create(body:CreateUserDto , password:string):Promise<CreateUserDto> {
    const user = this.repo.create({...body , password})
   return this.repo.save(user);
  }

  find(email: string):Promise<CreateUserDto[]>{
     return this.repo.find()
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number): Promise<CreateUserDto> {
    if(!id){
      return null;
    }
    return //this.repo.findOne();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
