"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
class Vehicle {
    constructor(data, rawData) {
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
}
exports.Vehicle = Vehicle;
Vehicle.getAllByOrganizationId = (organizationId, auth, lastAvailableData) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicles = yield auth.get(`/api/organization/${organizationId}/foa`);
    return vehicles.map((vehicleData) => {
        const locationData = Vehicle.getVehicleLocationAttributes(vehicleData, lastAvailableData);
        return new Vehicle(Object.assign(Object.assign({}, locationData), { category: vehicleData.category, chassisNumber: vehicleData.chasis_number, foaId: vehicleData.foa_id, organizationId: vehicleData.orgid, plateNumber: vehicleData.plate_number, trackerId: vehicleData.trackerid, vehicleColor: vehicleData.vehicle_color, vehicleMake: vehicleData.vehicle_make }), vehicleData);
    });
});
Vehicle.getVehicleLocationAttributes = (vehicleData, lastAvailableData) => {
    const locationData = {
        altitude: null,
        angle: null,
        lastReport: null,
        latitude: null,
        longitude: null
    };
    if (lastAvailableData) {
        const vehicleGpsData = Vehicle.findVehicleGpsData(vehicleData, lastAvailableData);
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
Vehicle.findVehicleGpsData = (vehicle, trackerData) => {
    return trackerData.find((trackerItemData) => trackerItemData.trackerid === vehicle.trackerid);
};
