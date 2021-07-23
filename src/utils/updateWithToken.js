import axios from "axios"

const updateWithToken = (enpoint, token, data) => {
    let source = axios.CancelToken.source();

    const request = async () => {
        let result
        const options = {
            url: enpoint,
            method: 'PUT',
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
            if (axios.isCancel(error)) return
            return error;
        }
        return result;
    }

    return request;
};

export default updateWithToken;