import { analyticsRouter } from 'server/api/routers/analytics'
import { postRouter } from 'server/api/routers/post'
import { searchConsoleRouter } from 'server/api/routers/searchConsole'
import { createCallerFactory, createTRPCRouter } from 'server/api/trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  analytics: analyticsRouter,
  searchConsole: searchConsoleRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
