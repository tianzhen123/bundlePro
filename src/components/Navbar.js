import React, {Component} from 'react';
import {Badge, Button, Footer, FooterTab, Icon, Text} from "native-base";
import {Actions} from "react-native-router-flux";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        globalTheme: state.globalTheme,
    }
}


class Navbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'Tab1'
        }
    }

    render(){
        const curTab = this.state.selectedTab;
        return (
            <Footer>
                <FooterTab style={{backgroundColor:'#F6F6F6',borderTopWidth:1,borderTopColor:'#DCDCDC'}}>
                    <Button style={{backgroundColor:'#F6F6F6'}} active={curTab=="Tab1"?true:false} badge vertical onPress={() => {Actions.Tab1();this.setState({selectedTab:'Tab1'})}}>
                        <Badge><Text>2</Text></Badge>
                        <Icon name="cloud" style={curTab=="Tab1"?{color:this.props.globalTheme.color}:{color:'#A9A9A9'}} />
                        <Text style={curTab=="Tab1"?{color:this.props.globalTheme.color}:{color:'#A9A9A9'}}>用友云</Text>
                    </Button>
                    <Button style={{backgroundColor:'#F6F6F6'}} active={curTab=="Tab2"?true:false} vertical onPress={() => {Actions.Tab2();this.setState({selectedTab:'Tab2'})}}>
                        <Icon name="appstore" style={curTab=="Tab2"?{color:this.props.globalTheme.color}:{color:'#A9A9A9'}} />
                        <Text style={curTab=="Tab2"?{color:this.props.globalTheme.color}:{color:'#A9A9A9'}}>应用</Text>
                    </Button>
                    <Button style={{backgroundColor:'#F6F6F6'}} active={curTab=="Tab4"?true:false} vertical onPress={() => {Actions.Tab4();this.setState({selectedTab:'Tab4'})}}>
                        <Icon name="person" style={curTab=="Tab4"?{color:this.props.globalTheme.color}:{color:'#A9A9A9'}} />
                        <Text style={curTab=="Tab4"?{color:this.props.globalTheme.color}:{color:'#A9A9A9'}}>个人</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
}


export default connect(mapStateToProps)(Navbar);