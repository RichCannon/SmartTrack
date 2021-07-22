import { Arg, Resolver, Mutation,Query } from "type-graphql";

import { StatusModel, Status } from "../entities/Status";
import { CreateStatusInput } from "../types/status.input";

@Resolver()
export class StatusResolver {

   @Query(() => [Status])
   async getAllStatuses() {
      return await StatusModel.find()
   }

   @Mutation(() => Boolean)
   async createStatus(@Arg("data") data: CreateStatusInput) {
      (await StatusModel.create(data)).save()
      return true
   }

}