import {StyleSheet, FlatList, View} from 'react-native';
import React, {useState, useCallback, useContext} from 'react';
import MoodPicker from '../components/MoodPicker';

import {MoodOptionType, MoodOptionWithTimestamp} from '../types';
import {MoodItemRow} from '../components/MoodItemRow';
import {useAppContext} from '../AppProvider';

const HomeScreen = () => {
  const {handleSelectMode} = useAppContext();

  return (
    <View style={styles.container}>
      <MoodPicker onSelect={handleSelectMode} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
