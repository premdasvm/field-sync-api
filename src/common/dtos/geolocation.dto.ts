import { IGeolocation } from "@common/types";
import { IsNumber } from "class-validator";

export class GeolocationDto implements IGeolocation {
	/**
	 * Latitude
	 * @example 30
	 */
	@IsNumber()
	latitude: number;

	/**
	 * Longitude
	 * @example 55
	 */
	@IsNumber()
	longitude: number;
}
