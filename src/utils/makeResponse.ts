interface IResponse {
    message: string;
    data?: any | null
}

export function makeResponse(message: string, data: any = null): IResponse {
    let response: IResponse = {
        message: message,
        data: data
    }

    return response;
}