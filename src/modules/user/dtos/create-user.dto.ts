import { Roles } from "@common/types";
import { Shift } from "@entities";
import { IsEmail, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
	/**
	 * Name of user
	 * @example Prem
	 */

	@IsString()
	name: string;

	/**
	 * Mobile number of user
	 * @example 1234567890
	 */
	@IsNumberString()
	mobileNumber: string;

	/**
	 * Country Code of mobile number
	 * @example +91
	 */
	@IsString()
	@IsOptional()
	phoneCountryCode: string;

	/**
	 * Email of user
	 * @example example@gamil.com
	 */
	@IsEmail()
	@IsOptional()
	email: string;

	/**
	 * Password of user
	 * @example password@123
	 */
	@IsNotEmpty()
	password: string;

	/**
	 * Role of user
	 * @example "EMPLOYEE"
	 */
	@IsEnum(Roles)
	role: Roles;

	/**
	 * Shifts for user if EMPLOYEE
	 * @example [1,2]
	 */
	@IsNotEmpty()
	shifts: Pick<Shift, "id">[];
}
