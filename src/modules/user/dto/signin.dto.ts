import { IsAlphanumeric, IsNotEmpty, IsString } from "class-validator";

export class SigninDto{
    
    @IsAlphanumeric()
    @IsNotEmpty()
    userName: string

    @IsString()
    @IsNotEmpty()
    password: string
}