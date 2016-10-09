/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import SimpleNavigationApp from './js/SimpleNavigationApp';

class AwesomeProject extends Component {
  render() {
    return (
      <SimpleNavigationApp />
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);