import { FastifyReply, FastifyRequest } from 'fastify';
import fetchAndStoreWiki from '../services/wikiServices';

export default async function getWiki(req: FastifyRequest, res: FastifyReply){
  try {
    const wiki = await fetchAndStoreWiki();

    if (!wiki) {
      return res.status(404).send({ error: 'Nenhum artigo encontrado.' });
    }

    console.log("Dados recebidos", wiki);
    res.send(wiki);
  } catch (error) {
    console.error('Erro no controller:', error);
    res.status(500).send({ error: 'Erro ao buscar dados da wiki' });
  }
}