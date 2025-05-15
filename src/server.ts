import fastify from "fastify";
import cors from "@fastify/cors";
import getWiki from "./controller/wikiController";

const app = fastify();

app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
});

app.get("/wiki", getWiki);

const PORT = 3000;

app.listen({ port: PORT }).then(() => {
  console.log("Servidor rodando na porta", PORT);
});
