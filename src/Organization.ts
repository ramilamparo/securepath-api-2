import { Auth } from "./Auth";
import { Vehicle } from "./Vehicle";

export interface OrganizationRawAttributes {
	id: string;
	address: {
		city: string;
		country: string;
		state: string;
		street: string;
		zip: string | null;
	};
	created_at: string;
	last_modified: string;
	name: string;
	owner_email: string;
	owner_name: string;
	owner_phone: string;
	status: string[];
	timezone: string;
	trade_license_number: string;
	traffic_file_number: string | null;
	vendorid: string;
	trackers_count: number;
	users_count: number;
}

export interface OrganizationAttributes {
	id: string;
	createdAt: Date;
	name: string;
	ownerMail: string;
	ownerName: string;
	ownerPhone: string;
	timezone: string;
	trackersCount: number;
	usersCount: number;
	vendorId: string;
}

export interface LastAvailableData {
	orgid: string;
	userid: string;
	trackerid: string;
	altitude: number;
	angle: number;
	astates: null;
	duration: string;
	georoute_road: string;
	health: null;
	latitude: number;
	longitude: number;
	priority: number;
	speed: number;
	states: {
		ain1: number;
		area_code: number;
		battery_current: number;
		battery_level: number;
		battery_voltage: number;
		cell_id: number;
		dallas_temperature: number;
		din1: number;
		din2: number;
		din3: number;
		dout1: number;
		dout2: number;
		external_voltage: number;
		gps_hdop: number;
		gps_pdop: number;
		gps_power: number;
		gps_speed: number;
		gsm_operator: number;
		gsm_signal: number;
		movement_sensor: number;
		odometer_value: number;
		satellites: number;
		sleep_mode: number;
		working_mode: number;
	};
	status: string;
	timestamp: string;
	year_month: number;
}

export class Organization implements OrganizationAttributes {
	private auth: Auth;

	private lastAvailableData: LastAvailableData[] = [];

	public rawData: OrganizationRawAttributes;

	public id: string;

	public createdAt: Date;

	public name: string;

	public ownerMail: string;

	public ownerName: string;

	public ownerPhone: string;

	public timezone: string;

	public trackersCount: number;

	public usersCount: number;

	public vendorId: string;

	constructor(
		auth: Auth,
		data: OrganizationAttributes,
		rawData: OrganizationRawAttributes
	) {
		this.auth = auth;
		this.rawData = rawData;
		this.id = data.id;
		this.createdAt = data.createdAt;
		this.name = data.name;
		this.ownerMail = data.ownerMail;
		this.ownerName = data.ownerName;
		this.ownerPhone = data.ownerPhone;
		this.timezone = data.timezone;
		this.usersCount = data.usersCount;
		this.vendorId = data.vendorId;
		this.trackersCount = data.trackersCount;
	}

	public static getAll = async (auth: Auth) => {
		const organizationList = await Organization.getOrganizationList(auth);
		return organizationList.map((item) => {
			const organizationData = Organization.mapOrganizationListItem(item);
			return new Organization(auth, organizationData, item);
		});
	};

	private static getOrganizationList = (auth: Auth) => {
		return auth.get<OrganizationRawAttributes[]>("/api/organization/list");
	};

	private static mapOrganizationListItem = (
		item: OrganizationRawAttributes
	): OrganizationAttributes => {
		return {
			createdAt: new Date(item.created_at),
			id: item.id,
			name: item.name,
			ownerMail: item.owner_email,
			ownerName: item.owner_name,
			ownerPhone: item.owner_phone,
			timezone: item.timezone,
			trackersCount: item.trackers_count,
			usersCount: item.users_count,
			vendorId: item.vendorid
		};
	};

	public getVehicles = async (refreshTrackerData: boolean = false) => {
		if (refreshTrackerData) {
			await this.refreshLastAvailableData();
		}
		return Vehicle.getAllByOrganizationId(
			this.id,
			this.auth,
			this.lastAvailableData
		);
	};

	private refreshLastAvailableData = async () => {
		const lastAvailableData = await this.auth.get<LastAvailableData[]>(
			`/api/organization/${this.id}/last_avl_data`
		);
		return this.replaceOldData(lastAvailableData);
	};

	private replaceOldData = (lastAvailableData: LastAvailableData[]) => {
		const newData: LastAvailableData[] = [];
		lastAvailableData.forEach((item) => {
			const oldDataIndex = this.lastAvailableData.findIndex(
				(oldItem) => oldItem.trackerid === item.trackerid
			);
			if (oldDataIndex >= 0) {
				this.lastAvailableData[oldDataIndex] = item;
			} else {
				newData.push(item);
			}
		});
		this.lastAvailableData.push(...newData);
	};
}
