import {StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import {useAppContext} from '../AppProvider';
import {MoodItemRow} from '../components/MoodItemRow';
import {FlatList} from 'react-native-gesture-handler';

import {MoodOptionWithTimestamp} from '../types';

const HistoryScreen = () => {
  const {moodList} = useAppContext();

  const flatListRef = useRef(null);

  const renderMoods = ({item}: {item: MoodOptionWithTimestamp}) => {
    return <MoodItemRow item={item} simultaneousHandlers={flatListRef} />;
  };
  return (
    <View style={styles.moodList}>
      <FlatList
        ref={flatListRef}
        data={moodList}
        renderItem={renderMoods}
        keyExtractor={(item, index) => index.toString()}
        scrollToOverflowEnabled
      />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  moodList: {
    marginVertical: 10,
  },
});
