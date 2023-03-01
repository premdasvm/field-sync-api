import { BaseEntity } from "@common/database";
import { Attendance, User, UserShift } from "@entities";
import { Collection, Entity, ManyToMany, ManyToOne, OneToMany, Property } from "@mikro-orm/core";

@Entity()
export class Shift extends BaseEntity {
	@Property()
	name: string;

	@Property({ type: "time" })
	startTime: string;

	@Property({ type: "time" })
	endTime: string;

	@Property({ default: true })
	isActive: boolean;

	@ManyToMany({
		entity: () => User,
		pivotEntity: () => UserShift,
		mappedBy: "shifts",
	})
	users = new Collection<User>(this);

	@OneToMany(() => Attendance, attendance => attendance.shift)
	attendances: Attendance[];
}
