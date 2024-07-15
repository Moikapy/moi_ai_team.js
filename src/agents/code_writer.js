import {llm} from '../llm.js';
import {runAgentNode} from '../helpers/run_agent.js';
import {createAgent, prelude} from '../helpers/index.js';

import {
  writeDocumentTool,
  editDocumentTool,
  readDocumentTool,
} from '../tools/writing_tools.js';
import path from 'path';
import {readProjectFiles} from '../tools/readProject.js';
import {getDirname} from '../utils/dirname.js';
import {splitLongMessage} from '../utils/splitLongMessage.js';
// Get the __dirname equivalent
const __dirname = getDirname(import.meta.url);

export const code_writer = async (state, config) => {
  const projectDir = path.resolve(__dirname, '../../');
  const projectFiles = await readProjectFiles(projectDir);

  // Get the list of current files
  const currentFiles = Object.keys(projectFiles).map((filePath) =>
    filePath.replace(projectDir, '')
  );
  // Join the file list into a single string and split if necessary
  const fileListString = `You are an expert software engineer.\nBelow are files currently in your directory:\n${currentFiles.join(
    '\n'
  )}`;
  const messageChunks = splitLongMessage(fileListString, 1048576);

  const CodeWriterAgent = await createAgent(
    llm,
    [writeDocumentTool, editDocumentTool, readDocumentTool, readProjectFiles],
    messageChunks[0]
  );
  const contextAwareCodeWriterAgent = prelude.pipe(CodeWriterAgent);

  // Ensure remaining chunks are handled
  for (let i = 1; i < messageChunks.length; i++) {
    await docWriterAgent.send({role: 'system', content: messageChunks[i]});
  }
  runAgentNode({
    state,
    agent: contextAwareCodeWriterAgent,
    name: 'CodeWriter',
    config,
  });
};
