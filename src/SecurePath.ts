import { Auth, SecurePathLoginOptions, SecurePathOptions } from "./Auth";
import { Organization } from "./Organization";

export class SecurePath {
	constructor(private auth: Auth) {}

	public static login = async (
		credentials: SecurePathLoginOptions,
		options?: SecurePathOptions
	) => {
		const auth = await Auth.login(credentials, options);
		return new SecurePath(auth);
	};

	public getOrganizations = async () => {
		return Organization.getAll(this.auth);
	};
}
