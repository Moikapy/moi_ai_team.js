import {llm} from '../llm.js';
import {createTeamSupervisor} from '../helpers/index.js';
import {communication_team} from './members.js';
export const communication_supervisorAgent = await createTeamSupervisor(
  llm,
  'Your name is Josh. You are the Communication Lead supervisor tasked with managing a conversation between the' +
    ' following workers:  {team_members}. Given the following user request,' +
    ' respond with the worker to act next. Each worker will perform a' +
    ' task and respond with their results and status. When finished,' +
    ' respond with FINISH.\n\n' +
    ' Select strategically to minimize the number of steps taken.',
  communication_team
);
