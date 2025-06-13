import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";

//1- we need to make sure that the webhook event is coming from clerk
//2- if so, listen to the "user.created" event
//3- we will save the user to the database

// Create a new user
export const createUser = mutation({
    args:{
        username: v.string(),
        fullname:v.string(),
        image:v.string(),
        bio:v.optional(v.string()),
        email:v.string(),
        clerkId:v.string()
    },
    handler: async(ctx,args) =>{

        const existingUser = await ctx.db.query("users")
        .withIndex("by_clerk_id",(q) => q.eq("clerkId",args.clerkId))
        .first()


        if(existingUser) return

        //create a user in db
        await ctx.db.insert("users",{
                username: args.username,
                fullname: args.fullname,
                email: args.email,
                bio: args.bio,
                image: args.image,
                clerkId: args.clerkId,
                followers:0,
                following:0,
                posts:0
        })
    }
})  


export async function getAuthenticatedUser(ctx:QueryCtx | MutationCtx){
            //get current user
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("Unauthorized")
            
        const currentUser = await ctx.db
        .query("users")
        .withIndex("by_clerk_id" , (q) => q.eq("clerkId", identity.subject))
        .first()

        if(!currentUser) throw new Error("User not found")

        return currentUser;
}

export const getUserByClerkId = query({
    args: { clerkId: v.string()},
    handler: async (ctx , args) => {

        const user = await ctx.db.query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
        .unique()

        return user
    }
})