/**
 * 基础页面
 */
import React from 'react';
import {StyleSheet} from 'react-native';

class BaseComponents extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('componentDidMount'+ this.props.name)
    }

    componentWillUnmount() {
        console.log('componentWillUnmount' + this.props.name)
    }

    render() {

    }
}

const styles = StyleSheet.create({

});

export default BaseComponents;