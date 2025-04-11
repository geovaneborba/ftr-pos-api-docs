import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import scalarUI from "@scalar/fastify-api-reference";
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { createUserRoute } from "./routes/create-user-route.ts";
import { getUsersRoute } from "./routes/get-users-route.ts";

const app = fastify();

// Valida entrada dos dados
app.setValidatorCompiler(validatorCompiler);
// Valida saída dos dados
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Example API Docs",
      description: "API Documentation ",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  transform: jsonSchemaTransform,
});

app.register(scalarUI, {
  routePrefix: "/docs",
  configuration: {
    title: "Example API Docs",
    layout: "modern",
  },
});

app.register(createUserRoute);
app.register(getUsersRoute);

app.get("/openapi.json", () => app.swagger());

app
  .listen({
    port: 3000,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`🚀🔥 HTTP Server Running -> http://localhost:3000`);
  });
