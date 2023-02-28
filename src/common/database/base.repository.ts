import { EntityManager } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { BaseEntity } from "./base-entity.entity";

export class BaseRepository<T extends BaseEntity> extends EntityRepository<T> {
	/**
	 *
	 * @param {T} entity
	 * @return {*} {EntityManager}
	 * @memberof BaseRepository
	 */
	softRemove(entity: T): EntityManager {
		entity.deletedAt = new Date();
		this.persist(entity);

		return this.em;
	}
}
