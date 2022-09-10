import * as Actions from './actions';
import {initialState} from '../store/initialState';

export const TargetsReducer = (state = initialState.targets, action)  => {
    switch (action.type) {
      case Actions.DELETE_TARGET:
        return {
            ...state,
            list: action.payload
        };
        case Actions.FETCH_TARGETS:
            return {
                ...state,
                list: action.payload
            };
        default:
            return state
    }
};