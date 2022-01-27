import React from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import format from 'date-fns/format';
import {MoodOptionWithTimestamp} from '../types';
import {theme} from '../theme';
import {useAppContext} from '../AppProvider';

const {width} = Dimensions.get('screen');

const TRANSLATE_X_THRESHOLD = -width * 0.3;

import Reanimated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {RemoveIcon} from './Icons';

type MoodItemRowProps = {
  item: MoodOptionWithTimestamp;
  simultaneousHandlers: any;
};

export const MoodItemRow = ({item, simultaneousHandlers}: MoodItemRowProps) => {
  const {handleDeleteMood} = useAppContext();

  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(70);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translateX.value = event.translationX;
    },
    onEnd: event => {
      const shouldBedismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBedismissed) {
        translateX.value = withTiming(-width);
        itemHeight.value = withTiming(0);
        opacity.value = withTiming(0, undefined, isFinished => {
          if (isFinished && handleDeleteMood) {
            console.log(item);
            runOnJS(handleDeleteMood)(item);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const reanimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const reanimatedIconWrapperStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0,
    );
    return {opacity};
  });

  const reanimatedContStyle = useAnimatedStyle(() => {
    const height = withTiming(itemHeight.value);
    return {height, opacity: opacity.value};
  });

  return (
    <Reanimated.View style={[styles.container, reanimatedContStyle]}>
      <Reanimated.View style={[styles.iconWrapper, reanimatedIconWrapperStyle]}>
        <RemoveIcon />
      </Reanimated.View>
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={panGesture}>
        <Reanimated.View style={[styles.moodItem, reanimatedStyle]}>
          <View style={styles.iconAndDescription}>
            <Text style={styles.moodValue}>{item.mood.emoji}</Text>
            <Text style={styles.moodDescription}>{item.mood.description}</Text>
          </View>
          <Text style={styles.moodDate}>
            {format(new Date(item.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
          </Text>
          <Pressable
            onPress={() => handleDeleteMood(item)}
            hitSlop={16}
            style={({pressed}) => ({
              opacity: pressed ? 0.6 : 1,
            })}>
            <Text style={styles.deleteTitle}>delete</Text>
          </Pressable>
        </Reanimated.View>
      </PanGestureHandler>
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  moodValue: {
    textAlign: 'center',
    fontSize: 25,
    marginRight: 10,
  },
  moodDate: {
    textAlign: 'center',
    color: theme.colorLavender,
    fontSize: 12,
  },
  moodItem: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodDescription: {
    fontSize: 15,
    color: theme.colorPurple,
    fontWeight: 'bold',
  },
  iconAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteTitle: {
    fontFamily: theme.fontFamilyRegular,
  },
  iconWrapper: {
    position: 'absolute',
    right: 30,
    top: 12,
  },
});
