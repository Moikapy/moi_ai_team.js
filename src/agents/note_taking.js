import {llm} from '../llm.js';

import {runAgentNode} from '../helpers/run_agent.js';
import {createAgent, prelude} from '../helpers/index.js';

import {createOutlineTool, readDocumentTool} from '../tools/writing_tools.js';

const noteTakingAgent = await createAgent(
  llm,
  [createOutlineTool, readDocumentTool],
  'You are an expert senior researcher tasked with writing a paper outline and' +
    ' taking notes to craft a perfect paper.{current_files}'
);
const contextAwareNoteTakingAgent = prelude.pipe(noteTakingAgent);
export const noteTakingNode = (state) =>
  runAgentNode({
    state,
    agent: contextAwareNoteTakingAgent,
    name: 'NoteTaker',
  });
