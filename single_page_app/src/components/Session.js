import React, { useEffect, useState }  from 'react'
import {useLocation} from "react-router-dom";

const axios = require('axios');
const Cookies = require('js-cookie')

const Session = () => {

    const search = useLocation().search;
    const code = new URLSearchParams(search).get('code');
    useEffect(() => {
        const params = new URLSearchParams();
    
        params.append('grant_type', 'authorization_code');
        params.append('redirect_uri', "http://localhost:3000/session");
        params.append('client_id', "browserapp");
        params.append('code_verifier', "bd330d88a3899331934030a00007ac8d962d4169196b9d58a646b212");
        params.append('code', code);
        
        const f = async () =>{
            await axios
                .post("http://localhost:8080/realms/main/protocol/openid-connect/token", params)
                .then(result => {
                    const accessToken = result.data.access_token || ''
                    Cookies.set("token", accessToken)
                    window.location.href="http://localhost:3000/wallet";

                })
                .catch(err => {
                    console.log(err);
                })
        }
        f()

    }, [])


    return(
        <div>
            <h1>Session</h1>
        </div>
    )
}

export default Session;