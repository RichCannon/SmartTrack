import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from "type-graphql";
import "reflect-metadata"; // For using experemental class decorators (Typegoose, Typegraphql)
import mongoose from "mongoose";

import { UsersResolver } from './resolvers/UsersResolver';
import { RoomsResolver } from './resolvers/RoomsResolver';
import { StatusResolver } from './resolvers/StatusResolver';



const MONGO_PASSWORD = `admin`
const DB_NAME = `SmartTrack`

const MONGO_URI = `mongodb+srv://admin:${MONGO_PASSWORD}@cluster0.getmm.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
const PORT = process.env.PORT || 5000

const main = async () => {
   const schema = await buildSchema({
      resolvers: [UsersResolver, RoomsResolver, StatusResolver],
      emitSchemaFile: true,
      validate: false,
   });

   await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
   })


   const app = express()
   app.use(cors())

   app.use('/graphql', graphqlHTTP({
      schema,
      graphiql: true,
   }))

   app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`)
   })
}

main().catch((error) => {
   console.log(`SERVER ERROR:`, error)
})


