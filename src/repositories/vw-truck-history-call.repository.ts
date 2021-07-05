import { FastifyInstance } from 'fastify';
import { FastifyInstanceToken, getInstanceByToken } from 'fastify-decorators';
import { VwTruckHistoryCall } from '../models';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export default class VwTruckHistoryCallRepository {

  private instance: FastifyInstance = getInstanceByToken(FastifyInstanceToken);

  async findById(id: number, options?: FindOneOptions): Promise<any> {
    const server: any = this.instance;
    const viewTruckHistoryCall: Repository<VwTruckHistoryCall> = server?.db?.vwTruckHistoryCall;
    return viewTruckHistoryCall.findOne(id, options);
  }

  async find(options: FindManyOptions): Promise<any> {
    const server: any = this.instance;
    const viewTruckHistoryCall: Repository<VwTruckHistoryCall> = server?.db?.vwTruckHistoryCall;
    return viewTruckHistoryCall.find(options);
  }

  async findAndCount(filter: FindManyOptions): Promise<any> {
    const server: any = this.instance
    const viewTruckHistoryCall: Repository<VwTruckHistoryCall> = server?.db?.vwTruckHistoryCall;
    return viewTruckHistoryCall.findAndCount(filter);
  }

}
