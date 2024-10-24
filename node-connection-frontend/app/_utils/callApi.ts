export interface ApiResponse<T> {
  success: boolean;
  contents: T | null;
  total?: number;
  offset?: null | number;
  limit?: number;
  error?: { code: number; message: string } | null;
}

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type ApiOptions = {
  endpoint: string;
  method?: ApiMethod;
  body?: any;
  params?: Record<string, string | number | boolean>;
  token?: string | null;
  options?: any;
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const callApi = async <T>({
  endpoint,
  method = "GET",
  body = {},
  params = {},
  token = null,
}: ApiOptions): Promise<ApiResponse<T>> => {
  try {
    const queryString = Object.keys(params).length
      ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
      : "";
    const url = `${baseUrl}${endpoint}${queryString}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const fetchOptions: RequestInit = {
      method,
      headers,
      body: method !== "GET" ? JSON.stringify(body) : null,
      cache: "no-store",
    };

    const response = await fetch(url, fetchOptions);

    // if (!response.ok) {
    //   console.error(await response.json());
    //   throw new Error(
    //     `HTTP response was not OK: ${response.status} ${response.statusText}`,
    //   );
    // }

    const responseData: ApiResponse<T> = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(`API call failed | ${error}`);
  }
};

export default callApi;
