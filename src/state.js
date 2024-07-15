// This defines the object that is passed between each node
// in the graph. We will create different nodes for each agent and tool
export const agentStateChannels = {
  messages: {
    value: (x, y) => x.concat(y),
    default: () => [],
  },
  next: {
    value: (x, y) => y ?? x,
    default: () => 'CommunicationTeam',
  },
  instructions: {
    value: (x, y) => y ?? x,
    default: () => "Resolve the user's request.",
  },
};
