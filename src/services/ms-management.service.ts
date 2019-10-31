import axios from 'axios';

export default class MsManagementService {

    static async apiCreate(url, dataToSend: any)
    {
        try
        {
            const response = await axios.post(url, dataToSend);

            return response.data;
        }
        catch(err)
        {
            throw err;
        }
    }

    static async apiCreateUser(userData: any)
    {
        try
        {
            const data = await MsManagementService.apiCreate("http://localhost:6001", userData);

            return data;
        }
        catch(err)
        {
            throw err;
        }
    }
}