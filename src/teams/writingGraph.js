import {END, START, StateGraph} from '@langchain/langgraph';
import {docWritingState} from '../state/writing_state.js';
import {docWritingNode} from '../agents/doc_writer.js';
import {noteTakingNode} from '../agents/note_taking.js';
import {chartGeneratingNode} from '../agents/chart_generator.js';
import {code_writer} from '../agents/code_writer.js';
import { docWritingSupervisor } from '../agents/writing_supervisor.js';
import {RunnableLambda} from '@langchain/core/runnables';
import {writing_team} from '../agents/members.js';
// Create the graph here:
// Note that we have unrolled the loop for the sake of this doc
const authoringGraph = new StateGraph({
  channels: docWritingState,
})
  .addNode('DocWriter', docWritingNode)
  .addNode('NoteTaker', noteTakingNode)
  .addNode('CodeWriter', code_writer)
  .addNode('ChartGenerator', chartGeneratingNode)
  .addNode('editor', docWritingSupervisor);

// Add the edges that always occur
authoringGraph.addEdge('DocWriter', 'editor');
authoringGraph.addEdge('NoteTaker', 'editor');
authoringGraph.addEdge('CodeWriter', 'editor');
authoringGraph.addEdge('ChartGenerator', 'editor');

// Add the edges where routing applies
authoringGraph.addConditionalEdges('editor', (x) => x.next, {
  DocWriter: 'DocWriter',
  NoteTaker: 'NoteTaker',
  CodeWriter: 'CodeWriter',
  ChartGenerator: 'ChartGenerator',
  FINISH: END,
});

authoringGraph.addEdge(START, 'editor');

const enterAuthoringChain = RunnableLambda.from(
  ({messages}) => {
    return {
      messages: messages,
      team_members: writing_team,
    };
  }
);
export const authoringChain = enterAuthoringChain.pipe(authoringGraph.compile());
