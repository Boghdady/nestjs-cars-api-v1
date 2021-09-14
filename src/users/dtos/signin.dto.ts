import { IsEmail, IsString, MaxLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(8, { message: 'password length should be 8 characters' })
  password: string;
}
