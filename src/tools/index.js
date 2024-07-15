import 'esm-hook'; // Only for running this in TSLab. See: https://github.com/yunabe/tslab/issues/72
import {ToolNode} from '@langchain/langgraph/prebuilt';
import {TavilySearchResults} from '@langchain/community/tools/tavily_search';
import {WikipediaQueryRun} from '@langchain/community/tools/wikipedia_query_run';
import {retrieverTool} from './retriever_tool.js';
import {scrape_webpage} from './scrape_webpage.js';
export {
  createOutlineTool,
  readDocumentTool,
  writeDocumentTool,
  editDocumentTool,
  chartTool,
} from './writing_tools.js';
import {DuckDuckGoSearch} from '@langchain/community/tools/duckduckgo_search';

// Instantiate the DuckDuckGoSearch tool.

export const wikipediaTool = new WikipediaQueryRun({
  topKResults: 5,
  // maxDocContentLength: 4000,
});

export const search_tool = new TavilySearchResults();
export const privacy_search_tool = new DuckDuckGoSearch();
export {retrieverTool, scrape_webpage };

export const tools = [ 'tavilyTool', 'retrieverTool'];
export const toolNode = new ToolNode([search_tool, retrieverTool]);
// export {louisville_retrieverTool} from './louisville_retriever.js';

export {chatTool} from './chat_tool.js';