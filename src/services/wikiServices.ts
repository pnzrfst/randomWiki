import axios from 'axios'

interface wikiData {
    id: number,
    title: string,
    content: string
}

export default async function fetchAndStoreWiki() : Promise<wikiData | undefined>{
    const id = Math.trunc(Math.random() * 10000);
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&pageids=${id}&format=json&formatversion=2&prop=extracts&explaintext=1`;

    try {
    const response = await fetch(wikiUrl)
    if(!response.ok){
      throw new Error('Erro ao buscar na wiki dentro do trycatch');
    }
    const data = await response.json();
    const page = data.query.pages[0];
    
    if(page?.extract){
      const wikiData : wikiData = {
        id: page.pageid,
        title: page.title,
        content: page.extract
      }
      
      await axios.post("http://localhost:3000/wikis", {
        id: page.pageid,
        userId: 1,
        content: page.extract,
      });
      
      await axios.post("http://localhost:3000/savedWikis", {
          id: Math.trunc(Math.random() * 100000000),
          userId: 1,
          wikiId: page.pageid,
      });

      return wikiData

    }else{
      console.log("Nao foi possivel buscar");
      return undefined
    }
  } catch (error) {
    console.error("Erro ao buscar a wiki no catch", error);
    return undefined
  }
}