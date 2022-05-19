import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserTypeModule } from './user-type/user-type.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    UserTypeModule,
    PrismaModule],
})
export class AppModule { }
