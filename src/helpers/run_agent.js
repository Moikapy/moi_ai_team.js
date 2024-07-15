import {HumanMessage} from '@langchain/core/messages';

// Helper function to run a node for a given agent
export async function runAgentNode(params) {
  const {state, agent, name, config} = params;
  const result = await agent.invoke(state, config);
  return {
    messages: [new HumanMessage({content: result.output, name})],
  };
}
