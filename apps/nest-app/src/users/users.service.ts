import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserResponseDto } from './dto/user-response.dto.js';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existing = this.users.find((u) => u.email === createUserDto.email);
    if (existing) {
      throw new ConflictException('E-mail já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user: User = {
      id: randomUUID(),
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    this.users.push(user);
    return this.toResponseDto(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email === email);
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return this.toResponseDto(user);
  }

  private toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
