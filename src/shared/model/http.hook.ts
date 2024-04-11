import { headerDefault } from "./constants";

export const useHttp = () => {
    const request = async (url: string, method : string = 'GET', body : BodyInit | null = null, headers : HeadersInit = headerDefault) => {
        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(e) {
            throw e;
        }
    };

    return {request}
}