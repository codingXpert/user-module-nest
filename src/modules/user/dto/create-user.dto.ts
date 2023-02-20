import {
    IsEmail, 
    IsNotEmpty, 
    IsString, 
    Matches, 
} from "class-validator";
import { MESSAGES, REGEX  } from "src/password-utils";

export class CreateUserDto {

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
    @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
    password: string
}
