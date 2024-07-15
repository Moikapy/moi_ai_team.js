import {START, END, StateGraph} from '@langchain/langgraph';
import {SqliteSaver} from '@langchain/langgraph/checkpoint/sqlite';
import {agentStateChannels} from './state.js';
import {
  thothChain,
  getMessages,
  joinGraph,
} from './agents/index.js';
import {
  authoringChain,
} from './teams/writingGraph.js';
import {
  researchChain,
} from './teams/researchGraph.js';
import {
  communicationChain
} from './teams/communicationGraph.js';

// const memory = SqliteSaver.fromConnString("./storage/memory"); // Here we only save in-memory
const superGraph = new StateGraph({
  channels: agentStateChannels,
})
  .addNode('ResearchTeam', getMessages.pipe(researchChain).pipe(joinGraph))
  .addNode('PaperWritingTeam', getMessages.pipe(authoringChain).pipe(joinGraph))
  .addNode('CommunicationTeam', getMessages.pipe(communicationChain).pipe(joinGraph))
  .addNode('thoth', thothChain);

superGraph.addEdge('ResearchTeam', 'thoth');
superGraph.addEdge('PaperWritingTeam', 'thoth');
superGraph.addEdge('CommunicationTeam', 'thoth');
superGraph.addConditionalEdges('thoth', (x) => x.next, {
  PaperWritingTeam: 'PaperWritingTeam',
  ResearchTeam: 'ResearchTeam',
  CommunicationTeam: 'CommunicationTeam',
  FINISH: END,
});

superGraph.addEdge(START, 'thoth');
export const graph = superGraph.compile({checkpointer: memory}); //{checkpointer: memory}
