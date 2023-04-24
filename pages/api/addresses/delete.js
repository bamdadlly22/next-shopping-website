import axios from "axios";
import { handleError } from "lib/helper";
import cookie from "cookie";


export default async function handler(req, res) {
    if(req.method === 'POST') {
        if(!req.cookies.token) {
            res.status(403).json({message: 'ورود ناموفق یکبار دیگر تلاش کنید'});
            return;
        }
        try {
            const resApi = await axios.post('profile/addresses/delete', {
                address_id: req.body.address_id
            }, {
                headers: {
                    'Authorization': `Bearer ${req.cookies.token}`
                }
            });
            res.status(200).json(resApi.data.data)
        } catch(err) {
            res.status(422).json({message: {'error' : [handleError(err)]}})
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({message : `method ${req.method} not allowed`})
    }
}
