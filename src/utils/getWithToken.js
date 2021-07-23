import axios from 'axios'

export default function getWithToken(endpoint, access_token, cancelSource) {
    async function request() {
        let result;
        const cancelToken = cancelSource.token;

        const options = {
            url: endpoint,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + access_token },
            cancelToken
        };
        try {
            result = await axios(options);
        } catch (err) {
            if (axios.isCancel(err)) return
            return err;
        }
        return result
    }

    return request;
}