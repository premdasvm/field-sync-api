import { BaseEntity } from "@common/database";
import { HelperService } from "@common/helpers";
import { Roles } from "@common/types";
import {
	BeforeCreate,
	BeforeUpdate,
	Entity,
	Enum,
	EventArgs,
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

	@BeforeCreate()
	@BeforeUpdate()
	async hashPassword(args: EventArgs<this>) {
		if (args.changeSet?.payload?.password) {
			this.password = await HelperService.hashString(this.password);
		}
	}
}
