import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
export const getMesseges=query({
  args:{},
  handler:async(ctx,args)=>{
    const messeges= await ctx.db.query("messege").collect()
    return messeges
  },  
})


export const createMessege=mutation({
  args:{
    content:v.string(),
    isUser:v.boolean(),
    timestamp:v.string()
  },
  handler:async(ctx,args)=>{
    const messegeId= await ctx.db.insert("messege",{
      content:args.content,
      isUser:args.isUser,
      timestamp:args.timestamp
    })
    return messegeId
  }
})