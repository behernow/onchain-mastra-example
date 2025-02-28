import { http, createPublicClient, createWalletClient, type Chain } from "viem";
import { base, baseSepolia } from "viem/chains";

import { privateKeyToAccount } from "viem/accounts";
import { z } from "zod";

// TODO: ummmm this is a mess lol
export const SupportedChains = z.enum(["base", "baseSepolia"]);
export const SUPPORTED_CHAINS = [base, baseSepolia];

export const getChainByName = (chain: string): Chain => {
	switch (chain) {
		case "base":
			return base;
		case "baseSepolia":
			return baseSepolia;
		default:
			throw new Error(`Unsupported chain: ${chain}`);
	}
};

export const getPublicClient = (chain: Chain) => {
	return createPublicClient({
		chain,
		transport: http(),
	});
};

export const getWalletClient = (chain: Chain) => {
	return createWalletClient({
		chain,
		transport: http(),
		account: privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`),
	});
};

export const creatorAccount = (await getWalletClient(base).getAddresses())[0];
