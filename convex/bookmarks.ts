import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const toggleBookmark = mutation({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const existing = await ctx.db
      .query("bookmarks")
      .withIndex("by_user_and_post", (q) =>
        q.eq("userId", currentUser._id).eq("postId", args.postId)
      )
      .first();

    const post = await ctx.db.get(args.postId);
    if (!post) throw new Error("Post not found");

    if (existing) {
      //remove bookmark
      await ctx.db.delete(existing._id);
      return false;
    } else {
      //add bookmark
      await ctx.db.insert("bookmarks", {
        userId: currentUser._id,
        postId: args.postId,
      });
      return true;
    }
  },
});

export const getBookmarkedPosts = query({
  handler: async (ctx) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const bookmarks = await ctx.db
      .query("bookmarks")
      .withIndex("by_user", (q) => q.eq("userId", currentUser._id))
      .order("desc")
      .collect();

    const bookmarkWithInfo = await Promise.all(
      bookmarks.map(async (bookmark) => {
        const post = await ctx.db.get(bookmark.postId);
        return post;
      })
    );

    return bookmarkWithInfo;
  },
});
