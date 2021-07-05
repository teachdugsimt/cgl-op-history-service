import { FastifyInstance } from 'fastify';
import { FastifyInstanceToken, getInstanceByToken } from 'fastify-decorators';
import { JobHistoryCall } from '../models';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export default class JobHistoryCallRepository {

  private instance: FastifyInstance = getInstanceByToken(FastifyInstanceToken);

  async findById(id: number, options?: FindOneOptions): Promise<any> {
    const server: any = this.instance;
    const jobHistoryCall: Repository<JobHistoryCall> = server?.db?.jobHistoryCall;
    return jobHistoryCall.findOne(id, options);
  }

  async find(options: FindManyOptions): Promise<any> {
    const server: any = this.instance;
    const jobHistoryCall: Repository<JobHistoryCall> = server?.db?.jobHistoryCall;
    return jobHistoryCall.find(options);
  }

  async findAndCount(filter: FindManyOptions): Promise<any> {
    const server: any = this.instance
    const jobHistoryCall: Repository<JobHistoryCall> = server?.db?.jobHistoryCall;
    return jobHistoryCall.findAndCount(filter);
  }

  async add(data: Partial<JobHistoryCall>): Promise<any> {
    const server: any = this.instance
    const jobHistoryCall: Repository<JobHistoryCall> = server?.db?.jobHistoryCall;
    return jobHistoryCall.save(jobHistoryCall.create(data));
  }

}
