import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    messege:defineTable({
        content:v.string(),
        isUser:v.boolean(),
        timestamp:v.string()
    })
})