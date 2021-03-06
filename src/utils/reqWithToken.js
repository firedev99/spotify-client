import axios from 'axios'

export default function reqWithToken(endpoint, access_token) {
    let source = axios.CancelToken.source();

    const request = async () => {
        let result
        const options = {
            url: endpoint,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + access_token },
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
}
