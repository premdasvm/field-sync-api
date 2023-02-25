import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { BaseEntity } from './base-entity.entity';

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
