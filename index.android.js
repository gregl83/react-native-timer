import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class ReactNativeTimer extends Component {
  constructor (props) {
    super(props)
    // todo - this.handler.bind(this) events
  }
  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          React Native Timer
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    margin: 10,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: 'center',
    color: "black"
  },
});

AppRegistry.registerComponent('ReactNativeTimer', () => ReactNativeTimer);
