import 'reflect-metadata';
import fp from 'fastify-plugin';
import { createConnection } from 'typeorm';
import { JobHistoryCall, TruckHistoryCall, VwJobHistoryCall, VwTruckHistoryCall } from '../models';

export default fp(async server => {
  try {
    const connection = await createConnection();
    console.log('database connected');

    server.decorate('db', {
      jobHistoryCall: connection.getRepository(JobHistoryCall),
      truckHistoryCall: connection.getRepository(TruckHistoryCall),
      vwJobHistoryCall: connection.getRepository(VwJobHistoryCall),
      vwTruckHistoryCall: connection.getRepository(VwTruckHistoryCall),
    });
  } catch (error) {
    console.log(error);
    console.log('make sure you have set .env variables - see .env.sample');
  }
});
