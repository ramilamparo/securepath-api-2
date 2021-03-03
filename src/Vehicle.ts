import { Auth } from "./Auth";
import type { LastAvailableData } from "./Organization";

export interface VehicleRawAttributes {
	orgid: string;
	category: string;
	foa_id: string;
	chasis_number: string;
	insurance_renewal: string | null;
	is_deleted: 0 | 1;
	license_plate_country: string;
	license_plate_state: string;
	org_address: string | null;
	org_contact_number: string | null;
	org_name: string | null;
	org_trade_license_number: string | null;
	plate_number: string;
	purchase_date: null;
	registration_expiry: string | null;
	trackerid: string;
	updated_at: string;
	vehicle_color: string;
	vehicle_make: string;
	vehicle_model: string | null;
	vehicle_owner_name: string | null;
	vehicle_type: string | null;
	foa_type: string;
}

export interface VehicleLocationAttributes {
	latitude: number | null;
	longitude: number | null;
	altitude: number | null;
	angle: number | null;
	lastReport: Date | null;
}

export interface VehicleAttributes extends VehicleLocationAttributes {
	plateNumber: string;
	chassisNumber: string;
	organizationId: string;
	category: string;
	foaId: string;
	trackerId: string;
	vehicleColor: string;
	vehicleMake: string;
}

export class Vehicle implements VehicleAttributes {
	public category: string;

	public chassisNumber: string;

	public plateNumber: string;

	public organizationId: string;

	public foaId: string;

	public trackerId: string;

	public vehicleColor: string;

	public vehicleMake: string;

	public altitude: number | null;

	public angle: number | null;

	public lastReport: Date | null;

	public latitude: number | null;

	public longitude: number | null;

	public rawData: VehicleRawAttributes;

	constructor(data: VehicleAttributes, rawData: VehicleRawAttributes) {
		this.category = data.category;
		this.chassisNumber = data.chassisNumber;
		this.plateNumber = data.plateNumber;
		this.organizationId = data.organizationId;
		this.foaId = data.foaId;
		this.trackerId = data.trackerId;
		this.vehicleColor = data.vehicleColor;
		this.vehicleMake = data.vehicleMake;
		this.altitude = data.altitude;
		this.angle = data.angle;
		this.lastReport = data.lastReport;
		this.latitude = data.latitude;
		this.longitude = data.longitude;
		this.rawData = rawData;
	}

	public static getAllByOrganizationId = async (
		organizationId: string,
		auth: Auth,
		lastAvailableData?: LastAvailableData[]
	) => {
		const vehicles = await auth.get<VehicleRawAttributes[]>(
			`/api/organization/${organizationId}/foa`
		);

		return vehicles.map((vehicleData) => {
			const locationData = Vehicle.getVehicleLocationAttributes(
				vehicleData,
				lastAvailableData
			);
			return new Vehicle(
				{
					...locationData,
					category: vehicleData.category,
					chassisNumber: vehicleData.chasis_number,
					foaId: vehicleData.foa_id,
					organizationId: vehicleData.orgid,
					plateNumber: vehicleData.plate_number,
					trackerId: vehicleData.trackerid,
					vehicleColor: vehicleData.vehicle_color,
					vehicleMake: vehicleData.vehicle_make
				},
				vehicleData
			);
		});
	};

	private static getVehicleLocationAttributes = (
		vehicleData: VehicleRawAttributes,
		lastAvailableData?: LastAvailableData[]
	) => {
		const locationData: VehicleLocationAttributes = {
			altitude: null,
			angle: null,
			lastReport: null,
			latitude: null,
			longitude: null
		};
		if (lastAvailableData) {
			const vehicleGpsData = Vehicle.findVehicleGpsData(
				vehicleData,
				lastAvailableData
			);
			if (vehicleGpsData) {
				locationData.altitude = vehicleGpsData.altitude;
				locationData.angle = vehicleGpsData.angle;
				locationData.lastReport = vehicleGpsData.timestamp
					? new Date(vehicleGpsData.timestamp)
					: null;
				locationData.latitude = vehicleGpsData.latitude;
				locationData.longitude = vehicleGpsData.longitude;
			}
		}
		return locationData;
	};

	private static findVehicleGpsData = (
		vehicle: Pick<VehicleRawAttributes, "trackerid">,
		trackerData: LastAvailableData[]
	) => {
		return trackerData.find(
			(trackerItemData) => trackerItemData.trackerid === vehicle.trackerid
		);
	};
}
