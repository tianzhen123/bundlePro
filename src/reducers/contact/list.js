'use strict'
// 联系人

import {RefreshState} from "../../components/RefreshListView";

export const CONTACT_LIST = "CONTACT_LIST";
export const CONTACT_LIST_REQUEST_STATE = "CONTACT_LIST_REQUEST_STATE";

const initialState = {
    list: [],
    requestState: RefreshState.Idle
}

export default function getList(state = initialState, action) {
    switch (action.type) {
        case CONTACT_LIST:
            return {
                ...state,
                list: action.list,
            }
            break;
        case CONTACT_LIST_REQUEST_STATE:
            console.log('CONTACT_LIST_REQUEST_STATE', action);
            return {
                ...state,
                requestState: action.requestState,
            }
            break;
        default:
            return state;
    }

}
