import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ example: 'ash@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'AshKetchum123',
    minLength: 6,
    description:
      'Must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;

  @ApiProperty({ example: 'Ash Ketchum' })
  @IsNotEmpty()
  fullName: string;
}
