import { format, startOfDay } from "date-fns";

export const DateService = {
	/**
	 * Returns the current date in the format "yyyy-MM-dd".
	 * @example 2023-01-01
	 * @returns {string} The current date
	 */

	today: (): string => {
		return format(startOfDay(new Date()), "yyyy-MM-dd");
	},
};
