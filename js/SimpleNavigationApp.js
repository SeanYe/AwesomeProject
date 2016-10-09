'use strict';

import React, { PropTypes } from 'react';
import ReactNative from 'react-native';

var {
  Navigator,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  NativeModules,
  ScrollView
} = ReactNative;

type state = {
  content: string,
}

export default class SimpleNavigationApp extends React.Component {

  state = {
    content: 'Hello world',
    loading: false,
  }
  // loading 状态
  _loadngContent = async (uri) => {
    var mtHttpAndroid=NativeModules.MTHttpAndroid;
    try {
      var response= await mtHttpAndroid.get(uri);
       this.setState({content:response.body,loading:false});    
    } catch (error) {
       this.setState({content:error.message,loading:false});     
    }
  }

 _onPress=(uri)=>{
       if (this.state.loading)
          return;
   
      this.setState({content:"loading",loading:true});
      this._loadngContent(uri);
 }

//  style={styles.showPanel}
  render() {  
    return (
     <View style={{flex: 1}}>
        <ScrollView style={styles.showPanel} >
              <Text >
                {this.state.loading ? `正在加载中...` : this.state.content}
              </Text>
         </ScrollView>

        <View style={styles.controlArea} >
            <View  style={styles.controlSplitArea}>
              <TouchableHighlight style={styles.controlTouchArea} onPress={this._onPress.bind(this, 'https://www.baidu.com')}>
              
                <Text style={styles.controlText}>有效请求</Text>
               </TouchableHighlight>
            </View>
            <View  style={styles.controlSplitArea}>  
              <TouchableHighlight style={styles.controlTouchArea} onPress={this._onPress.bind(this, 'https://www.dd.com')}>
                <Text style={styles.controlText}>无效请求</Text>
              </TouchableHighlight>
            </View>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  showPanel:{
    flex:3,
    borderColor:'green',
    borderStyle:'solid',
    borderWidth:1,
    margin:20,
    backgroundColor: '#6A85B1',
  },
  controlArea: {
    flex: 1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-start',
  },
  controlSplitArea:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center'
  },
  controlTouchArea:{
    borderWidth:1,
    borderColor:'blue'
  },
  controlText:{
    paddingVertical:12,
    paddingHorizontal:20
  }
});