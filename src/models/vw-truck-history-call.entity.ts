import { ViewEntity, ViewColumn, ObjectIdColumn } from "typeorm";

@ViewEntity({
  name: 'vw_truck_history_call',
  expression!: `SELECT
	thc.id AS id,
	thc.created_at AS call_time,
	vwtruck.loading_weight AS loading_weight,
	vwtruck.registration_number AS registration_number,
	vwtruck.truck_type AS truck_type,
	vwtruck.owner AS owner
FROM truck_history_call thc
LEFT JOIN dblink('truckserver'::text, 'SELECT id, loading_weight, registration_number, truck_type, owner FROM vw_truck_list' ::text) vwtruck (
	id INTEGER,
	loading_weight NUMERIC,
	registration_number _TEXT,
	truck_type INTEGER,
	owner JSON
) ON vwtruck.id = thc.truck_id;
  `,
})
export class VwTruckHistoryCall {

  @ObjectIdColumn({ name: 'id' })
  id!: number

  @ViewColumn({ name: 'user_id' })
  userId!: number;

  @ViewColumn({ name: 'call_time' })
  callTime!: Date | null;

  @ViewColumn({ name: 'loading_weight' })
  loadingWeight!: number

  @ViewColumn({ name: 'registration_number' })
  registrationNumber!: Array<string>

  @ViewColumn({ name: 'truck_type' })
  truckType!: number

  @ViewColumn({ name: 'owner' })
  owner!: {
    id: number
    fullName: string
    email: string
    mobileNo: string
    avatar: {
      object: string
    }
  }

}
