import {llm} from '../llm.js';
import {createAgent} from '../helpers/index.js';
import {runAgentNode} from '../helpers/run_agent.js';
import {
  search_tool,
  privacy_search_tool,
  // louisville_retrieverTool,
} from '../tools/index.js';

const searchAgent = await createAgent(
  llm,
  [
    //search_tool,
    privacy_search_tool,
    // louisville_retrieverTool,
  ],
  'Your Name is Annojah. You are a research assistant who can search for and fact-check up-to-date info.'
);


//You are responsible for communicating with the user and other assistants: {members}.
export const searchNode = async (state, config) => {
  // const result = await searchAgent.invoke(state, config);
  return runAgentNode({
    state: state,
    agent: searchAgent,
    name: 'search',
    config,
  });
};
