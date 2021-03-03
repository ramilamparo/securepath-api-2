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
exports.SecurePath = void 0;
const Auth_1 = require("./Auth");
const Organization_1 = require("./Organization");
class SecurePath {
    constructor(auth) {
        this.auth = auth;
        this.getOrganizations = () => __awaiter(this, void 0, void 0, function* () {
            return Organization_1.Organization.getAll(this.auth);
        });
    }
}
exports.SecurePath = SecurePath;
SecurePath.login = (credentials, options) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield Auth_1.Auth.login(credentials, options);
    return new SecurePath(auth);
});
