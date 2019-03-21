/**
 * Created by tianzhen on 2019/3/18.
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {setTheme} from '../../actions/settings/theme';
import BaseComponents from "../../components/BaseComponent";
import {View, Header, Title, Content, Left, Button, Icon, Body, Text, Right, ListItem, ActionSheet,} from 'native-base';
import {connect} from "react-redux";
//import {setfont} from '../../actions/settings/fontSize';
const mapStateToProps = (state) => {
    return {
        globalTheme: state.globalTheme,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTheme: payload => dispatch(setTheme(payload))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(class  extends BaseComponents {
    chengetheme = () =>
        ActionSheet.show(
            {
                options: ["红色", "橙色", "黄色", "绿色", "青色", "蓝色", "紫色", "取消"],
                cancelButtonIndex: 7,
                title: "选择主题"
            },
            buttonIndex => {
                switch (buttonIndex) {
                    case 0:
                        this.props.setTheme({color: '#FF0000'});
                        break;
                    case 1:
                        this.props.setTheme({color: '#eeb021'});
                        break;
                    case 2:
                        this.props.setTheme({color: '#fff959'});
                        break;
                    case 3:
                        this.props.setTheme({color: '#40ff23'});
                        break;
                    case 4:
                        this.props.setTheme({color: '#15eec7'});
                        break;
                    case 5:
                        this.props.setTheme({color: '#275bb5'});
                        break;
                    case 6:
                        this.props.setTheme({color: '#670eb5'});
                        break;
                    default:
                        break;
                }
            }
        );
    chengefont = () =>
        ActionSheet.show(
            {
                options: ["12","17", "20", "取消"],
                cancelButtonIndex: 3,
                title: "选择字体大小"
            },
            buttonIndex => {
                switch (buttonIndex) {
                    case 0:
                        this.props.setTheme({fontSize: 12});
                        break;
                    case 1:
                        this.props.setTheme({fontSize: 17});
                        break;
                    case 2:
                        this.props.setTheme({fontSize: 20});
                        break;
                    default:
                        break;
                }
            }
        );
    render() {
        return (
            <View style={[styles.container]}>
                <Header style={{backgroundColor: this.props.globalTheme.color}}>
                    <Title style={[styles.top]}>个人</Title>
                </Header>
                <Content style={{backgroundColor: "#F0EFF5"}}>
                    <View style={styles.listgroup}>
                        <ListItem icon onPress={() => Actions.setting()}>
                            <Left>
                                <Button style={{backgroundColor: "#FF9501"}}>
                                    <Icon active name="person"/>
                                </Button>
                            </Left>
                            <Body>
                            <Text style={{fontSize: this.props.globalTheme.fontSize}}>个人资料</Text>
                            </Body>
                            <Right>
                                <Icon active name="arrow-forward"/>
                            </Right>
                        </ListItem>
                        <ListItem icon onPress={this.chengetheme}>
                            <Left>
                                <Button style={{backgroundColor: "#007AFF"}}>
                                    <Icon active name="color-palette"/>
                                </Button>
                            </Left>
                            <Body>
                                <Text>主题切换</Text>
                            </Body>
                            <Right>
                                <Icon active name="arrow-forward"/>
                            </Right>
                        </ListItem>
                        <ListItem icon onPress={this.chengefont}>
                            <Left>
                                <Button style={{backgroundColor: "#007AFF"}}>
                                    <Icon active name="color-palette"/>
                                </Button>
                            </Left>
                            <Body>
                            <Text>字体大小切换</Text>
                            </Body>
                            <Right>
                                <Icon active name="arrow-forward"/>
                            </Right>
                        </ListItem>
                    </View>
                </Content>
            </View>
        );
    }
});

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
    },
    top: {
        marginTop: 15,
    },
    row: {
        marginBottom: 20,
    },
    listgroup: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#DCDCDC',
        backgroundColor: "#fff",
        marginTop: 30
    }


});