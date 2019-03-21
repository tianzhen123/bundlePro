/**
 * 基于RN-AsyncStorage 设备存储。
 */
import merge from 'lodash.merge';
import {AsyncStorage} from 'react-native';

const deviceStorage = {
    /**
     * 获取一个键或一组键的一个或多个值
     * @param {String|Array} 一个key或一组key
     * @return {Promise}
     */
    get(key) {
        if (!Array.isArray(key)) {
            return AsyncStorage.getItem(key).then(value => {
                return JSON.parse(value);
            });
        } else {
            return AsyncStorage.multiGet(key).then(values => {
                return values.map(value => {
                    return JSON.parse(value[1]);
                });
            });
        }
    },

    /**
     * 保存一个键值对或一组键值对
     * @param  {String|Array} 一个key或一组key
     * @param  {Any}
     * @return {Promise}
     */
    save(key, value) {
        if (!Array.isArray(key)) {
            return AsyncStorage.setItem(key, JSON.stringify(value));
        } else {
            var pairs = key.map(function (pair) {
                return [pair[0], JSON.stringify(pair[1])];
            });
            return AsyncStorage.multiSet(pairs);
        }
    },

    /**
     * 更新。如果是字符串，会替换字符串。如果是一个对象，则会深度合并。
     * @param  {String}
     * @param  {Value}
     * @return {Promise}
     */
    update(key, value) {
        return deviceStorage.get(key).then(item => {
            value = typeof value === 'string' ? value : merge({}, item, value);
            return AsyncStorage.setItem(key, JSON.stringify(value));
        });
    },

    /**
     * 删除某个或某组key的值
     * @param  {String|Array}
     * @return {Promise}
     */
    delete(key) {
        if (Array.isArray(key)) {
            return AsyncStorage.multiRemove(key);
        } else {
            return AsyncStorage.removeItem(key);
        }
    },

    /**
     * 获取所有key
     * @return {Promise}
     */
    keys() {
        return AsyncStorage.getAllKeys();
    },

    /**
     * 创建或推送值到数组上
     * @param {String}
     * @param {Any}
     * @return {Promise}
     */
    push(key, value) {
        return deviceStorage.get(key).then((currentValue) => {
            if (currentValue === null) {
                // if there is no current value populate it with the new value
                return deviceStorage.save(key, [value]);
            }
            if (Array.isArray(currentValue)) {
                return deviceStorage.save(key, [...currentValue, value]);
            }
            throw new Error(`已存在的key "${key}" 必须是null或者Array类型。当前类型为 ${typeof currentValue}.`);
        });
    },
};

module.exports = deviceStorage;