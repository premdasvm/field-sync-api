import { BaseEntity } from "@common/database";
import { HelperService } from "@common/helpers";
import { Roles } from "@common/types";
import { Shift } from "@entities";
import {
	BeforeCreate,
	BeforeUpdate,
	Collection,
	Entity,
	Enum,
	EventArgs,
	ManyToMany,
	OneToMany,
	Property,
	Unique,
} from "@mikro-orm/core";

@Entity()
export class User extends BaseEntity {
	@Property()
	name: string;

	@Property({ unique: true })
	mobileNumber: string;

	@Property({ nullable: true })
	phoneCountryCode: string;

	@Unique()
	@Property({ nullable: true })
	email: string;

	@Property({ default: true })
	isActive: boolean;

	@Property({ hidden: true })
	password: string;

	@Enum(() => Roles)
	role: Roles;

	@ManyToMany({
		entity: () => Shift,
		owner: true,
		pivotTable: "user_shift",
	})
	shifts = new Collection<Shift>(this);

	@BeforeCreate()
	@BeforeUpdate()
	async hashPassword(args: EventArgs<this>) {
		if (args.changeSet?.payload?.password) {
			this.password = await HelperService.hashString(this.password);
		}
	}
}
