import { type Address as VAddress, isAddress } from "viem";
import { z } from "zod";

export const Address = z.custom<VAddress>(isAddress, "Invalid Address");
