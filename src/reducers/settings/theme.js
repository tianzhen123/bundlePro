'use strict'
export const SET_GLOBAL_THEME = "SET_GLOBAL_THEME";
//
const initialState = {
    color:'#3F51B5',
    fontSize: 17,
}

export default function globalTheme(state=initialState,action) {
    switch (action.type){
        case SET_GLOBAL_THEME:
            return {
                ...state,
                ...action.payload
            }
            break;
        default:
            return state;
    }
}
