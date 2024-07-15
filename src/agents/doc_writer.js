import {llm} from '../llm.js';

import {runAgentNode} from '../helpers/run_agent.js';
import {createAgent,prelude} from '../helpers/index.js';

import {
  writeDocumentTool,
  editDocumentTool,
  readDocumentTool,
} from '../tools/writing_tools.js';
const docWriterAgent = await createAgent(
  llm,
  [writeDocumentTool, editDocumentTool, readDocumentTool],
  'You are an expert writing a research document.\nBelow are files currently in your directory:\n{current_files}'
);
const contextAwareDocWriterAgent = prelude.pipe(docWriterAgent);

export const docWritingNode = (state, config) =>
  runAgentNode({
    state,
    agent: contextAwareDocWriterAgent,
    name: 'DocWriter',
    config,
  });
