import {DynamicStructuredTool} from '@langchain/core/tools';
import {z} from 'zod';

export const chatTool = new DynamicStructuredTool({
  name: 'chat',
  description: 'use to chat with user',
  schema: z.object({
    text: z.string().describe('the text message to send to the user'),
  }),
  func: async ({text}) => {
    // Here you can define the logic for how the tool responds
    // For simplicity, we will just return the text received
    return `${text}`;
  },
});