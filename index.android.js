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
        set: 0,
        setElapsed: 0,
        phase: 0,
        phaseElapsed: 0,
        state: 'Initialized',
        events: Array(10).fill({data: {attributes: {name: " "}}}),
    }
  }
  componentDidMount() {
    let timer = new Timer(config)

    timer.addListener('ticked', event => {
        this.setState((prevState, props) => ({
            sessionElapsed: prevState.sessionElapsed + 1,
            setElapsed: prevState.setElapsed + 1,
            phaseElapsed: prevState.phaseElapsed + 1,
            events: [event].concat(prevState.events),
        }));
    })

    timer.addListener('started', event => {
        this.setState((prevState, props) => ({
            state: 'Started',
            events: [event].concat(prevState.events),
        }));
    })

    timer.addListener('stopped', event => {
        this.setState((prevState, props) => ({
            state: 'Stopped',
            events: [event].concat(prevState.events),
        }));
    })

    // session events
    timer.addListener('session.started', event => {
        this.setState((prevState, props) => ({
            events: [event].concat(prevState.events),
        }))
    })
    timer.addListener('session.finished', event => {
        this.setState((prevState, props) => ({
            events: [event].concat(prevState.events),
        }))
    })

    // set events
    timer.addListener('set.started', event => {
        this.setState((prevState, props) => ({
            set: event.meta.set + 1,
            setElapsed: 0,
            events: [event].concat(prevState.events),
        }))
    })
    timer.addListener('set.finished', event => {
        this.setState((prevState, props) => ({
            events: [event].concat(prevState.events),
        }))
    })

    // phase events
    timer.addListener('phase.started', event => {
        this.setState((prevState, props) => ({
            phase: event.meta.phase + 1,
            phaseElapsed: 0,
            events: [event].concat(prevState.events),
        }))
    })
    timer.addListener('phase.finished', event => {
        this.setState((prevState, props) => ({
            events: [event].concat(prevState.events),
        }))
    })

    // custom events
    timer.addListener('alpha-reminder', event => {
        this.setState((prevState, props) => ({
            events: [event].concat(prevState.events),
        }))
    })
    timer.addListener('bravo-reminder', event => {
        this.setState((prevState, props) => ({
          events: [event].concat(prevState.events),
        }))
    })
    timer.addListener('charlie-reminder', event => {
        this.setState((prevState, props) => ({
          events: [event].concat(prevState.events),
        }))
    })
    timer.addListener('delta-reminder', event => {
        this.setState((prevState, props) => ({
          events: [event].concat(prevState.events),
        }))
    })
    timer.addListener('session-reminder', event => {
        this.setState((prevState, props) => ({
          events: [event].concat(prevState.events),
        }))
    })
    timer.addListener('set-reminder', event => {
        this.setState((prevState, props) => ({
          events: [event].concat(prevState.events),
        }))
    })

    setTimeout(() => timer.start(), 2000)
  }
  componentWillUnmount() {}
  render() {
    let sessionElapsed = this.state.sessionElapsed
    let set = this.state.set
    let setElapsed = this.state.setElapsed
    let phase = this.state.phase
    let phaseElapsed = this.state.phaseElapsed
    let state = this.state.state
    let events = this.state.events.slice(0, 10).map((event, index) => {
      return <View key={index}><Text style={styles.metadata}>{event.data.attributes.name}</Text></View>
    })
    return (
      <View style={styles.container}>
        <Text style={styles.header}>React Native Timer</Text>
        <View>
            <Text style={styles.title}>Session</Text>
            <Text style={styles.metadata}>{sessionElapsed} seconds</Text>
        </View>
        <View>
            <Text style={styles.title}>Set</Text>
            <Text style={styles.metadata}>Index {set}</Text>
            <Text style={styles.metadata}>{setElapsed} seconds</Text>
        </View>
        <View>
            <Text style={styles.title}>Phase</Text>
            <Text style={styles.metadata}>Index {phase}</Text>
            <Text style={styles.metadata}>{phaseElapsed} seconds</Text>
        </View>
        <View>
            <Text style={styles.title}>State</Text>
            <Text style={styles.metadata}>{state}</Text>
        </View>
        <Text style={styles.title}>Events</Text>
        <View>{events}</View>
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
  title: {
      margin: 5,
      fontSize: 14,
      fontWeight: "bold",
      textAlign: 'center',
      color: "black"
  },
  metadata: {
      fontSize: 12,
      fontWeight: "bold",
      textAlign: 'center',
  },
  event: {
      fontSize: 10,
      fontWeight: "bold",
      textAlign: 'center',
  },
});

AppRegistry.registerComponent('ReactNativeTimer', () => ReactNativeTimer);
