import {END, START, StateGraph} from '@langchain/langgraph';
import {researchTeamState} from '../state/research_state.js';
import {searchNode} from '../agents/search_agent.js';
import {research_supervisorAgent} from '../agents/research_supervisor.js';
import {researchNode,wikipediaNode} from '../agents/index.js';


const researchGraph = new StateGraph({
  channels: researchTeamState,
})
  .addNode('Search', searchNode)
  .addNode('research_supervisor', research_supervisorAgent)
  .addNode('WikiReader', wikipediaNode)
  .addNode('WebScraper', researchNode);

// Define the control flow
researchGraph.addEdge('Search', 'research_supervisor');
researchGraph.addEdge('WebScraper', 'research_supervisor');
researchGraph.addEdge('WikiReader', 'research_supervisor');
researchGraph.addConditionalEdges('research_supervisor', (x) => x.next, {
  Search: 'Search',
  WebScraper: 'WebScraper',
  WikiReader: 'WikiReader',
  FINISH: END,
});

researchGraph.addEdge(START, 'research_supervisor');
export const researchChain = researchGraph.compile();
