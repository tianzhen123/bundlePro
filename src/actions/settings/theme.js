'use strict'
import { SET_GLOBAL_THEME } from '../../reducers/settings/theme';

/**
 * 设置主题
 * @param payload
 * @returns {{payload: *, type: string}}
 */
export function setTheme(payload) {
    return {
        type: SET_GLOBAL_THEME,
        payload: payload
    }
}
