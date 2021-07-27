
import { Arg, Resolver, Query, Mutation } from "type-graphql";

import { Rooms, RoomsModel } from "../entities/Rooms";
import { StatusModel } from "../entities/Status";
import { CreateRoomInput, SetRoomStatusInput } from "../types/rooms.input";

@Resolver()
export class RoomsResolver {

   @Query(() => [Rooms])
   async getRooms(@Arg("id") id: string) {

      return await RoomsModel.find({ ownerId: id })
   }


   @Mutation(() => Boolean)
   async createRoom(@Arg("data") data: CreateRoomInput) {
      (await RoomsModel.create(data)).save()
      return true
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
      return room
   }

}