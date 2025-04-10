import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('User') // Groups routes under "User"
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: RegisterUserDto,
    examples: {
      default: {
        summary: 'Sample registration',
        value: {
          fullName: 'Ash Ketchum',
          email: 'ash@example.com',
          password: 'pikachu123',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    schema: {
      example: {
        id: 'cf8123e4-12cd-4c88-9a24-1e0b6d6e3f79',
        fullName: 'Ash Ketchum',
        email: 'ash@example.com',
        createdAt: '2025-04-10T10:00:00.000Z',
        updatedAt: '2025-04-10T10:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async register(@Body() dto: RegisterUserDto) {
    return this.userService.registerUser(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({
    type: LoginUserDto,
    examples: {
      default: {
        summary: 'Sample login',
        value: {
          email: 'ash@example.com',
          password: 'pikachu123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 'cf8123e4-12cd-4c88-9a24-1e0b6d6e3f79',
          email: 'ash@example.com',
          fullName: 'Ash Ketchum',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() dto: LoginUserDto) {
    return this.userService.loginUser(dto);
  }
}
