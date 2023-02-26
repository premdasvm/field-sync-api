export interface IAuthenticationResponse {
	user: {
		idx: string;
	};
	access_token: string;
	refresh_token?: string;
}

export interface IJwtPayload {
	jti?: number;
	sub: number;
	iat: number;
	exp: number;
	aud: string;
	iss: string;
	roles?: string[];
}
