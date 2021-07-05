import { FastifyInstance } from 'fastify';
import { FastifyInstanceToken, getInstanceByToken } from 'fastify-decorators';
import { TruckHistoryCall } from '../models';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export default class TruckHistoryCallRepository {

  private instance: FastifyInstance = getInstanceByToken(FastifyInstanceToken);

  async findById(id: number, options?: FindOneOptions): Promise<any> {
    const server: any = this.instance;
    const truckHistoryCall: Repository<TruckHistoryCall> = server?.db?.truckHistoryCall;
    return truckHistoryCall.findOne(id, options);
  }

  async find(options: FindManyOptions): Promise<any> {
    const server: any = this.instance;
    const truckHistoryCall: Repository<TruckHistoryCall> = server?.db?.truckHistoryCall;
    return truckHistoryCall.find(options);
  }

  async findAndCount(filter: FindManyOptions): Promise<any> {
    const server: any = this.instance
    const truckHistoryCall: Repository<TruckHistoryCall> = server?.db?.truckHistoryCall;
    return truckHistoryCall.findAndCount(filter);
  }

  async add(data: Partial<TruckHistoryCall>): Promise<any> {
    const server: any = this.instance
    const truckHistoryCall: Repository<TruckHistoryCall> = server?.db?.truckHistoryCall;
    return truckHistoryCall.save(truckHistoryCall.create(data));
  }

}
