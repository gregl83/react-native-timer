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
        sessionElapsed: 0,
        setElapsed: 0,
        phaseElapsed: 0,
        state: 'Initialized',
        event: '',
    }

    // todo - this.handler.bind(this) events
  }
  componentDidMount() {
    let timer = new Timer(config)

    timer.addListener('ticked', event => {
        this.setState((prevState, props) => ({
            sessionElapsed: prevState.sessionElapsed + 1,
            setElapsed: prevState.setElapsed + 1,
            phaseElapsed: prevState.phaseElapsed + 1,
        }));
    })

    timer.addListener('started', event => {
        this.setState((prevState, props) => ({
            state: 'Started',
        }));
    })

    timer.addListener('stopped', event => {
        this.setState((prevState, props) => ({
            state: 'Stopped',
        }));
    })

    // session events
    timer.addListener('session.started', event => {
        this.setState((prevState, props) => ({
            event: event.data.attributes.name,
        }))
    })
    timer.addListener('session.finished', event => {
        this.setState((prevState, props) => ({
            event: event.data.attributes.name,
        }))
    })

    // set events
    timer.addListener('set.started', event => {
        this.setState((prevState, props) => ({
            setElapsed: 0,
            event: event.data.attributes.name,
        }))
    })
    timer.addListener('set.finished', event => {
        this.setState((prevState, props) => ({
            event: event.data.attributes.name,
        }))
    })

    // phase events
    timer.addListener('phase.started', event => {
        this.setState((prevState, props) => ({
            phaseElapsed: 0,
            event: event.data.attributes.name,
        }))
    })
    timer.addListener('phase.finished', event => {
        this.setState((prevState, props) => ({
            event: event.data.attributes.name,
        }))
    })

    // custom events
    timer.addListener('alpha-reminder', event => {
        this.setState((prevState, props) => ({
            event: event.data.attributes.name,
        }))
    })
    timer.addListener('bravo-reminder', event => {
        this.setState((prevState, props) => ({
          event: event.data.attributes.name,
        }))
    })
    timer.addListener('session-reminder', event => {
        this.setState((prevState, props) => ({
          event: event.data.attributes.name,
        }))
    })
    timer.addListener('set-reminder', event => {
        this.setState((prevState, props) => ({
          event: event.data.attributes.name,
        }))
    })

    setTimeout(() => timer.start(), 2000)
  }
  componentWillUnmount() {}
  render() {
    let sessionElapsed = this.state.sessionElapsed
    let setElapsed = this.state.setElapsed
    let phaseElapsed = this.state.phaseElapsed
    let state = this.state.state
    let event = this.state.event
    return (
      <View style={styles.container}>
        <Text style={styles.header}>React Native Timer</Text>
        <Text style={styles.metadata}>Session: {sessionElapsed}</Text>
        <Text style={styles.metadata}>Set: {setElapsed}</Text>
        <Text style={styles.metadata}>Phase: {phaseElapsed}</Text>
        <Text style={styles.metadata}>State: {state}</Text>
        <Text style={styles.metadata}>Event: {event}</Text>
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
  metadata: {
      margin: 5,
      fontSize: 14,
      fontWeight: "bold",
      textAlign: 'center',
      color: "black"
    },
});

AppRegistry.registerComponent('ReactNativeTimer', () => ReactNativeTimer);
