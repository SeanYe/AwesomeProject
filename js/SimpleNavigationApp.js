/**
 * @flow
 */
'use strict';

import React, { PropTypes } from 'react';
import ReactNative from 'react-native';

const {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  NativeModules,
  ScrollView,
  ActivityIndicator
} = ReactNative;

type State = {
  content: string,
  loading: boolean,
}

export default class SimpleNavigationApp extends React.Component {
  state: State;

  constructor(props: any) {
    super(props);
    this.state = {
      content: 'Hello world',
      loading: false,
    };
  }

  _loadingContent = async (uri: string) => {
    const mtHttpAndroid = NativeModules.MTHttpAndroid;
    try {
      const response = await mtHttpAndroid.get(uri);
      setTimeout(() => {
        this.setState({ content: response.body, loading: false });
      }, 4000);

    } catch (error) {
      setTimeout(() => {
        this.setState({ content: error.message, loading: false });
      }, 4000);
    }
  }


  _onPress = (uri: string) => {
    if (this.state.loading)
      return;

    this.setState({ content: "loading", loading: true });
    this._loadingContent(uri);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.showPanel} >
          {this.renderContent()}
        </ScrollView>

        <View style={styles.controlArea} >
          <View  style={styles.controlSplitArea}>
            <TouchableHighlight style={styles.controlTouchArea} onPress={this._onPress.bind(this, 'https://www.baidu.com') }>

              <Text style={styles.controlText}>有效请求</Text>
            </TouchableHighlight>
          </View>
          <View  style={styles.controlSplitArea}>
            <TouchableHighlight style={styles.controlTouchArea} onPress={this._onPress.bind(this, 'https://www.dd.com') }>
              <Text style={styles.controlText}>无效请求</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }

  renderContent() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          animating={true}
          style={styles.centering}
          size="large"
          color="white"
        />
      );
    } else {
      return (
        <Text>
          {this.state.content}
        </Text>
      );
    }
  }
}

var styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  showPanel: {
    flex: 3,
    borderColor: 'green',
    borderStyle: 'solid',
    borderWidth: 1,
    margin: 20,
    backgroundColor: '#6A85B1',
  },
  controlArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  controlSplitArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controlTouchArea: {
    borderWidth: 1,
    borderColor: 'blue',
  },
  controlText: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  centering: {
    padding: 8,
  }
});