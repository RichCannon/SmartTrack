
import { Types } from "mongoose";
import { Arg, Resolver, Query, Mutation,Authorized } from "type-graphql";

import { Rooms, RoomsModel } from "../entities/Rooms";
import { StatusModel } from "../entities/Status";
import { ChangeAllRoomOwnerInputArr, CreateRoomInput, DeleteRoomInput, SetRoomStatusInput, UpdateRoomInput } from "../types/rooms.input";

@Resolver()
export class RoomsResolver {


   @Query(() => [Rooms])
   async getAllRooms() {
      return await RoomsModel.find()
   }

   @Query(() => [Rooms])
   async getRooms(@Arg("id") id: string) {
      return await RoomsModel.find({ ownerId: id })
   }


   // @Query(() => [Rooms])
   // async getRoomsWithoutOneDoc(@Arg("docId") docId: string) {
   //    try {
   //       return await RoomsModel.aggregate([
   //          {
   //             $match: { ownerId: { $ne: Types.ObjectId(docId) } }
   //          },
   //          {
   //             $lookup: {
   //                from: 'users',
   //                localField: 'ownerId',
   //                foreignField: '_id',
   //                as: 'doc'
   //             }
   //          }
   //       ])
   //    } catch (e) {
   //       console.error(e)
   //       return
   //    }
   // }


   @Mutation(() => Boolean)
   @Authorized()
   async createRoom(@Arg("data") data: CreateRoomInput) {
      try {
         (await RoomsModel.create({ ...data, status: Types.ObjectId("6102a16e15d14362d53dd233") })).save()
         return true

      } catch (e) {
         console.error(e)
         return false
      }

      return true
   }

   @Mutation(() => Boolean)
   async updateRoom(@Arg("data") data: UpdateRoomInput) {
      try {
         await RoomsModel.updateOne({ _id: data.id }, {
            $set: {
               name: data.roomName
            }
         })

         return true
      } catch (e) {
         console.log(e)
         return false
      }
   }


   @Mutation(() => Boolean)
   async deleteRoom(@Arg("data") data: DeleteRoomInput) {
      try {
         await RoomsModel.deleteOne({ _id: data.id })
         return true
      } catch (e) {
         console.log(e)
         return false
      }
   }

   @Mutation(() => Rooms)
   async setRoomStatus(@Arg("data") { roomId, statusId }: SetRoomStatusInput) {
      const room = await RoomsModel.findOne({ _id: roomId })
      const status = await StatusModel.findOne({ _id: statusId })
      await room?.update({
         $set: {
            status: statusId,
            description: status?.description,
            color: status?.color
         }
      })
      return { ownerId: room!.ownerId, status: statusId, name: room!.name, _id: roomId, }
   }

   @Mutation(() => Boolean)
   async changeAllRoomOwner(@Arg("data") data: ChangeAllRoomOwnerInputArr) {
      try {


         const rooms = await RoomsModel.find({ ownerId: data.docId })

         const roomFormatted1 = rooms.map(d => ({ roomId: d._id, docId: data.roomsId.includes(d._id) ? data.docId : `` }))
         const roomFormatted2 = data.roomsId.filter(d => !rooms.map(f => f._id).includes(d)).map(g => ({ roomId: g, docId: data.docId }))

         const roomFormatted = [...roomFormatted1, ...roomFormatted2]


         for (const d of roomFormatted) {
            await RoomsModel.updateOne({ _id: d.roomId },
               {
                  $set: {
                     ownerId: d.docId ? Types.ObjectId(d.docId) : null
                  }
               })
         }

         return true
      } catch (e) {
         console.error(e)
         return false
      }
   }

}