import React, {Component} from 'react';
import LoginScene from './modules/Login';
import Flash from './scene/Flash';
import Tab1 from './scene/Home/Tab1';
import Tab2 from './scene/Home/Tab2'
import Tab4 from './scene/Home/Tab4';
import {Provider} from 'react-redux'
import {Actions, Scene, Router} from 'react-native-router-flux'
import {bindBackExitApp, removeBackExitApp} from './framework/utils/appExit';
import configureStore from './store/configureStore';
import rootSaga from './sagas';
import SettingScene from './scene/Settings/SettingScene';
import Navbar from './components/Navbar';
import {Root} from 'native-base';

const store = configureStore()
store.runSaga(rootSaga)


const scenes = Actions.create(
    <Scene key="root" gesturesEnabled={false}>
        <Scene key="flash" component={Flash} hideNavBar type={'replace'}/>
        <Scene key="login" component={LoginScene} hideNavBar type={'replace'}/>
        <Scene key="setting" component={SettingScene} hideNavBar/>
        <Scene key="tabbar" tabs={true} hideNavBar activeTintColor={"#ee9531"} tabBarComponent={Navbar}>
            <Scene key="Tab1" component={Tab1} hideNavBar onEnter={bindBackExitApp.bind(this, {msg: '再按一次退出应用'})}
                   onExit={removeBackExitApp}/>
            <Scene key="Tab2" component={Tab2} hideNavBar/>
            <Scene key="Tab4" component={Tab4} hideNavBar/>
        </Scene>
    </Scene>
);


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Root>
                    <Router scenes={scenes}/>
                </Root>
            </Provider>
        )
    }
}
