import {llm} from '../llm.js';
import {runAgentNode} from '../helpers/run_agent.js';
import {createAgent} from '../helpers/index.js';

import {wikipediaTool} from '../tools/index.js';

// Uncomment if you have your import map set up correctly
const wikipediaAgent = await createAgent(
  llm,
  [wikipediaTool],
  'Your name is Wiki. You are a research assistant who can read through wikipedia to provide added information.'
);
export const wikipediaNode = (state, config) =>
  runAgentNode({state, agent: wikipediaAgent, name: 'WikiReader', config});
