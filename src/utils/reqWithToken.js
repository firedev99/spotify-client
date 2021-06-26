import axios from 'axios'

const reqWithToken = (endpoint, access_token, cancelSource) => {
    const request = async () => {
        let result
        const options = {
            url: endpoint,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + access_token },
            cancelToken: cancelSource.token
        };
        try {
            result = await axios(options)
        } catch (err) {
            if (axios.isCancel(err)) return
            return err;
        }
        return result
    }

    return request
}

export default reqWithToken