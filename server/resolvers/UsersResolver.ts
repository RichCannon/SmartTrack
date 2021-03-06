import { Types } from "mongoose";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from 'bcryptjs'

import { RoomsModel } from "../entities/Rooms";
import { Users, UsersModel } from "../entities/Users";
import { RoleT } from "../types/types";
import { AddRoomToDoctorInput, CreateUserInput, UpdateUserInput } from "../types/users-input";


@Resolver()
export class UsersResolver {
   @Authorized()
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

   @Authorized(`doctor`)
   @Query(() => [Users])
   async getByRole(@Arg(`role`) role: RoleT) {
      try {
         if (role === `doctor`) {
            return await UsersModel.aggregate([
               {
                  $match: {
                     role
                  }
               },
               {
                  $lookup: {
                     from: 'rooms',
                     let: { userId: "$_id" },
                     pipeline: [
                        {
                           $match: {
                              $expr: {
                                 $eq: ["$ownerId", "$$userId"]

                              }
                           }
                        },
                        {
                           $lookup: {
                              from: 'status',
                              let: { statusId: "$status" },
                              pipeline: [
                                 {
                                    $match: {
                                       $expr: {
                                          $eq: ["$_id", "$$statusId"]
                                       }
                                    }
                                 },
                              ],
                              as: "statusData"
                           },
                        },
                        {
                           $unwind: {
                              path: "$statusData"
                           }
                        }
                     ],
                     as: 'docRooms'
                  }
               }
            ])
         }
         else {
            return await UsersModel.find({ role })
         }
      }
      catch (e) {
         console.log(e)
         return
      }

   }

   @Authorized()
   @Query(() => Users, { nullable: false })
   async getUser(@Arg("id") id: string) {
      return await UsersModel.findById(id)
   }

   @Authorized()
   @Mutation(() => Users)
   async createUser(@Arg("data") data: CreateUserInput) {
      try {
         const password = Math.random().toString(36).slice(-8)
         const hashedPass = await bcrypt.hash(password, 11)
         console.log(`password`,password)
         return (await UsersModel.create({...data, password: hashedPass})).save()
      } catch (e) {
         console.error()
         return e
      }
   }

   @Authorized()
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

   @Authorized()
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

   @Authorized()
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
