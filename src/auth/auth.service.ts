import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon2 from "argon2";


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    
    async signup(dto: AuthDto) {
        // generate the password hash
        const hash = await argon2.hash(dto.password);
        
        // save the new user in the db
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
            },
            
        });
        
        delete user.hash
        // return the saved user

        return {
            "User created successfully": user
        };
    }
    
    signin() {
        return {msg:'I am signed in'};
    }
}