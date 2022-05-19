import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
) {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        })
    }

    //Remember to check if token is expired to avoid 401.
    async validate(payload: { sub: number, email: string }) {
        const user = await this.prisma.user.findUnique(
            {
                where: {
                    email: payload.email,
                },
            });
        console.log(user);
        delete user.hash;
        return user;
    }

}