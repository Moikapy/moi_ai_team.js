import { llm } from "../llm.js";
import {runAgentNode} from '../helpers/run_agent.js';
import {createAgent} from '../helpers/index.js';

import {
  scrape_webpage
} from '../tools/index.js';

// Uncomment if you have your import map set up correctly
const researchAgent = await createAgent(
  llm,
  [scrape_webpage],
  'Your name is Walter. You are a research assistant who can scrape specified urls for more detailed information using the scrapeWebpage function.'
);
export const researchNode = (state, config) =>
  runAgentNode({state, agent: researchAgent, name: 'WebScraper', config});