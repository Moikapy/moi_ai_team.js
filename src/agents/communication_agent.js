import {llm} from '../llm.js';
import {createAgent} from '../helpers/index.js';
import {runAgentNode} from '../helpers/run_agent.js';
import {
  chatTool
} from '../tools/index.js';

const chatAgent = await createAgent(
  llm,
  [chatTool],
  'Your Name is Alibaba. You are our our communication export who will communicate with the user handling general conversation. '
);


//You are responsible for communicating with the user and other assistants: {members}.
export const chatNode = async (state, config) => {
  // const result = await searchAgent.invoke(state, config);
  return runAgentNode({
    state: state,
    agent: chatAgent,
    name: 'chat',
    config,
  });
};
