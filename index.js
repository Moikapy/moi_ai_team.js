#!/usr/bin/env node
import 'dotenv/config';
import {Command} from 'commander';
import readline from 'readline';
import {consult} from './src/core.js';
import ora from 'ora';

const program = new Command();

program.version('1.0.0').description('Interactive CLI to chat with AI');

program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false, // Disables automatic echo of input
});

console.log(
  'Chat with the AI. Type your message and press Enter. (Notepad-style interface)'
);

const printNotepad = (messages) => {
  console.clear();
  console.log('----- TEAM AI -----');
  messages.forEach(({sender, content}) => {
    console.log(`${sender}: ${content}`);
  });
  console.log('-------------------');
  process.stdout.write('You: ');
};

let chatHistory = [];

rl.on('line', async (input) => {
  chatHistory.push({sender: 'You', content: input});
  printNotepad(chatHistory);

  const spinner = ora('AI is thinking...').start();

  try {
    const responses = await consult(input).catch((error) => {
      spinner.stop();
      console.error('Error:', error);
      throw error;
    });
    spinner.stop();
    responses.forEach(({key, content}) => {
      if (
        content === 'ResearchTeam' ||
        content === 'PaperWritingTeam' ||
        content === 'FINISH'
      ) {
        return;
      }
      chatHistory.push({sender: 'AI', content});
      printNotepad(chatHistory);
    });
  } catch (error) {
    spinner.stop();
    console.error('Error:', error);
  }
});
