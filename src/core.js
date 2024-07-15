import {graph} from './graph.js';
import {HumanMessage} from '@langchain/core/messages';

export async function consult(message) {
  let streamResults = graph
    .stream(
      {
        messages: [
          new HumanMessage({
            content: message,
          }),
        ],
      },
      {recursionLimit: 150, configurable: {thread_id: 'dev'}}
    )
    .catch(async (e) => {
      console.log('Error', await e.message);
    });
  // console.log("streamResults", await streamResults);
  let results = [];
  for await (const output of await streamResults) {
    if (!output?.__end__) {
      const key = Object.keys(output)[0];
      results.push({
        key,
        content: output[key].next || output[key].messages[0].content,
      });
    }
  }
  return results;
}
