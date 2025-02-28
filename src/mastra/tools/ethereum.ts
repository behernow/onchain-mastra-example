import { createTool } from "@mastra/core";
import { z } from "zod";
import { normalize } from "viem/ens";

import {
	getPublicClient,
	getWalletClient,
	getChainByName,
	SupportedChains,
} from "../../lib/viem";
import { Address } from "../../lib/schema";
import { etherUnits, parseEther } from "viem";

const parseENSTool = createTool({
	id: "Parse ENS",
	inputSchema: z.object({
		ens: z.string().describe("The ENS name to parse"),
		chain: SupportedChains.default("baseSepolia").optional(),
	}),
	outputSchema: z.object({
		address: Address.describe("The address of the ENS name"),
	}),
	description: "Parse an ENS name to an address",
	execute: async ({ context: { ens, chain } }) => {
		const publicClient = getPublicClient(getChainByName(chain || "base"));

		const address = await publicClient.getEnsAddress({
			name: normalize(ens),
		});

		return { address: address as `0x${string}` };
	},
});

const getAddressTool = createTool({
	id: "Get Wallet Address",
	description: "Get your own wallet address",
	inputSchema: z.object({
		chain: SupportedChains.default("baseSepolia").optional(),
	}),
	outputSchema: z.object({
		address: Address.describe("The address of the wallet"),
	}),
	execute: async ({ context: { chain } }) => {
		const walletClient = getWalletClient(
			getChainByName(chain || "baseSepolia"),
		);
		const [address] = await walletClient.getAddresses();

		return { address };
	},
});

const getBalanceTool = createTool({
	id: "Get Wallet Balance",
	inputSchema: z.object({
		address: Address.describe("The address of the wallet"),
		chain: SupportedChains.default("baseSepolia").optional(),
	}),
	outputSchema: z.object({
		balance: z.string().describe("The balance of the wallet"),
	}),
	description: "Get the balance of a wallet",
	execute: async ({ context: { address, chain } }) => {
		const publicClient = getPublicClient(
			getChainByName(chain || "baseSepolia"),
		);

		const balance = await publicClient.getBalance({
			address,
		});

		return { balance: balance.toString() };
	},
});

const sendTransactionTool = createTool({
	id: "Send Transaction",
	inputSchema: z.object({
		to: Address.describe("The address of the recipient"),
		value: z.string().describe("The amount of ETH to send (in ETH, not Wei)"),
		chain: SupportedChains.default("baseSepolia").optional(),
	}),
	outputSchema: z.object({
		hash: z.string().describe("The hash of the transaction"),
	}),
	description: "Send a transaction!",
	execute: async ({ context: { to, value, chain } }) => {
		const walletClient = getWalletClient(
			getChainByName(chain || "baseSepolia"),
		);

		const hash = await walletClient.sendTransaction({
			to,
			value: parseEther(value),
		});

		return { hash };
	},
});

export const ethereumTools = {
	parseENS: parseENSTool,
	getAddress: getAddressTool,
	getBalance: getBalanceTool,
	sendTransaction: sendTransactionTool,
};
