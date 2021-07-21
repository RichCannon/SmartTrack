import { Arg, Resolver,Query, Mutation } from "type-graphql";
import { Rooms, RoomsModel } from "../entities/Rooms";
import { CreateRoomInput } from "../types/rooms.input";

@Resolver()
export class RoomsResolver {

   @Query(() => [Rooms])
   async getRooms(@Arg("id") id: string) {
      return await RoomsModel.find({ownerId: id})
   }

   @Mutation(() => Boolean)
   async createRoom(@Arg("data") data: CreateRoomInput) {
      (await RoomsModel.create(data)).save()
      return true
   }

}