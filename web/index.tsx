import { AppRegistry } from 'react-native';
import App from '../App';

AppRegistry.registerComponent('mobile', () => App);
AppRegistry.runApplication('mobile', {
  rootTag: document.getElementById('root'),
});
