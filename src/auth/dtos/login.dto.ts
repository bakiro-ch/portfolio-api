import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword, Length } from "class-validator";

export class LoginDto{

    @ApiProperty({description: 'User email address', example: "example@mail.com", minLength: 5, maxLength: 100})
    @IsEmail() @Length(5,100)
    email!: string

    @ApiProperty({description: 'User password', example: "securePassword", minLength:8, maxLength: 100})
    @IsString() @Length(8,100)
    password!: string
}