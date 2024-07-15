import {RunnableLambda} from '@langchain/core/runnables';
import {llm} from '../llm.js';
import {createTeamSupervisor} from '../helpers/create_supervisor.js';
import {team_leads} from '../agents/members.js';

export const thothChain = await createTeamSupervisor(
  llm,
  'Your Name is Thoth. You are a God tasked with managing processes between the' +
    ' following teams: {team_members}. Given the following user request,' +
    ' respond with the worker to act next. Each worker will perform a' +
    ' task and respond with their results and status. When finished,' +
    ' respond with FINISH.\n\n' +
    ' Select strategically to minimize the number of steps taken. End if Team responds with duplicate messages. Pass to Communication Team for General Purpose Communication.',
  team_leads
);

export const getMessages = RunnableLambda.from((state) => {
  return {messages: state.messages};
});

export const joinGraph = RunnableLambda.from((response) => {
  return {
    messages: [response.messages[response.messages.length - 1]],
  };
});

// const systemPrompt =
//   'Your Name is Thoth. You are the CEO tasked with managing a conversation between the' +
//   ' following workers: {team_members}. Given the following user request,' +
//   ' respond with the worker to act next. Each worker will perform a' +
//   ' task and respond with their results and status. When finished,' +
//   ' respond with FINISH.';
// const options = [END, ...team_leads];

// // Define the routing function
// const functionDef = {
//   name: "route",
//   description: "Select the next role.",
//   parameters: {
//     title: "routeSchema",
//     type: "object",
//     properties: {
//       next: {
//         title: "Next",
//         anyOf: [
//           { enum: options },
//         ],
//       },
//     },
//     required: ["next"],
//   },
// };

// const toolDef = {
//   type: "function",
//   function: functionDef,
// };

// const prompt = ChatPromptTemplate.fromMessages([
//   ["system", systemPrompt],
//   new MessagesPlaceholder("messages"),
//   [
//     "system",
//     "Given the conversation above, who should act next?" +
//     " Or should we FINISH? Select one of: {options}",
//   ],
// ]);

// const formattedPrompt = await prompt.partial({
//   options: options.join(', '),
//   team_members: team_leads.join(', '),
// });

// export const thothChain = formattedPrompt
//   .pipe(llm.bindTools(
//     [toolDef],
//     {
//       tool_choice: { "type": "function", "function": { "name": "route" } },
//     },
//   ))
//   .pipe(new JsonOutputToolsParser())
//   // select the first one
//   .pipe((x) => (x[0].args));
