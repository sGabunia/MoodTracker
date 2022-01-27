import React from 'react';
import {StyleSheet, View} from 'react-native';
import {VictoryPie} from 'victory-native';
import {groupBy} from 'lodash';

import {useAppContext} from '../AppProvider';

const AnalyticsScreen = () => {
  const {moodList} = useAppContext();

  const data = Object.entries(groupBy(moodList, 'mood.emoji')).map(
    ([key, value]) => ({
      x: key,
      y: value.length,
    }),
  );
  return (
    <View style={styles.container}>
      <VictoryPie data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});

export default AnalyticsScreen;
