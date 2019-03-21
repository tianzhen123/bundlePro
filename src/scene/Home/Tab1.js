/**
 * 主页标签页1
 */
import React from 'react';
import {StyleSheet, WebView, Dimensions} from 'react-native';
import {
    Button,
    Container,
    Content, Header, Icon, Right,
    Left
} from "native-base";
import BaseComponents from "../../components/BaseComponent";
import {Actions} from 'react-native-router-flux'
import {connect} from "react-redux";

let {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');


const mapStateToProps = (state) => {
    return {
        globalTheme: state.globalTheme,
    }
}

export default connect(mapStateToProps)(class extends BaseComponents {
    componentDidMount() {
        super.componentDidMount();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    _openDrawer = () => {
        // 关闭用 Actions.drawerClose()
        Actions.drawerOpen()
    };

    render() {
        return (
            <Container style={styles.container}>
                <Header style={{backgroundColor: this.props.globalTheme.color}}>
                    <Left>
                        <Button transparent onPress={this._openDrawer}>
                            <Icon name='menu' style={{fontSize: 30}}/>
                        </Button>
                    </Left>
                    <Right>
                        <Button transparent onPress={this.handleBack}>
                            <Icon name='add' style={{fontSize: 30}}/>
                        </Button>
                    </Right>
                </Header>
                <Content padder={false} style={{backgroundColor: "#fff", paddingTop: 20}}>
                    <WebView bounces={false}
                             scalesPageToFit={true}
                             source={{uri:"http://www.yonyou.com",method: 'GET'}}
                             style={{width:deviceWidth, height:deviceHeight}}>
                    </WebView>
                </Content>
            </Container>
        );
    }
})

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
});