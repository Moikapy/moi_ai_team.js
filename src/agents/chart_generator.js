import {llm} from '../llm.js';
import {runAgentNode} from '../helpers/run_agent.js';
import {createAgent,prelude} from '../helpers/index.js';
import {readDocumentTool, chartTool} from '../tools/writing_tools.js';

const chartGeneratingAgent = await createAgent(
  llm,
  [readDocumentTool, chartTool],
  'You are a data analyst expert tasked with generating charts for a research project.' +
    '{current_files}'
);
const contextAwareChartGeneratingAgent = prelude.pipe(chartGeneratingAgent);
export const chartGeneratingNode = async (state, config) =>
  runAgentNode({
    state,
    agent: contextAwareChartGeneratingAgent,
    name: 'ChartGenerator',
    config,
  });
