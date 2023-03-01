import { BaseEntity } from "@common/database";
import { IGeolocation } from "@common/types";
import { Shift, User } from "@entities";
import { Entity, ManyToOne, Property } from "@mikro-orm/core";

@Entity({ tableName: "user_shift" })
export class UserShift extends BaseEntity {
	@ManyToOne({ primary: true })
	user: User;

	@ManyToOne({ primary: true })
	shift: Shift;

	@Property({ type: "json" })
	coordinates?: IGeolocation;
}
