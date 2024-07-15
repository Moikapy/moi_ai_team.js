import { ChatOpenAI } from '@langchain/openai';
export const llm = new ChatOpenAI({
  modelName: 'gpt-4o',
  temperature: 0,
});
// import {OllamaFunctions} from '@langchain/community/experimental/chat_models/ollama_functions';
// import {ChatOllama} from '@langchain/community/chat_models/ollama';
// // import {ChatMistralAI} from '@langchain/community/chat_models/mistral';
// // import { tools } from './tools/index.js';

//  const llm = new OllamaFunctions({
//    baseUrl: 'http://localhost:11434', // Default value
//    model: 'mistral', // Default value
//    format: 'json', // Default value
//  });

// export {llm};