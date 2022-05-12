import mongoose from 'mongoose';
import { IRepository } from './IRepository';
import { Types } from 'mongoose';

export class BaseRepository<T> implements IRepository<T> {
  private readonly _model: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this._model = schemaModel;
  }

  async create(item: T): Promise<any> {
    try {
      return await this._model.create(item);
    } catch (err) {
      throw err;
    }
  }

  async createMany(item: any[]): Promise<any> {
    try {
      return await this._model.insertMany(item);
    } catch (err) {
      throw err;
    }
  }

  async createPartial(item: Partial<T>): Promise<any> {
    try {
      const objectToSave = new this._model(item);
      return await objectToSave.save();
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, item: Partial<T>): Promise<any> {
    try {
      return await this._model
        .findOneAndUpdate(
          {
            _id: id,
          },
          {
            $set: item,
          },
          {
            new: true,
          },
        )
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async updateByQuery(
    condition: Record<string, any>,
    item: Record<string, any>,
    options = { new: true },
  ): Promise<any> {
    try {
      return await this._model
        .findOneAndUpdate(
          condition,
          {
            $set: item,
          },
          options,
        )
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async updateAndPushByQuery(
    condition: Record<string, any>,
    item: Record<string, any>,
    pushItem: Record<string, any>,
    options = { new: true },
  ): Promise<any> {
    try {
      return await this._model
        .findOneAndUpdate(
          condition,
          {
            $set: item,
            $push: pushItem,
          },
          options,
        )
        .lean()
        .exec();
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   * @param condition
   * @param pushItem
   * @param options
   */
  async pushByQuery(
    condition: Record<string, any>,
    pushItem: Record<string, any>,
    options = { new: true },
  ): Promise<any> {
    try {
      return await this._model
        .findOneAndUpdate(
          condition,
          {
            $push: pushItem,
          },
          options,
        )
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<any> {
    try {
      return await this._model
        .findOneAndDelete({
          _id: new Types.ObjectId(id),
        })
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async deleteManyByIds(ids: string[]): Promise<any> {
    try {
      return await this._model
        .deleteMany({
          _id: {
            $in: ids,
          },
        })
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async find(query = {}): Promise<any> {
    try {
      return await this._model.find(query).lean().exec();
    } catch (err) {
      throw err;
    }
  }

  async findWIthSkipAndLimit(
    query = {},
    skip: number,
    limit: number,
  ): Promise<any> {
    try {
      return await this._model
        .find(query)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      return await this._model.findOne({ _id: id }).lean().exec();
    } catch (err) {
      throw err;
    }
  }
  async findOneByQuery(
    query: Record<string, any>,
    filterFields?: Record<string, any>,
  ): Promise<any> {
    try {
      return await this._model.findOne(query, filterFields).lean().exec();
    } catch (err) {
      throw err;
    }
  }

  async findAllByQuery(
    query: Record<string, any>,
    filterFields?: Record<string, any>,
  ): Promise<any> {
    try {
      return await this._model.find(query, filterFields).lean().exec();
    } catch (err) {
      throw err;
    }
  }

  async countByQuery(query: Record<string, any>): Promise<any> {
    try {
      return await this._model.countDocuments(query).exec();
    } catch (err) {
      throw err;
    }
  }

  async aggregate(query: any[], offset = 0, limit = 50): Promise<any> {
    try {
      return await this._model
        .aggregate(query)
        .skip(offset)
        .limit(limit)
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async aggregateAll(query: any[]): Promise<any> {
    try {
      return await this._model.aggregate(query).exec();
    } catch (err) {
      throw err;
    }
  }

  async distinct(field: string, query: Record<string, any>): Promise<any> {
    try {
      return await this._model.distinct(field, query).exec();
    } catch (err) {
      throw err;
    }
  }

  async pushData(query = {}, pushData = {}): Promise<any> {
    try {
      return await this._model
        .update(query, {
          $push: pushData,
        })
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async pullData(query = {}, pullQuery = {}): Promise<any> {
    try {
      return await this._model
        .update(query, {
          $pull: pullQuery,
        })
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneAndPullData(query = {}, pullQuery = {}): Promise<any> {
    try {
      return await this._model
        .findOneAndUpdate(
          query,
          {
            $pull: pullQuery,
          },
          { new: true },
        )
        .lean()
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneAndSortByCondition(
    query: Record<string, any>,
    sortQuery = {},
    filterFields = {},
  ): Promise<any> {
    try {
      return await this._model
        .findOne(query, filterFields)
        .sort(sortQuery)
        .lean();
    } catch (err) {
      throw err;
    }
  }

  async writeBulk(item = []): Promise<any> {
    try {
      return await this._model.bulkWrite(item);
    } catch (e) {
      throw e;
    }
  }
}
