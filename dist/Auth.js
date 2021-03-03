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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.DEFAULT_BASE_URL = void 0;
const axios_1 = __importDefault(require("axios"));
exports.DEFAULT_BASE_URL = "https://sira.securepath.ae/";
class Auth {
    constructor(token, baseUrl) {
        this.token = token;
        this.baseUrl = baseUrl;
        this.get = (path) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axios.get(path);
            return response.data;
        });
        this.put = (path, body) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axios.put(path, body);
            return response.data;
        });
        this.patch = (path, body) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axios.patch(path, body);
            return response.data;
        });
        this.head = (path) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axios.head(path);
            return response.data;
        });
        this.post = (path, body) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axios.post(path, body);
            return response.data;
        });
        this.delete = (path) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axios.delete(path);
            return response.data;
        });
        this.axios = axios_1.default.create({
            headers: {
                Authorization: `Basic ${this.token}`
            },
            baseURL: this.baseUrl
        });
    }
}
exports.Auth = Auth;
Auth.login = (credentials, options) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = (options === null || options === void 0 ? void 0 : options.baseUrl) || exports.DEFAULT_BASE_URL;
    const auth = yield Auth.getAuthToken(credentials, baseUrl);
    return new Auth(auth.token, baseUrl);
});
Auth.getAuthToken = (credentials, baseUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(`${baseUrl}/api/token`, credentials);
    return response.data;
});
