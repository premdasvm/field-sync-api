export interface IAuthenticationResponse {
	user: {
		idx: string;
	};
	access_token: string;
	refresh_token?: string;
}
