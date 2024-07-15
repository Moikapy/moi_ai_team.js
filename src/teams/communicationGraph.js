import {END, START, StateGraph} from '@langchain/langgraph';
import {communicationTeamState} from '../state/communication_state.js';
import {chatNode} from '../agents/communication_agent.js';
import {communication_supervisorAgent} from '../agents/communication_supervisor.js';


const communicationGraph = new StateGraph({
  channels: communicationTeamState,
})
  .addNode('chat', chatNode)
  .addNode('communication_supervisor', communication_supervisorAgent);

// Define the control flow
communicationGraph.addEdge('chat', 'communication_supervisor');
communicationGraph.addConditionalEdges('communication_supervisor', (x) => x.next, {
  chat: 'chat',
  FINISH: END,
});

communicationGraph.addEdge(START, 'communication_supervisor');
export const communicationChain = communicationGraph.compile();
