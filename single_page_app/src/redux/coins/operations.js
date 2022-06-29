import * as actions from './actions';
const axios = require('axios');

export const getCoins = () => {
    return async dispatch => {
        try{
            const response = await axios.get(
                "http://localhost:4000/public"
              );
            if(response.status === 200)
                dispatch(actions.coinsGetAction(response.data));
        }catch(error) {
            console.log(error)
        }
    }
}