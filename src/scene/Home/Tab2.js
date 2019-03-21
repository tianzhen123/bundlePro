/**
 * Created by tianzhen on 2019/3/19.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    TouchableNativeFeedback,
    TouchableHighlight,
    Platform,
    Dimensions,
    Image,
    NativeModules
} from 'react-native';
import { Header, Content, Title, Button, Picker, ListItem, Text, Icon, Left, Body, Right, Switch, ActionSheet} from 'native-base';
import RNFS from 'react-native-fs'
const RNBridgeModules = NativeModules.RNBridgeModule;
const isIOS = Platform.OS == "ios";
const { width, height } = Dimensions.get('window');
const dirs = Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath;

export default class Tab2 extends Component {
    constructor(props){
        super(props)
        this.state={
            dataItem:[
                {name:'安健环',moduleName:'reactnative_multibundler2',bundleName:`${dirs}/index2.ios.bundle`,bundleUrl:'https://king-pic.nos-eastchina1.126.net/index2.ios.bundle'},
                {name:'汇智公司',moduleName:'reactnative_multibundler2',bundleName:'index2.ios'},
                {name:'生产信息',moduleName:'',bundleName:''},
                {name:'移动平台',bundleName:'',bundleUrl:''},
                {name:'证书管理',bundleName:'',bundleUrl:''},
                {name:'审批',bundleName:'',bundleUrl:''},
                {name:'移动协同',bundleName:'',bundleUrl:''}
                ],
        }
    }

    _openBundle(data){
        if(data.moduleName && data.bundleName && data.bundleUrl){
        const downloadDest = `${dirs}/index2.ios.bundle`;
        console.log(downloadDest);
        //let item = data;
        //item.bundleName = downloadDest;
       // data.bundleName = downloadDest;
        RNFS.exists(downloadDest)
            .then((value) =>{
                if(value){
                    RNBridgeModules.backToViewController(data);
                }else{
                    this.downloadFile(data);
                }
            })
            .catch((err) =>{
                console.log(err.message);
            })
        }
    }
    _openLoaclBundle(data){
        RNBridgeModules.backToViewController(data);
    }

    /*下载文件*/
    downloadFile(data) {

        const downloadDest = `${dirs}/index2.ios.bundle`;

        const options = {
            fromUrl: data.bundleUrl,
            toFile: downloadDest,
            background: true,
            begin: (res) => {
                console.log('begin', res);
                console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
            },
            progress: (res) => {

                let pro = res.bytesWritten / res.contentLength;

            }
        };
        try {
            const ret = RNFS.downloadFile(options);
            ret.promise.then(res => {
                console.log('success', res);

                console.log('file://' + downloadDest)

                RNBridgeModules.backToViewController(data);

            }).catch(err => {
                console.log('err', err);
            });
        }
        catch (e) {
            console.log(error);
        }

    }

    _renderTypes() {
        const w = width / 4, h = w * .8 + 20
        let renderSwipeView = (types) => {
            return (
                <View style={styles.typesView}>
                    {
                        types.map((item, i) => {
                            let render = (
                                <View style={[{width: w, height: h}, styles.typesItem]}>
                                    <View style={styles.item}>
                                        <Image source={require('../../Images/h_5.png')} style={{width: w * .5, height: w * .5}}/>
                                        <Text style={{fontSize: 12, color: "#fff"}}>{item.name}</Text>
                                    </View>
                                </View>
                            )
                            return (
                                isIOS ? (
                                    <TouchableHighlight style={{width: w, height: h}} key={i} onPress={()=>{
                                        this._openBundle(item);
                                    }}>{render}</TouchableHighlight>
                                ) : (
                                    <TouchableNativeFeedback style={{width: w, height: h}} key={i} onPress={()=>{
                                        this._openBundle(item);
                                    }}>{render}</TouchableNativeFeedback>
                                )
                            )
                        })
                    }
                </View>
            )
        }
        return (
            <View>
             {renderSwipeView(this.state.dataItem)}
            </View>
         )
    }
    render() {
        return (
           <SafeAreaView style={styles.container}>
                <Header style={{backgroundColor:'white'}}>
                    <Body >
                        <Title>应用</Title>
                    </Body>
                </Header>
               <Content style={{backgroundColor:"#F0EFF5"}}>
                   <View style={styles.itemsView}>
                       {this._renderTypes()}
                   </View>
               </Content>
           </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    row: {
        marginBottom: 20,
    },
    listgroup: {
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#DCDCDC',
        backgroundColor:"#fff",
        marginTop:30
    },
    typesView: {
        flex: 1,
        backgroundColor: "#fff",
        width:width,
        height:width*.2+20,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    typesItem: {
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: "center",
    },
    item:{
        justifyContent: "center",
        alignItems: "center",
        margin:5,padding:5,
        backgroundColor:'rgb(55,162,148)',
        borderRadius:10
    },
    itemsView:{
        backgroundColor:'#fff',
    }
});