import {RunnableLambda} from '@langchain/core/runnables';
import * as fs from 'fs/promises';

const WORKING_DIRECTORY = './temp';
fs.mkdir(WORKING_DIRECTORY, {recursive: true});

export const prelude = new RunnableLambda({
  func: async (state) => {
    let writtenFiles = [];
    if (
      !(await fs
        .stat(WORKING_DIRECTORY)
        .then(() => true)
        .catch(() => false))
    ) {
      await fs.mkdir(WORKING_DIRECTORY, {recursive: true});
    }
    try {
      const files = await fs.readdir(WORKING_DIRECTORY);
      for (const file of files) {
        writtenFiles.push(file);
      }
    } catch (error) {
      console.error(error);
    }
    const filesList =
      writtenFiles.length > 0
        ? '\nBelow are files your team has written to the directory:\n' +
          writtenFiles.map((f) => ` - ${f}`).join('\n')
        : 'No files written.';
    return {...state, current_files: filesList};
  },
});
