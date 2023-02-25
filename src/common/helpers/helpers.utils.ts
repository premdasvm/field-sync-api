import { argon2id, hash, Options as ArgonOptions, verify } from "argon2";

const argon2Options: ArgonOptions & { raw?: false } = {
	type: argon2id,
	hashLength: 50,
	saltLength: 32,
	timeCost: 4,
};

export const HelperService = {
	verifyHash: (userPassword: string, passwordToCompare: string) => {
		return verify(userPassword, passwordToCompare, argon2Options);
	},

	hashString: (userPassword: string): Promise<string> => {
		return hash(userPassword, argon2Options);
	},
};
