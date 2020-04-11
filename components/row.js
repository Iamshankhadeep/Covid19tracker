import React, { useState, useEffect } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Row(props) {
  const [states, setStates] = useState(props.states);
  const [districts, setDistricts] = useState(props.districts);
  const [sortedDistricts, setSortedDistricts] = useState(props.districts);

  useEffect(() => {
    setStates(props.states);
  }, [props.states]);

  const listStates = states.map(state => (
    <Text style={styles.welcome} key={state.statecode}>
      State:- {state.state} - {state.active}
    </Text>
  ));
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {listStates}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'green',
  },
});
