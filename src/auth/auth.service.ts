import { ForbiddenException, Injectable, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { signUpDto, loginDto } from "./dto";
import * as argon from "argon2"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) { }

    async signUp(dto: signUpDto) {
        // generate new password
        const hash = await argon.hash(dto.password);
        // save new user in db
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                    dni: dto.dni,
                    name: dto.name,
                    surname: dto.surname,
                    address: dto.address,
                    phoneNumber: dto.phoneNumber,
                    userTypeId: dto.userTypeId,
                },
            });

            return this.signToken(user.id, user.email);

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Credentials taken'
                    )
                }
            }
        }

    }

    async login(dto: loginDto) {

        // find user by email
        const user =
            await this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                }
            });
        // if user does not exist throw exception
        if (!user) {
            throw new ForbiddenException(
                'Email is not registered'
            )
        }
        //compare password
        const pwMatches = await argon.verify(user.hash, dto.password)
        //if password incorrect throw exception
        if (!pwMatches) {
            throw new ForbiddenException(
                'Password invalid'
            )
        }
        //send back user
        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string)
        : Promise<{ access_token: string }> {

        const payload = {
            sub: userId,
            email,
        }

        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '15m',
                secret: secret,
            }
        )

        return {
            access_token: token,
        };
    }
}