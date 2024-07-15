// This defines the agent state for the research team
export const researchTeamState = {
  messages: {
    value: (x, y) => x.concat(y),
    default: () => [],
  },
  team_members: {
    value: (x, y) => x.concat(y),
    default: () => [],
  },
  next: {
    value: (x, y) => y ?? x,
    default: () => 'research_supervisor',
  },
  instructions: {
    value: (x, y) => y ?? x,
    default: () => "Solve the human's question.",
  },
};
