import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { UsersModel } from "../entities/Users";
import { MyContextT } from "../types/types";
import { LoginInput } from "../types/auth-input";
import { getCookie } from "../utils/getCookie";

const SECRET_KEY = `verySecretKey`


@ObjectType()
export class LoginRespose {
   @Field(() => String, { nullable: true })
   role: string

   @Field()
   isAuth: boolean

   @Field({ nullable: true })
   message: string
}

@Resolver()
export class AuthResolver {

   @Mutation(() => LoginRespose)
   async login(@Arg("data") { email, password }: LoginInput, @Ctx() ctx: MyContextT) {

      try {
         const user = await UsersModel.findOne({ email })
         if (!user) {
            return { role: null, isAuth: false, message: `User doesn't exist` }
         }


         const isMatchPass = await bcrypt.compare(password, user.password)

         if (!isMatchPass) {
            return { role: null, isAuth: false, message: 'Wrong password' }
         }

         const token = jwt.sign(
            { userId: user._id },
            SECRET_KEY,
            { expiresIn: `30d` }
         )
         ctx.res.cookie(`token`, token)

         return { role: user.role, isAuth: true }
      } catch (e) {
         console.error(e)
         return { role: null, isAuth: false }
      }
   }


   @Query(() => LoginRespose)
   async checkToken(@Ctx() ctx: MyContextT) {

      try {

         const token = getCookie(`token`, ctx.req.headers.cookie ? ctx.req.headers.cookie : ``)

         if (!token) {
            return { role: null, isAuth: false, message: `No token` }
         }

         const { userId } = jwt.verify(token, SECRET_KEY) as { userId: string, role: string }

         const user = await UsersModel.findOne({ _id: userId })

         if (!user) {
            return { role: null, isAuth: false }
         }


         return { role: user.role, isAuth: true }
      } catch (e) {
         console.error(e)
         return { role: null, isAuth: false }
      }
   }

}