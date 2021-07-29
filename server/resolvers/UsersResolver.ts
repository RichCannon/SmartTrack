import { Types } from "mongoose";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { RoomsModel } from "../entities/Rooms";

import { Users, UsersModel } from "../entities/Users";
import { RoleT } from "../types/types";
import { AddRoomToDoctorInput, CreateUserInput, UpdateUserInput } from "../types/users-input";


@Resolver()
export class UsersResolver {

   @Query(() => [Users])
   async getAllUsers() {
      return await UsersModel.aggregate([{
         $lookup: {
            from: 'rooms',
            localField: 'rooms',
            foreignField: '_id',
            as: 'docRooms'

         }
      }])
   }

   // @Query(() => [Users])
   // async getAllUsers() {
   //    return await UsersModel.find()
   // }

   @Query(() => [Users])
   async getByRole(@Arg(`role`) role: RoleT) {
      const data =  await UsersModel.aggregate([
         {
            $match: {
               role
            }
         },
         {
            $lookup: {
               from: 'rooms',
               localField: '_id',
               foreignField: 'ownerId',
               as: 'docRooms'

            }
         },
         {
            $lookup: {
               from: 'status',
               localField: 'docRooms.status',
               foreignField: '_id',
               as: 'statusData'
            }
         }
      ])
     // console.log(`DATA:`,data)
      return data
   }

   @Query(() => Users, { nullable: false })
   async getUser(@Arg("id") id: string) {
      return await UsersModel.findById(id)
   }

   @Mutation(() => Users)
   async createUser(@Arg("data") data: CreateUserInput) {
      return (await UsersModel.create(data)).save()
   }

   @Mutation(() => Boolean)
   async addRoomToDoctor(@Arg("data") { roomId, doctorId }: AddRoomToDoctorInput) {
      await UsersModel.updateOne({ _id: doctorId }, {
         $push: {
            rooms: roomId
         }
      })
      await RoomsModel.updateOne({ _id: roomId }, {
         $set: {
            ownerId: Types.ObjectId(doctorId)
         }
      })
      return true
   }

   @Mutation(() => Boolean)
   async deleteUser(@Arg("_id") _id: string) {
      try {
         await UsersModel.deleteOne({ _id })
         return true
      } catch (e) {
         console.error(e)
         return false
      }
   }

   @Mutation(() => Boolean)
   async updateUser(@Arg("data") { _id, ...restData }: UpdateUserInput) {
      try {
         await UsersModel.updateOne({ _id }, {
            $set: restData
         })
         return true
      } catch (e) {
         console.error(e)
         return false
      }
   }

}
