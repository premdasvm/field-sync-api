import { BaseEntity } from "@common/database";
import { Activity, IGeolocation } from "@common/types";
import { User, Shift } from "@entities";
import { Entity, Enum, ManyToOne, Property } from "@mikro-orm/core";
import { Type } from "class-transformer";

@Entity()
export class Attendance extends BaseEntity {
	@Enum(() => Activity)
	type: Activity;

	@ManyToOne(() => User)
	user?: User;

	@ManyToOne(() => Shift)
	shift: Shift;

	@Property({ type: "json" })
	coordinates: IGeolocation;
}
