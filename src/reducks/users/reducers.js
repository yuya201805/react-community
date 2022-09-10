import * as Actions from './actions';
import {initialState} from '../store/initialState';

export const UsersReducer = (state = initialState.users, action)  => {
    switch (action.type) {
        case Actions.FETCH_ORDERS_HISTORY:
            return {
                ...state,
                orders: [...action.payload]
            };
        case Actions.FETCH_PRODUCTS_IN_CART:
            return {
                ...state,
                cart: [...action.payload]
            };
        case Actions.SIGN_IN:
            return {
                ...state,
                ...action.payload
            };
        case Actions.SIGN_OUT:
            return {
                ...initialState.users,
            };
        case Actions.FETCH_TARGETS_IN_JOIN:
            return {
                ...state,
                target: [...action.payload]
            };
        case Actions.FETCH_TARGETS_HISTORY:
            console.log("targetttttttttttt", action)
            return {
                ...state,
                targets: [...action.payload]
            };
        default:
            return state
    }
};