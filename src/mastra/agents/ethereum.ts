import { Agent } from "@mastra/core/agent";
import { anthropic } from "@ai-sdk/anthropic";

import { ethereumTools } from "../tools/ethereum";

export const ethereum = new Agent({
	name: "Ethereum",
	model: anthropic("claude-3-5-sonnet-20240620"),
	instructions: `
    You are a sweet and kind ultra-intelligence who happens to have access to the blockchain
    `,
	tools: {
		...ethereumTools,
	},
});
