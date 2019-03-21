/**
 * @format
 * @lint-ignore-every
 */
import 'native-base';
import 'react-native-root-siblings';
import 'react-native-root-toast';
import 'react-native-vector-icons/FontAwesome';

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
