/**
 * 闪屏页面
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import {ActionConst, Actions} from 'react-native-router-flux';
import {
    Container,
    Content,
    Text
} from "native-base";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF3030',
        flexDirection: 'row',
        alignItems: "center",
    },
    mb: {
        flex: 1,
        margin: 20,
        alignSelf: 'center'
    },
});

export default class extends React.Component {

    componentWillMount(){
        this.timer && clearTimeout(this.timer);
    }

    componentDidMount(){
        this.startTimer();
    }

    startTimer() {
        this.timer = setTimeout(() => {
            Actions.login({type: ActionConst.RESET});
        }, 2000)
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content padder style={styles.mb}>
                    <Text style={{alignSelf: 'center', color: '#FFFFFF', fontSize: 28}}>AMDP</Text>
                    <Text style={{alignSelf: 'center', color: '#FFFFFF'}}>Demo</Text>
                </Content>
            </Container>
        );
    }
}
