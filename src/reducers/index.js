'use strict'

import {combineReducers} from 'redux';
import globalTheme from './settings/theme';

const rootReducer = combineReducers({
    globalTheme:globalTheme,
})

export default rootReducer;//导出，作为统一入口
