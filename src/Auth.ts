import axios, { AxiosInstance } from "axios";

export interface SecurePathLoginOptions {
	email: string;
	password: string;
}

export interface SecurePathOptions {
	baseUrl?: string;
}

export const DEFAULT_BASE_URL = "https://sira.securepath.ae/";

interface ApiTokenResponse {
	token: string;
}

export class Auth {
	private axios: AxiosInstance;

	constructor(public token: string, public baseUrl?: string) {
		this.axios = axios.create({
			headers: {
				Authorization: `Basic ${this.token}`
			},
			baseURL: this.baseUrl
		});
	}

	public static login = async (
		credentials: SecurePathLoginOptions,
		options?: SecurePathOptions
	) => {
		const baseUrl = options?.baseUrl || DEFAULT_BASE_URL;
		const auth = await Auth.getAuthToken(credentials, baseUrl);
		return new Auth(auth.token, baseUrl);
	};

	private static getAuthToken = async (
		credentials: SecurePathLoginOptions,
		baseUrl: string
	) => {
		const response = await axios.post<ApiTokenResponse>(
			`${baseUrl}/api/token`,
			credentials
		);
		return response.data;
	};

	public get = async <Response>(path: string): Promise<Response> => {
		const response = await this.axios.get<Response>(path);
		return response.data;
	};

	public put = async <Response>(
		path: string,
		body: unknown
	): Promise<Response> => {
		const response = await this.axios.put<Response>(path, body);
		return response.data;
	};

	public patch = async <Response>(
		path: string,
		body: unknown
	): Promise<Response> => {
		const response = await this.axios.patch<Response>(path, body);
		return response.data;
	};

	public head = async <Response>(path: string): Promise<Response> => {
		const response = await this.axios.head<Response>(path);
		return response.data;
	};

	public post = async <Response>(
		path: string,
		body: unknown
	): Promise<Response> => {
		const response = await this.axios.post<Response>(path, body);
		return response.data;
	};

	public delete = async <Response>(path: string): Promise<Response> => {
		const response = await this.axios.delete<Response>(path);
		return response.data;
	};
}
