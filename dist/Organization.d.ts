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
export declare class Organization implements OrganizationAttributes {
    private auth;
    private lastAvailableData;
    rawData: OrganizationRawAttributes;
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
    constructor(auth: Auth, data: OrganizationAttributes, rawData: OrganizationRawAttributes);
    static getAll: (auth: Auth) => Promise<Organization[]>;
    private static getOrganizationList;
    private static mapOrganizationListItem;
    getVehicles: (refreshTrackerData?: boolean) => Promise<Vehicle[]>;
    private refreshLastAvailableData;
    private replaceOldData;
}
