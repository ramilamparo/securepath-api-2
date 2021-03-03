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
export declare class Vehicle implements VehicleAttributes {
    category: string;
    chassisNumber: string;
    plateNumber: string;
    organizationId: string;
    foaId: string;
    trackerId: string;
    vehicleColor: string;
    vehicleMake: string;
    altitude: number | null;
    angle: number | null;
    lastReport: Date | null;
    latitude: number | null;
    longitude: number | null;
    rawData: VehicleRawAttributes;
    constructor(data: VehicleAttributes, rawData: VehicleRawAttributes);
    static getAllByOrganizationId: (organizationId: string, auth: Auth, lastAvailableData?: LastAvailableData[] | undefined) => Promise<Vehicle[]>;
    private static getVehicleLocationAttributes;
    private static findVehicleGpsData;
}
