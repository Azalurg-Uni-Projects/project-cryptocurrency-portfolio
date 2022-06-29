import types from "./types";

export const coinsReducer = (state = [], action) => {
    const payload = action.payload;
    switch(action.type) {
        case types.COINS_GET:
            return [...payload];
        default: 
            return state;
    }
};