import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon2 from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    
    async signup(dto: AuthDto) {
        // generate the password hash
        const hash = await argon2.hash(dto.password);
        
        // save the new user in the db
        try {
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
            
        } catch (error) {
          if (error instanceof PrismaClientKnownRequestError) {
              if (error.code === 'P2002') {
                  throw new ForbiddenException('Email already in use')
              }
          }
          throw error;
        }
        
    }
    
    async signin(dto: AuthDto) {

        // find the user by email
        // if user does not exist throw excetion

        // compare password
        // if password incorrect throw exception

        // send back the user
        return {msg:'I am signed in'};
    }
}