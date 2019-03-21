/**
 * 设置页面
 */

'use strict';

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Icon, Title, Header, Left, Right, Container, Content, Body, Thumbnail, Text, Button} from 'native-base';
import {ActionConst, Actions, ActionsStatic} from "react-native-router-flux";
import {connect} from "react-redux";
import BaseComponents from "../../components/BaseComponent";
import deviceStorage from '../../framework/storage/deviceStorage';

const uri = "https://static.yonyoucloud.com/5417/2914465/201612/13/14816008206d1b4e55bef181738317aa56c280d3dc.jpg.thumb.jpg";
//const uri = '../../Images/userimg.jpg';
const mapStateToProps = (state) => {
    return {
        globalTheme: state.globalTheme,
    }
}

class Settings extends BaseComponents {

    constructor(props) {
        super(props);
        this.state = {
            user:'',
        }
    }

    handleBack = () => {
        Actions.pop();
    }



    componentDidMount() {
        super.componentDidMount();
        this.getLocalUser();
    }

    getLocalUser() {
        deviceStorage.get('user').then(user => {
            if(user){
                user.sex = user.sex = 1 ?'男':'女';
                user.headImg = user.headImg.indexOf('http') ? uri : user.headImg;
            }
            this.setState({user:user});
        })
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header style={{backgroundColor: this.props.globalTheme.color}}>
                    <Left>
                        <Button transparent onPress={this.handleBack}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>设置</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder style={{backgroundColor:"#F0EFF5"}}>
                    <Body style={styles.row}>
                        <Body style={styles.column}>
                            <Body style={styles.row1}>
                                <Text style={styles.row2}>姓&#8195;名:</Text>
                                <Text style={styles.row}>{this.state.user.realName}</Text>
                            </Body>
                            <Body style={styles.row1}>
                                <Text style={styles.row2}>用户名:</Text>
                                <Text style={styles.row}>{this.state.user.userName}</Text>
                            </Body>

                            <Body style={styles.row1}>
                                <Text style={styles.row2}>生&#8195;日:</Text>
                                <Text style={styles.row}>{this.state.user.birthday}</Text>
                            </Body>

                            <Body style={styles.row1}>
                                <Text style={styles.row2}>性&#8195;别:</Text>
                                <Text style={styles.row}>{this.state.user.sex}</Text>
                            </Body>

                        </Body>

                        <Body style={styles.icon}>
                            <Thumbnail large source={{uri: this.state.user.headImg}}/>
                        </Body>
                    </Body>

                    <Body style={styles.row1}>
                        <Text style={styles.row2}>地&#8195;址:</Text>
                        <Text style={styles.row}>{this.state.user.address}</Text>
                    </Body>
                    <Body style={styles.row1}>
                        <Button onPress={() => Actions.login({type: ActionConst.RESET})}><Text>退出登录</Text></Button>
                    </Body>
                </Content>
            </Container>
        );
    }
}

export default connect(mapStateToProps)(Settings);

const styles = StyleSheet.create({
    container: {

    },
    row: {
        flex: 1,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    row1: {
        flex: 1,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10
    },

    row2: {
        width: 80,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    column: {
        flex: 3,
        alignSelf: 'flex-start',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },

    icon: {
        width: 300,
        alignSelf: 'flex-start',
        marginTop: 10
    }
});
