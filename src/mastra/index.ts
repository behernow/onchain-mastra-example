import { Mastra } from "@mastra/core";
import { createLogger } from "@mastra/core/logger";

import { ethereum } from "./agents/ethereum";

export const mastra = new Mastra({
	agents: {
		ethereum,
	},
	logger: createLogger({
		name: "Mastra",
		level: "info",
	}),
});
