import * as Yup from 'yup';

export const walletSchema = Yup.object().shape({
    coin_name: Yup.string().required(),
    amount: Yup.number().required()
})