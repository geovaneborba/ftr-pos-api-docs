import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getUsersRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/users",
    {
      schema: {
        summary: "Get All Users",
        tags: ["Users"],
        querystring: z.object({
          page: z.coerce.number().default(1),
        }),
        // querystring: {
        //   type: "object",
        //   properties: {
        //     page: { type: ["integer", "string"], minimum: 1, default: 1 },
        //   },
        // },
        response: {
          200: z
            .object({
              data: z.array(
                z.object({
                  id: z.string().uuid().describe("ID"),
                  name: z.string().max(100).nullable().describe("Name"),
                  email: z.string().email().describe("E-mail"),
                })
              ),
            })
            .describe("A list of users"),
          // 200: {
          //   description: "A list of users",
          //   type: "object",
          //   properties: {
          //     data: {
          //       type: "array",
          //       required: ["id", "name", "email"],
          //       examples: [
          //         {
          //           id: "123e4567-e89b-12d3-a456-426614174000",
          //           name: "John Doe",
          //           email: "johndoe@example.com",
          //         },
          //       ],
          //       items: {
          //         type: "object",
          //         properties: {
          //           id: { type: "string", format: "uuid" },
          //           name: { type: ["string", "null"], maxLength: 100 },
          //           email: { type: "string", format: "email" },
          //         },
          //       },
          //     },
          //   },
          // },
        },
      },
    },
    async (request, reply) => {
      return {
        data: [],
      };
    }
  );
};
