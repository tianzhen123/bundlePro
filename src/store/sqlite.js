import React, {Component} from 'react';

import SQLiteStorage from 'react-native-sqlite-storage';

SQLiteStorage.DEBUG(true);
let database_name = "test.db";
let database_version = "1.0";
let database_displayname = "MySQLite";
let database_size = -1;
let sqlite;

export default class SQLite extends Component {

    componentWillUnmount() {
        if (sqlite) {
            this._successCB('close');
            sqlite.close();
        } else {
            console.log("SQLiteStorage not open");
        }
    }

    open() {
        sqlite = SQLiteStorage.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
            () => {
                this._successCB('open');
            },
            (err) => {
                this._errorCB('open', err);
            });
        return sqlite;
    }

    createTable(sql) {
        if (!sqlite) {
            this.open();
        }
        //创建用户表
        var result = '';
        sqlite.transaction((tx) => {
            tx.executeSql(sql
                , [], () => {
                    this._successCB('executeSql');
                }, (err) => {
                    this._errorCB('executeSql', err);
                });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
            result = err;
        }, () => {
            this._successCB('transaction');
        })
    }

    deleteData(sql) {
        if (!sqlite) {
            this.open();
        }
        sqlite.transaction((tx) => {
            tx.executeSql(sql, [], () => {

            },(err) =>{
                res = err;
            });
        },(err) =>{
            res = err;
        },() =>{
        });
    }

    dropTable() {

        sqlite.transaction((tx) => {
            tx.executeSql('drop table user', [], () => {
            });
        }, (err) => {
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });

    }

    insertUserData(sql) {

        if (!sqlite) {
            this.open();
        }

        sqlite.transaction((tx) =>{
            tx.executeSql(sql,[],() =>{

            }),(err) => {
                console.log(err);
            }
        }, (error) => {
            this._errorCB('transaction', error);
        }, () => {
            this._successCB('transaction insert data');
        })

    }

    close() {
        if (sqlite) {
            this._successCB('close');
            sqlite.close();
        } else {
            console.log("SQLiteStorage not open");
        }
        sqlite = null;
    }

    _successCB(name) {
        console.log("SQLiteStorage " + name + " success");
    }

    _errorCB(name, err) {
        console.log("SQLiteStorage " + name);
        console.log(err);
    }


    render() {
        return null;
    }
}