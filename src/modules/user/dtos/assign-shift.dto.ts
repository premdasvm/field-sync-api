import { IsNotEmpty } from "class-validator";

export class AssignShiftDto {
	/**
	 * Shift IDs
	 * @example [1,2]
	 */

	@IsNotEmpty()
	shifts: number[];
}
