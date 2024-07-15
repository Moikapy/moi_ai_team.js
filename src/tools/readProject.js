// src/tools/readProject.js
import fs from 'fs';
import path from 'path';
import {z} from 'zod';
import {DynamicStructuredTool} from '@langchain/core/tools';
import {getDirname} from '../utils/dirname.js';
/**
 * Recursively read all files in a directory.
 * @param {string} dir - The directory to read.
 * @returns {Promise<string[]>} - A promise that resolves to an array of file paths.
 */
async function readDirectory(dir) {
  let files = [];

  const items = await fs.promises.readdir(dir, {withFileTypes: true});
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = files.concat(await readDirectory(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Read the content of a file.
 * @param {string} filePath - The path to the file.
 * @returns {Promise<string>} - A promise that resolves to the content of the file.
 */
async function readFile(filePath) {
  const content = await fs.promises.readFile(filePath, 'utf8');
  return content;
}

/**
 * Read all files in the project and return their contents.
 * @param {string} projectDir - The root directory of the project.
 * @returns {Promise<Object>} - A promise that resolves to an object with file paths as keys and file contents as values.
 */
async function readProjectFiles(projectDir) {
  const srcDir = path.join(projectDir, 'src');
  const indexFile = path.join(projectDir, 'index.js');

  const files = [indexFile].concat(await readDirectory(srcDir));
  const fileContents = {};

  for (const file of files) {
    fileContents[file] = await readFile(file);
  }

  return fileContents;
}

// Example usage
// (async () => {
//   const projectDir = path.resolve(__dirname, '../../'); // Adjust the path as needed
//   const projectFiles = await readProjectFiles(projectDir);
//   console.log(projectFiles);
// })();

export const readDocumentTool = new DynamicStructuredTool({
  name: 'read_project_files',
  description: 'Read the local project files.',
  schema: z.object({
    file_name: z.string(),
    start: z.number().optional(),
    end: z.number().optional(),
  }),
  func: async ({file_name, start, end}) => {
    const __dirname = getDirname(import.meta.url);
    const projectDir = path.resolve(__dirname, '../../');
    const projectFiles = await readProjectFiles(projectDir);
    const data = await fs.readFile(filePath, 'utf-8');
    const lines = data.split('\n');
    return lines.slice(start ?? 0, end).join('\n');
  },
});

export {readProjectFiles};
