// This defines the agent state for the document writing team
export const docWritingState = {
  messages: {
    value: (x, y) => x.concat(y),
    default: () => [],
  },
  team_members: {
    value: (x, y) => y ?? x,
    default: () => 'DocWriter, NoteTaker, ChartGenerator',
  },
  next: {
    value: (x, y) => y ?? x,
    default: () => 'DocWriter',
  },
  current_files: {
    value: (x, y) => (y ? `${x}\n${y}` : x),
    default: () => 'No files written.',
  },
  instructions: {
    value: (x, y) => y ?? x,
    default: () => "Resolve the user's request.",
  },
};
