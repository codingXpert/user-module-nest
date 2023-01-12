import { IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber, isNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    // @IsNotEmpty()
    @IsNumber()
    id:number

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string

}
