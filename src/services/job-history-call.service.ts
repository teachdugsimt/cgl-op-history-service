import { Service, Initializer, Destructor } from 'fastify-decorators';
import { FindManyOptions } from 'typeorm';
import VwJobHistoryCallRepository from '../repositories/vw-job-history-call.repository';
import date from 'date-and-time';
import Security from 'utility-layer/dist/security';
import JobHistoryCallRepository from '../repositories/job-history-call.repository';

interface MappingHistoryCall {
  userId: string
  descending?: boolean
  page?: number
  rowsPerPage?: number
  sortBy?: string
}

const vwJobHistoryCallRepository = new VwJobHistoryCallRepository();
const jobHistoryCallRepository = new JobHistoryCallRepository();
const security = new Security();

@Service()
export default class JobHistoryCallService {

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

    const jobHistoryCallList = await vwJobHistoryCallRepository.findAndCount(filter);

    console.log(date.format(new Date('2021-02-16 07:10:00'), this.dateFormat))

    const newJobHistoryCall = jobHistoryCallList[0].map((history: any) => {
      const owner = history?.owner
      return {
        avatar: owner?.avatar ?? null,
        callTime: date.format(new Date(history?.callTime), this.dateFormat),
        email: owner?.email,
        from: {
          name: history?.loadingAddress,
          dateTime: history?.loadingDatetime ? date.format(new Date(history?.loadingDatetime), this.dateFormat) : null,
          contactName: history?.loadingContactName,
          contactMobileNo: history?.loadingContactPhone,
          lat: history?.loadingLatitude.toString(),
          lng: history?.loadingLongitude.toString(),
        },
        name: owner?.fullName,
        phone: owner?.mobileNo,
        productName: history?.productName,
        productTypeId: history?.productTypeId,
        requiredTruckAmount: history?.requiredTruckAmount,
        to: history.shipments?.map((shipment: any) => ({
          ...shipment,
          dateTime: date.format(new Date(shipment.dateTime), this.dateFormat)
        })),
        truckType: history?.truckType,
        weight: history?.weight
      }
    });

    return {
      data: newJobHistoryCall || [],
      count: jobHistoryCallList[1] || 0,
    }
  }

  async addHistoryCall(userId: string, jobId: string): Promise<any> {
    const decodeUserId = security.decodeUserId(userId);
    const decodeJobId = security.decodeUserId(jobId);

    const data = {
      userId: +decodeUserId,
      jobId: +decodeJobId,
      createdUser: decodeUserId,
      updatedUser: decodeUserId
    }

    return jobHistoryCallRepository.add(data);
  }

  @Destructor()
  async destroy(): Promise<void> { }
}
