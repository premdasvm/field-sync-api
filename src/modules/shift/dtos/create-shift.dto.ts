import { IsNotEmpty } from "class-validator";

export class CreateShiftDto {
	/**
	 * Name of Shift
	 * @example Morning
	 */
	@IsNotEmpty()
	name: string;

	/**
	 * Shift Start Time
	 * @example 12:20
	 */
	@IsNotEmpty()
	startTime: string;

	/**
	 * Shift End Time
	 * @example 20:20
	 */
	@IsNotEmpty()
	endTime: string;
}
