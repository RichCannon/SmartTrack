//import { ObjectId } from "mongoose";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { Users, UsersModel } from "../entities/Users";
import { CreateUserInput } from "../types/users-input";

// const users = [
//    {
//       id: 1,
//       role: `admin`,
//       email: `admin@gmail.com `,
//       name: `Admin1 Admin2`,
//    }
// ]




@Resolver()
export class UsersResolver {

   @Query(() => [Users])
   async getAllUsers() {
      return UsersModel.find()
   }

   @Query(() => Users, { nullable: false })
   async getUser(@Arg("id") id: string) {
      return UsersModel.findById(id)
   }

   @Mutation(() => Boolean)
   async createUser(@Arg("data") data: CreateUserInput) {
      (await UsersModel.create(data)).save()
      return true
   }

}
