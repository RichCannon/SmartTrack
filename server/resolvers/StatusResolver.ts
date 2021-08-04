import { Arg, Resolver, Mutation, Query, Authorized } from "type-graphql";

import { StatusModel, Status } from "../entities/Status";
import { CreateStatusInput, UpdateStatusInput } from "../types/status.input";

@Resolver()
export class StatusResolver {

   @Authorized()
   @Query(() => [Status])
   async getAllStatuses() {
      return await StatusModel.find()
   }

   @Authorized()
   @Mutation(() => Status)
   async createStatus(@Arg("data") data: CreateStatusInput) {
      try {
         return (await StatusModel.create(data)).save()
          
      } catch (e) {
         console.log(e)
      }
      return

   }

   @Authorized()
   @Mutation(() => Status)
   async updateStatus(@Arg("data") { _id, color, description }: UpdateStatusInput) {
      try {
         await StatusModel.updateOne({ _id }, {
            $set: { color, description }
         })
         return await StatusModel.findOne({ _id })
      } catch (e) {
         console.log(e)
      }
      return
   }

}