import { ParseIntPipe } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString, } from "class-validator";

export class signUpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    dni: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    surname: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    userTypeId: number;
}

export class loginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}