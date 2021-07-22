import { Field,  InputType } from "type-graphql"

import { Status } from "../entities/Status"



@InputType()
export class CreateStatusInput implements Partial<Status> {
   @Field()
   color!: string

   @Field()
   description!: string

}