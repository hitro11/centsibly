import axios from 'axios';

export async function performRedditRequest(
    url: string,
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    accessToken: string
) {
    return axios({
        url,
        method: method.toLowerCase(),
        headers: { Authorization: `Bearer ${accessToken}` },
    });
}
