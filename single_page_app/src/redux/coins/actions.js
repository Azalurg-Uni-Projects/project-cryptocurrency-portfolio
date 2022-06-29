import types from './types';

export const coinsGetAction = (coins) => ({
    type: types.COINS_GET,
    payload: coins
});