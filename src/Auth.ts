import axios, { AxiosError, AxiosInstance } from "axios";
import btoa from "btoa";
import { SecurePathApiError } from "./SecurePathApiError";

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

interface ApiErrorResponse {
	error_code: string;
	error_message: string;
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
		return new Auth(auth, baseUrl);
	};

	private static getAuthToken = async (
		credentials: SecurePathLoginOptions,
		baseUrl: string
	) => {
		const response = await axios.post<ApiTokenResponse>(
			`${baseUrl}/api/token`,
			credentials
		);
		return Auth.tokenToBase64(response.data.token);
	};

	private static tokenToBase64 = (token: string) => {
		return btoa(`${token}:junk`);
	};

	public get = async <Response>(path: string): Promise<Response> => {
		const response = await this.axios
			.get<Response>(path)
			.catch(this.handleError);
		return response.data;
	};

	public put = async <Response>(
		path: string,
		body: unknown
	): Promise<Response> => {
		const response = await this.axios
			.put<Response>(path, body)
			.catch(this.handleError);
		return response.data;
	};

	public patch = async <Response>(
		path: string,
		body: unknown
	): Promise<Response> => {
		const response = await this.axios
			.patch<Response>(path, body)
			.catch(this.handleError);
		return response.data;
	};

	public head = async <Response>(path: string): Promise<Response> => {
		const response = await this.axios
			.head<Response>(path)
			.catch(this.handleError);
		return response.data;
	};

	public post = async <Response>(
		path: string,
		body: unknown
	): Promise<Response> => {
		const response = await this.axios
			.post<Response>(path, body)
			.catch(this.handleError);
		return response.data;
	};

	public delete = async <Response>(path: string): Promise<Response> => {
		const response = await this.axios
			.delete<Response>(path)
			.catch(this.handleError);
		return response.data;
	};

	private handleError = (error: AxiosError<ApiErrorResponse>) => {
		if (error?.response?.data?.error_code) {
			throw new SecurePathApiError(
				error.response.data.error_message,
				error.response.data.error_code
			);
		}
		throw error;
	};
}
