import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';


function Level(props) {
  const [data, setData] = useState(props.data);
  const [confirmed, setConfirmed] = useState(0);
  const [active, setActive] = useState(0);
  const [recoveries, setRecoveries] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [deltas, setDeltas] = useState(0);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    const parseData = () => {
      let confirmed = 0;
      let active = 0;
      let recoveries = 0;
      let deaths = 0;
      let deltas = {};
      data.forEach((state, index) => {
        if (index !== 0) {
          confirmed += parseInt(state.confirmed);
          active += parseInt(state.active);
          recoveries += parseInt(state.recovered);
          deaths += parseInt(state.deaths);
        } else {
          deltas = {
            confirmed: parseInt(state.deltaconfirmed),
            deaths: parseInt(state.deltadeaths),
            recovered: parseInt(state.deltarecovered),
          };
        }
      });
      setConfirmed(confirmed);
      setActive(active);
      setRecoveries(recoveries);
      setDeaths(deaths);
      setDeltas(deltas);
    };
    parseData();
  }, [data]);

  return (
    <View style={styles.level}>
      <View style={[styles.firstChild, styles.levelItem]}>
        <Text style={{ color: "#ff073a99" }}>Confirmed</Text>
        <Text style={{ color: "#ff073a99" }}>
          [{
            deltas
              ? deltas.confirmed >= 0
                ? '+' + deltas.confirmed
                : '+0'
              : ''
          }]
        </Text>
        <Text style={[styles.textWeight, { color: "#ff073a" }]}>{confirmed}</Text>
      </View>
      <View style={[styles.firstChild, styles.levelItem]}>
        <Text style={{ color: "#007bff99" }}>Active</Text>
        <Text></Text>
        <Text style={[styles.textWeight, { color: "#007bff" }]}>{active}</Text>
      </View>
      <View style={[styles.firstChild, styles.levelItem]}>
        <Text style={{ color: "#28a74599" }}>Recovered</Text>
        <Text style={{ color: "#28a74599" }}>
          [
            {deltas
            ? deltas.recovered >= 0
              ? '+' + deltas.recovered
              : '+0'
            : ''}
            ]
          </Text>
        <Text style={[styles.textWeight, { color: "#28a745" }]}>{recoveries} </Text>
      </View>
      <View style={[styles.levelItem, styles.lastChild]}>
        <Text style={{ color: "#6c757d99" }}>Deceased</Text>
        <Text style={{ color: "#6c757d99" }}>
          [{deltas ? (deltas.deaths >= 0 ? '+' + deltas.deaths : '+0') : ''}]
        </Text>
        <Text style={[styles.textWeight, { color: "#6c757d" }]}>{deaths} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  level: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  firstChild: {
    marginLeft: 8,
  },
  lastChild: {
    marginRight: 8,
  },
  textWeight: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default Level;