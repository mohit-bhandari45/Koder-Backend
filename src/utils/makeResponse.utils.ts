interface IResponse {
    message: string;
    data?: any | null;
    token?: string | null;
}

export function makeResponse(message: string, data?: any, token?: string): IResponse {
    const response: IResponse = { message };

    if (data !== null && data !== undefined) {
        response.data = data;
    }

    if (token !== null && token !== undefined) {
        response.token = token;
    }

    return response;
}
