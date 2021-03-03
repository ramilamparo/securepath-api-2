import { Auth, SecurePathLoginOptions, SecurePathOptions } from "./Auth";
import { Organization } from "./Organization";
export declare class SecurePath {
    private auth;
    constructor(auth: Auth);
    static login: (credentials: SecurePathLoginOptions, options?: SecurePathOptions | undefined) => Promise<SecurePath>;
    getOrganizations: () => Promise<Organization[]>;
}
