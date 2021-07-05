import { Service, Initializer, Destructor } from 'fastify-decorators';
import { FindManyOptions } from 'typeorm';
import VwTruckHistoryCallRepository from '../repositories/vw-truck-history-call.repository';
import Security from 'utility-layer/dist/security';
import TruckHistoryCallRepository from '../repositories/truck-history-call.repository';
import date from 'date-and-time';

interface MappingHistoryCall {
  userId: string
  descending?: boolean
  page?: number
  rowsPerPage?: number
  sortBy?: string
}

const vwTruckHistoryCallRepository = new VwTruckHistoryCallRepository();
const truckHistoryCallRepository = new TruckHistoryCallRepository();
const security = new Security();

@Service()
export default class TruckHistoryCallService {

  public dateFormat: string = 'DD-MM-YYYY HH:mm'
  public dateFormatWithMs: string = 'DD-MM-YYYY HH:mm:ss'

  @Initializer()
  async init(): Promise<void> { }

  async mappingHistoryCall(data: MappingHistoryCall): Promise<any> {
    const {
      userId,
      descending = true,
      page = 1,
      rowsPerPage = 10,
      sortBy = 'id'
    } = data;

    const decodeUserId = security.decodeUserId(userId);
    const numbOfPage = +page === 1 ? 0 : (+page - 1) * rowsPerPage;

    const filter: FindManyOptions = {
      where: { userId: decodeUserId },
      take: rowsPerPage,
      skip: numbOfPage,
      order: {
        [sortBy]: descending ? 'DESC' : 'ASC'
      }
    }

    const truckHistoryCallList = await vwTruckHistoryCallRepository.findAndCount(filter);

    const newTruckHistoryCall = truckHistoryCallList[0].map((history: any) => {
      const owner = history?.owner
      console.log('owner :>> ', owner);
      return {
        avartar: owner?.avatar ?? null,
        callTime: date.format(new Date(history?.callTime), this.dateFormat),
        email: owner?.email,
        loadingWeight: history?.loadingWeight,
        name: owner?.fullName,
        phone: owner?.mobileNo,
        registrationNumber: history.registrationNumber,
        truckType: history?.truckType,
      }
    });

    return {
      data: newTruckHistoryCall || [],
      count: truckHistoryCallList[1] || 0,
    }
  }

  async addHistoryCall(userId: string, truckId: string): Promise<any> {
    const decodeUserId = security.decodeUserId(userId);
    const decodeTruckId = security.decodeUserId(truckId);

    const data = {
      userId: +decodeUserId,
      truckId: +decodeTruckId,
      createdUser: decodeUserId,
      updatedUser: decodeUserId
    }

    return truckHistoryCallRepository.add(data);
  }

  @Destructor()
  async destroy(): Promise<void> { }
}
