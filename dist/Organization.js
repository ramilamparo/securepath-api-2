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
exports.Organization = void 0;
const Vehicle_1 = require("./Vehicle");
class Organization {
    constructor(auth, data, rawData) {
        this.lastAvailableData = [];
        this.getVehicles = (refreshTrackerData = false) => __awaiter(this, void 0, void 0, function* () {
            if (refreshTrackerData) {
                yield this.refreshLastAvailableData();
            }
            return Vehicle_1.Vehicle.getAllByOrganizationId(this.id, this.auth, this.lastAvailableData);
        });
        this.refreshLastAvailableData = () => __awaiter(this, void 0, void 0, function* () {
            const lastAvailableData = yield this.auth.get(`/api/organization/${this.id}/last_avl_data`);
            return this.replaceOldData(lastAvailableData);
        });
        this.replaceOldData = (lastAvailableData) => {
            const newData = [];
            lastAvailableData.forEach((item) => {
                const oldDataIndex = this.lastAvailableData.findIndex((oldItem) => oldItem.trackerid === item.trackerid);
                if (oldDataIndex >= 0) {
                    this.lastAvailableData[oldDataIndex] = item;
                }
                else {
                    newData.push(item);
                }
            });
            this.lastAvailableData.push(...newData);
        };
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
}
exports.Organization = Organization;
Organization.getAll = (auth) => __awaiter(void 0, void 0, void 0, function* () {
    const organizationList = yield Organization.getOrganizationList(auth);
    return organizationList.map((item) => {
        const organizationData = Organization.mapOrganizationListItem(item);
        return new Organization(auth, organizationData, item);
    });
});
Organization.getOrganizationList = (auth) => {
    return auth.get("/api/organization/list");
};
Organization.mapOrganizationListItem = (item) => {
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
