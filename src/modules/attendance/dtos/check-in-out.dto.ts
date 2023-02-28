import { GeolocationDto } from "@common/dtos";
import { Shift } from "@entities";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";

export class CheckInOutDto {
	/**
	 * ID Of active Shift
	 * @example 1
	 */
	@IsNumber()
	shift: Pick<Shift, "id">;

	/**
	 * Geo Location
	 * @example { "latitude" : 30, "longitude": 40 }
	 */
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => GeolocationDto)
	coordinates: GeolocationDto;
}
