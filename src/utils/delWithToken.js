import axios from "axios"

export default function delWithToken(enpoint, token, data) {
    let source = axios.CancelToken.source();

    async function request() {
        let result
        const options = {
            url: enpoint,
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data,
            cancelToken: source.token
        };
        try {
            result = await axios(options);
        } catch (error) {
            if (axios.isCancel(error)) return;
            return error;
        }
        return result;
    }

    return request;
};