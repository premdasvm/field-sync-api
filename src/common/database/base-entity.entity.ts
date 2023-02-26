import { PrimaryKey, Property } from "@mikro-orm/core";

export abstract class BaseEntity {
	@PrimaryKey({ autoincrement: true })
	id: number;

	@Property()
	createdAt = new Date();

	@Property({ onUpdate: () => new Date(), hidden: true })
	updatedAt? = new Date();

	@Property({ hidden: true })
	deletedAt?: Date;
}
