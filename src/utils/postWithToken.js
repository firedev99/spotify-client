import axios from "axios"

const postWithToken = (enpoint, access_token) => {
    let source = axios.CancelToken.source();

    const request = async () => {
        let result
        const options = {
            url: enpoint,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            cancelToken: source.token
        };
        try {
            result = await axios(options);
        } catch (error) {
            if (axios.isCancel(error)) return
            return error;
        }
        return result;
    }

    return request;
};

export default postWithToken;