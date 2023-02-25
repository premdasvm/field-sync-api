import { IsNotEmpty } from "class-validator";

export class UserLoginDto {
	/**
	 * Email of user
	 * @example 1234567890
	 */
	@IsNotEmpty()
	mobileNumber!: string;

	/**
	 * Password of user
	 * @example password@123
	 */
	@IsNotEmpty()
	password?: string;
}
