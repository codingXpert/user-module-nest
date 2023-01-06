import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    lastName: string
}
