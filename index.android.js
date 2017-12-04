import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Timer from './src/Timer'
import config from './config.json'

export default class ReactNativeTimer extends Component {
  constructor (props) {
    super(props)

    this.state = {
        elapsed: 0,
    }

    let timer = new Timer(config)

    timer.addListener('ticked', () => {
      this.setState((prevState, props) => ({
          elapsed: prevState.elapsed + 1
      }));
    })

    timer.start()

    // todo - this.handler.bind(this) events
  }
  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    let elapsed = this.state.elapsed
    return (
      <View style={styles.container}>
        <Text style={styles.header}>React Native Timer</Text>
        <Text style={styles.header}>Ticks: {elapsed}</Text>
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
