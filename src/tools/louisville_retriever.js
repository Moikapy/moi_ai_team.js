import {RecursiveCharacterTextSplitter} from 'langchain/text_splitter';
import {CheerioWebBaseLoader} from '@langchain/community/document_loaders/web/cheerio';
import {MemoryVectorStore} from 'langchain/vectorstores/memory';
import {OpenAIEmbeddings} from '@langchain/openai';
import {createRetrieverTool} from 'langchain/tools/retriever';
const loader = new CheerioWebBaseLoader(
  'https://louisville.edu'
);
const rawDocs = await loader.load();

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});
const docs = await splitter.splitDocuments(rawDocs);

const vectorstore = await MemoryVectorStore.fromDocuments(
  docs,
  new OpenAIEmbeddings()
);
 const louisville_retriever = vectorstore.asRetriever();


export const louisville_retrieverTool = createRetrieverTool(louisville_retriever, {
  name: 'university_louisville_search',
  description:
    'Search for information about the University of Louisville. For any questions about the University of Louisville, you must use this tool!',
});

/*
  Document {
    pageContent: "your application progresses through the beta testing phase, it's essential to continue collecting data to refine and improve its performance. LangSmith enables you to add runs as examples to datasets (from both the project page and within an annotation queue), expanding your test coverage on real-world scenarios. This is a key benefit in having your logging system and your evaluation/testing system in the same platform.Production​Closely inspecting key data points, growing benchmarking datasets, annotating traces, and drilling down into important data in trace view are workflows you’ll also want to do once your app hits production. However, especially at the production stage, it’s crucial to get a high-level overview of application performance with respect to latency, cost, and feedback scores. This ensures that it's delivering desirable results at scale.Monitoring and A/B Testing​LangSmith provides monitoring charts that allow you to track key metrics over time. You can expand to",
    metadata: {
      source: 'https://docs.smith.langchain.com/user_guide',
      loc: { lines: [Object] }
    }
  }
*/
