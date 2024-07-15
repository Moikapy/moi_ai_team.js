// This defines the agent state for the document writing team
export const communicationTeamState = {
  messages: {
    value: (x, y) => x.concat(y),
    default: () => [],
  },
  team_members: {
    value: (x, y) => y ?? x,
    default: () => 'chat',
  },
  next: {
    value: (x, y) => y ?? x,
    default: () => 'communication_supervisor',
  },
  instructions: {
    value: (x, y) => y ?? x,
    default: () => "Resolve the user's request.",
  },
};
