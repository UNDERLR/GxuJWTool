import axios from 'axios';

async function post(url: string, data: any, headers: any){
    try {
        const response = await axios.post(url, data, { headers: headers });
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function Http(args: any[]){
    switch (args[0]) {
        case 'post':
            return await post(args[1], args[2], args[3]);
        default:
            console.error('Http method not found');
            break;
    }
}
