export interface SecurePathLoginOptions {
    email: string;
    password: string;
}
export interface SecurePathOptions {
    baseUrl?: string;
}
export declare const DEFAULT_BASE_URL = "https://sira.securepath.ae/";
export declare class Auth {
    token: string;
    baseUrl?: string | undefined;
    private axios;
    constructor(token: string, baseUrl?: string | undefined);
    static login: (credentials: SecurePathLoginOptions, options?: SecurePathOptions | undefined) => Promise<Auth>;
    private static getAuthToken;
    private static tokenToBase64;
    get: <Response_1>(path: string) => Promise<Response_1>;
    put: <Response_1>(path: string, body: unknown) => Promise<Response_1>;
    patch: <Response_1>(path: string, body: unknown) => Promise<Response_1>;
    head: <Response_1>(path: string) => Promise<Response_1>;
    post: <Response_1>(path: string, body: unknown) => Promise<Response_1>;
    delete: <Response_1>(path: string) => Promise<Response_1>;
    private handleError;
}
