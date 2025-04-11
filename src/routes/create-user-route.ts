import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createUserRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/users",
    {
      schema: {
        summary: "Create an User",
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ["Users"],
        body: z.object({
          name: z.string().max(100).nullable().describe("John Doe"),
          email: z.string().email().describe("johndoe@example.com"),
        }),
        response: {
          201: z
            .object({
              userId: z.string().uuid().describe("New user ID"),
            })
            .describe("User created"),
          400: z
            .object({
              errors: z.array(
                z.object({
                  name: z.string(),
                  error: z.string(),
                })
              ),
            })
            .describe("Validation failed"),
          409: z
            .object({
              message: z.string(),
            })
            .describe("E-mail already exists"),
        },
      },
    },
    async (request, reply) => {
      return {
        userId: "123",
      };
    }
  );
};

// body: {
//   type: "object",
//   examples: [
//     {
//       name: "John Doe",
//       email: "johndoe@example.com",
//     },
//   ],
//   properties: {
//     name: {
//       type: ["string", "null"],
//       maxLength: 100,
//     },
//     email: {
//       type: "string",
//       format: "email",
//     },
//   },
// },
// response: {
//   201: {
//     description: "User created",
//     type: "object",
//     properties: {
//       userId: {
//         type: "string",
//         format: "uuid",
//         description: "New user ID",
//       },
//     },
//   },
//   400: {
//     description: "Validation Fails",
//     type: "object",
//     properties: {
//       errors: {
//         type: "array",
//         items: {
//           type: "object",
//           required: ["name", "error"],
//           properties: {
//             name: {
//               type: "string",
//             },
//             error: {
//               type: "string",
//             },
//           },
//         },
//       },
//     },
//   },
//   409: {
//     description: "User e-mail already exists",
//     type: "object",
//     properties: {
//       message: {
//         type: "string",
//       },
//     },
//   },
// },
