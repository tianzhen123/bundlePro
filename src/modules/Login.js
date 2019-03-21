/**
 * 登录页
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import {
    Container,
    Content,
    Button,
    Text,
    Form,
    Item,
    Input,
    Header,
    Label,
    Body,
    Title
} from "native-base";
import {connect} from 'react-redux';
import {USER_LOGIN_REQUEST} from '../sagas';
import BaseComponents from "../components/BaseComponent";
import DeviceStorage from '../framework/storage/deviceStorage';

/**
 * 获取全局状态
 * @param state
 */
const mapStateToProps = (state) => {
    return {
        globalTheme: state.globalTheme,
    }
}

class LoginScene extends BaseComponents {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: ''
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this.getLocalUser();
    }

    getLocalUser() {
        DeviceStorage.get('user').then(user => {
            this.setState({account: user.userName, password: user.password});
        })
    }

    /**
     * 登录事件
     */
    loginSubmit = () => {
        const {dispatch} = this.props;
        let data = {
            account: this.state.account,
            password: this.state.password
        }
        dispatch({type: USER_LOGIN_REQUEST, data});
    }

    render() {
        return (
            <Container>
                <Header style={{backgroundColor: this.props.globalTheme.color}}>
                    <Body style={styles.pl15}>
                    <Title>登录</Title>
                    </Body>
                </Header>
                <Content>
                    <Text style={styles.logo}>AMDP</Text>
                    <Form style={styles.pr15}>
                        <Item floatingLabel>
                            <Label>用户名</Label>
                            <Input onChangeText={(name) => {
                                this.setState({account: name});
                            }} value={this.state.account}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>密码</Label>
                            <Input onChangeText={(pwd) => {
                                this.setState({password: pwd});
                            }} value={this.state.password}/>
                        </Item>
                    </Form>
                    <Button primary block style={[styles.mr15, styles.ml15, styles.mt15]}
                            onPress={this.loginSubmit}><Text>登录</Text></Button>
                </Content>
            </Container>
        );
    }
}

export default connect(mapStateToProps)(LoginScene);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
    pr15: {
        paddingRight: 15
    },
    pl15: {
        paddingLeft: 15
    },
    mr15: {
        marginRight: 15
    },
    ml15: {
        marginLeft: 15
    },
    mb15: {
        marginBottom: 15
    },
    mt15: {
        marginTop: 15
    },
    logo: {
        textAlign: 'center',
        fontSize: 36,
        color: '#3f51b5',
        height: 100,
        lineHeight: 100,
        fontWeight: 'bold',
    },
    loginSta: {
        textAlign: 'center',
        color: '#999'
    }
});
