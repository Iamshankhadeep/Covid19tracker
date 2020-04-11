import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl, StyleSheet, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Table from './table';
import Level from './level'
import { formatDistance, format } from 'date-fns';
import Minigraph from './minigraph';
import { Icon } from 'react-native-elements'

import {
  formatDate,
  formatDateAbsolute,
  validateCTS,
} from '../utils/common-functions';

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function Home(props) {
  const [states, setStates] = useState([]);
  const [stateDistrictWiseData, setStateDistrictWiseData] = useState({});
  const [stateTestData, setStateTestData] = useState({});
  const [fetched, setFetched] = useState(false);
  const [graphOption, setGraphOption] = useState(1);
  const [lastUpdated, setLastUpdated] = useState('');
  const [timeseries, setTimeseries] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [timeseriesMode, setTimeseriesMode] = useState(true);
  const [timeseriesLogMode, setTimeseriesLogMode] = useState(false);
  const [regionHighlighted, setRegionHighlighted] = useState(undefined);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      const response = await fetch('https://api.covid19india.org/data.json').then(r => r.json())
      const stateDistrictWiseResponse = await fetch('https://api.covid19india.org/state_district_wise.json').then(r => r.json())
      const updateLogResponse = await fetch('https://api.covid19india.org/updatelog/log.json').then(r => r.json())
      const stateTestResponse = await fetch('https://api.covid19india.org/state_test_data.json').then(r => r.json())

      setStates(response.statewise);
      setTimeseries(validateCTS(response.cases_time_series));
      setLastUpdated(response.statewise[0].lastupdatedtime);
      setStateTestData(stateTestResponse.states_tested_data);
      setStateDistrictWiseData(stateDistrictWiseResponse);
      setActivityLog(updateLogResponse);
      /* setPatients(rawDataResponse.data.raw_data.filter((p) => p.detectedstate));*/
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {fetched && (<Text style={{ color: '#28a745', fontSize: 15, margin: 10 }}>
          {"Last Updated "}
          {
            isNaN(Date.parse(formatDate(lastUpdated)))
              ? ''
              : formatDistance(
                new Date(formatDate(lastUpdated)),
                new Date()
              ) + ' Ago'
          }
          {" At "}
          {
            isNaN(Date.parse(formatDate(lastUpdated)))
              ? ''
              : formatDateAbsolute(lastUpdated)
          }
        </Text>)}
        {states.length > 1 && <Level data={states} />}
        <Minigraph timeseries={timeseries} animate={true} />
        <Table states={states} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
  },
});