import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, getInstanceByToken, POST } from 'fastify-decorators';
import JobHistoryCallService from '../services/job-history-call.service';
import { createJobHistoryCallSchema, getJobHistoryCallSchema } from './job-history-call.schema';
import Security from 'utility-layer/dist/security';

const security = new Security();

@Controller({ route: '/api/v1/history/call/jobs' })
export default class JobHistoryCallController {

  private jobHistoryCallService = getInstanceByToken<JobHistoryCallService>(JobHistoryCallService);

  @GET({
    url: '',
    options: {
      schema: getJobHistoryCallSchema
    }
  })
  async getAllJobHistoryCallHandler(req: FastifyRequest<{
    Headers: { authorization: string },
    Querystring: { descending?: boolean, page?: number, rowsPerPage?: number, sortBy?: string }
  }>, reply: FastifyReply): Promise<object> {
    try {
      const { page = 1, rowsPerPage = 10 } = req.query;
      const userIdFromToken = security.getUserIdByToken(req.headers.authorization);

      const histories = await this.jobHistoryCallService.mappingHistoryCall({ ...req.query, userId: userIdFromToken });
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
      schema: createJobHistoryCallSchema
    }
  })
  async addJobHistoryCallHandler(req: FastifyRequest<{
    Headers: { authorization: string }, Body: { jobId: string }
  }>, reply: FastifyReply): Promise<object> {
    try {
      const userIdFromToken = security.getUserIdByToken(req.headers.authorization);
      return await this.jobHistoryCallService.addHistoryCall(userIdFromToken, req.body.jobId);
    } catch (err) {
      console.log('err :>> ', err);
      reply.status(400);
      throw err;
    }
  }

}
