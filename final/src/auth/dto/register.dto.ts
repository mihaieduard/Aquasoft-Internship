// auth/dto/register.dto.ts
import { IsEmail, IsString, MinLength, IsUrl, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(3)
    password: string;

    @IsOptional()
    @Transform(({ value }) => value ?? 3) // Use 1 if value is null or undefined
    RoleId: number;
}