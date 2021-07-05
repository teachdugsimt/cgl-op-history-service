import { FastifyInstance } from 'fastify';
import { FastifyInstanceToken, getInstanceByToken } from 'fastify-decorators';
import { VwJobHistoryCall } from '../models';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export default class VwJobHistoryCallRepository {

  private instance: FastifyInstance = getInstanceByToken(FastifyInstanceToken);

  async findById(id: number, options?: FindOneOptions): Promise<any> {
    const server: any = this.instance;
    const viewJobHistoryCall: Repository<VwJobHistoryCall> = server?.db?.vwJobHistoryCall;
    return viewJobHistoryCall.findOne(id, options);
  }

  async find(options: FindManyOptions): Promise<any> {
    const server: any = this.instance;
    const viewJobHistoryCall: Repository<VwJobHistoryCall> = server?.db?.vwJobHistoryCall;
    return viewJobHistoryCall.find(options);
  }

  async findAndCount(filter: FindManyOptions): Promise<any> {
    const server: any = this.instance
    const viewJobHistoryCall: Repository<VwJobHistoryCall> = server?.db?.vwJobHistoryCall;
    return viewJobHistoryCall.findAndCount(filter);
  }

}
