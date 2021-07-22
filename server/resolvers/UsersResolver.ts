import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { Users, UsersModel } from "../entities/Users";
import { AddRoomToDoctor, CreateUserInput } from "../types/users-input";


@Resolver()
export class UsersResolver {

   // @Query(() => [Users])
   // async getAllUsers() {
   //    return await UsersModel.aggregate([{
   //       $lookup: {
   //          from: 'Rooms',
   //          localField: 'rooms',
   //          foreignField: '_id',
   //          as: 'docRooms'

   //       }
   //    }])
   // }

   @Query(() => [Users])
   async getAllUsers() {
      return await UsersModel.find()
   }

   @Query(() => [Users])
   async getAllDoctors() {
      return await UsersModel.find({ role: `doctor` })
   }

   @Query(() => Users, { nullable: false })
   async getUser(@Arg("id") id: string) {
      return await UsersModel.findById(id)
   }

   @Mutation(() => Boolean)
   async createUser(@Arg("data") data: CreateUserInput) {
      (await UsersModel.create(data)).save()
      return true
   }

   @Mutation(() => Boolean)
   async addRoomToDoctor(@Arg("data") { roomId, doctorId }: AddRoomToDoctor) {
      await UsersModel.updateOne({ _id: doctorId }, {
         $push: {
            rooms: roomId
         }
      })
      return true
   }

}
