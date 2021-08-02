import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";

import { UsersModel } from "../entities/Users";
import { MyContextT } from "../types/types";
import { LoginInput } from "../types/auth-input";


@ObjectType()
export class LoginRespose {
   @Field(() => String, { nullable: true })
   role: string

   @Field()
   isAuth: boolean
}

@Resolver()
export class AuthResolver {

   @Mutation(() => LoginRespose)
   async login(@Arg("data") { email }: LoginInput, @Ctx() ctx: MyContextT) {

      try {
         const user = await UsersModel.findOne({ email })
         if (!user) {   
            return { role: null, isAuth: false }
         }
         ctx.res.cookie(`token`, user._id)
         return { role: user.role, isAuth: true }
      } catch (e) {
         console.error(e)
         return { role: null, isAuth: false }
      }

   }

}