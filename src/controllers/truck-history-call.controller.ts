import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, getInstanceByToken, POST } from 'fastify-decorators';
import TruckHistoryCallService from '../services/truck-history-call.service';
import { createTruckHistoryCallSchema, getTruckHistoryCallSchema } from './truck-history-call.schema';
import Security from 'utility-layer/dist/security';

const security = new Security();

@Controller({ route: '/api/v1/history/call/trucks' })
export default class TruckHistoryCallController {

  private truckHistoryCallService = getInstanceByToken<TruckHistoryCallService>(TruckHistoryCallService);

  @GET({
    url: '',
    options: {
      schema: getTruckHistoryCallSchema
    }
  })
  async getAllTruckHistoryCallHandler(req: FastifyRequest<{
    Headers: { authorization: string },
    Querystring: { descending?: boolean, page?: number, rowsPerPage?: number, sortBy?: string }
  }>, reply: FastifyReply): Promise<object> {
    try {
      const { page = 1, rowsPerPage = 10 } = req.query;
      const userIdFromToken = security.getUserIdByToken(req.headers.authorization);

      const histories = await this.truckHistoryCallService.mappingHistoryCall({ ...req.query, userId: userIdFromToken });
      return {
        data: histories.data,
        size: rowsPerPage,
        currentPage: page,
        totalPages: Math.ceil(histories.count / (+rowsPerPage)),
        totalElements: histories.count,
        numberOfElements: histories.data.length ?? 0,
      }
    } catch (err) {
      console.log('err :>> ', err);
      reply.status(400);
      throw err;
    }
  }

  @POST({
    url: '',
    options: {
      schema: createTruckHistoryCallSchema
    }
  })
  async adTruckbHistoryCallHandler(req: FastifyRequest<{
    Headers: { authorization: string }, Body: { truckId: string }
  }>, reply: FastifyReply): Promise<object> {
    try {
      const userIdFromToken = security.getUserIdByToken(req.headers.authorization);
      return await this.truckHistoryCallService.addHistoryCall(userIdFromToken, req.body.truckId);
    } catch (err) {
      console.log('err :>> ', err);
      reply.status(400);
      throw err;
    }
  }

}
