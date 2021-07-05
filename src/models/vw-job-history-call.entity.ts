import { ViewEntity, ViewColumn, ObjectIdColumn } from "typeorm";

@ViewEntity({
  name: 'vw_job_history_call',
  expression!: `SELECT
  jhc.id AS id,
	jhc.created_at AS call_time,
	vwjob.loading_address AS address_name,
	vwjob.loading_datetime AS datetime,
	vwjob.loading_contact_name AS contact_name,
	vwjob.loading_contact_phone AS contact_phone,
	vwjob.loading_latitude AS lat,
	vwjob.loading_longitude AS lng,
	vwjob.product_name AS product_name,
	vwjob.product_type_id AS product_type_id,
	vwjob.required_truck_amount AS required_truck_amount,
	vwjob.truck_type AS truck_type,
	vwjob.weight AS weight,
	vwjob.owner AS owner,
	vwjob.shipments AS to
FROM job_history_call jhc
LEFT JOIN dblink('jobserver'::text, 'SELECT id, product_type_id, product_name, truck_type, weight, required_truck_amount, loading_address, loading_datetime, loading_contact_name, loading_contact_phone, loading_latitude, loading_longitude, owner, shipments FROM vw_job_list' ::text) vwjob (
	id INTEGER,
	product_type_id INTEGER,
	product_name TEXT,
	truck_type TEXT,
	weight NUMERIC,
	required_truck_amount INTEGER,
	loading_address TEXT,
	loading_datetime TEXT,
	loading_contact_name TEXT,
	loading_contact_phone TEXT,
	loading_latitude TEXT,
	loading_longitude TEXT,
	owner JSON,
	shipments JSON
) ON vwjob.id = jhc.job_id;
  `,
})
export class VwJobHistoryCall {

  @ObjectIdColumn({ name: 'id' })
  id!: number

  @ViewColumn({ name: 'user_id' })
  userId!: number;

  @ViewColumn({ name: 'call_time' })
  callTime!: Date | null;

  @ViewColumn({ name: 'address_name' })
  loadingAddress!: string

  @ViewColumn({ name: 'datetime' })
  loadingDatetime!: Date

  @ViewColumn({ name: 'contact_name' })
  loadingContactName!: string

  @ViewColumn({ name: 'contact_phone' })
  loadingContactPhone!: string

  @ViewColumn({ name: 'lat' })
  loadingLatitude!: string

  @ViewColumn({ name: 'lng' })
  loadingLongitude!: string

  @ViewColumn({ name: 'product_name' })
  productName!: string

  @ViewColumn({ name: 'product_type_id' })
  productTypeId!: number

  @ViewColumn({ name: 'required_truck_amount' })
  requiredTruckAmount!: number

  @ViewColumn({ name: 'truck_type' })
  truckType!: number

  @ViewColumn({ name: 'weight' })
  weight!: number

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

  @ViewColumn({ name: 'shipments' })
  shipments!: Array<{
    name: string,
    dateTime: string,
    contactName: string,
    contactMobileNo: string,
    lat: string,
    lng: string,
  }>


}
