import 'dotenv/config';
// import {RecursiveCharacterTextSplitter} from '@langchain/textsplitters';
// import {CheerioWebBaseLoader} from '@langchain/community/document_loaders/web/cheerio';
// import {MemoryVectorStore} from 'langchain/vectorstores/memory';
// import {OpenAIEmbeddings} from '@langchain/openai';
// import {createRetrieverTool} from 'langchain/tools/retriever';
import {DynamicTool, DynamicStructuredTool} from '@langchain/core/tools';

// const loader = new CheerioWebBaseLoader('https://moikas.com');
// const rawDocs = await loader.load();

// const splitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 1000,
//   chunkOverlap: 200,
// });
// const docs = await splitter.splitDocuments(rawDocs);

// const vectorstore = await MemoryVectorStore.fromDocuments(
//   docs,
//   new OpenAIEmbeddings()
// );
// const retriever = vectorstore.asRetriever();

export const retrieverTool =  new DynamicTool({
    name: "communicate_thought",
    description:
      "use to parse text",
    func: async (e) => e,
  })
