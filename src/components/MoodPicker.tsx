import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import MoodItem from './MoodItem';
import {MoodOptionType} from '../types';
import {theme} from '../theme';

import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

const moodOptions: MoodOptionType[] = [
  {emoji: '🧑‍💻', description: 'studious'},
  {emoji: '🤔', description: 'pensive'},
  {emoji: '😊', description: 'happy'},
  {emoji: '🥳', description: 'celebratory'},
  {emoji: '😤', description: 'frustrated'},
];

type Props = {
  onSelect: (mood: MoodOptionType) => void;
};

const MoodPicker = ({onSelect}: Props) => {
  const [selectedMood, setSelectedMood] = useState<
    MoodOptionType | undefined
  >();

  const [hasSelected, setHasSelected] = useState(false);

  const handleSelect = () => {
    if (selectedMood) {
      onSelect(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
    }
  };

  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: selectedMood ? withTiming(1) : withTiming(0.5),
      transform: [{scale: selectedMood ? withTiming(1) : 0.9}],
    }),
    [selectedMood],
  );

  if (hasSelected) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../src/assets/4713775.png')}
          style={styles.image}
        />
        <Pressable
          style={styles.chooseButton}
          onPress={() => setHasSelected(false)}>
          <Text style={styles.buttonTitle}>Choose another</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you right now?</Text>
      <View style={styles.moodList}>
        {moodOptions.map(option => (
          <MoodItem
            key={option.description}
            option={option}
            selectedMood={selectedMood}
            setSelectedMood={(option: MoodOptionType) =>
              setSelectedMood(option)
            }
          />
        ))}
      </View>
      <ReanimatedPressable
        onPress={handleSelect}
        style={[styles.chooseButton, buttonStyle]}>
        <Text style={styles.buttonTitle}>Choose</Text>
      </ReanimatedPressable>
    </View>
  );
};

export default MoodPicker;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    marginHorizontal: 15,
    borderWidth: 2,
    borderRadius: 5,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  chooseButton: {
    alignSelf: 'center',
    backgroundColor: theme.colorPurple,
    borderRadius: 20,
    paddingHorizontal: 45,
    paddingVertical: 10,
  },
  buttonTitle: {
    color: theme.colorWhite,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  image: {
    alignSelf: 'center',
    height: 100,
    aspectRatio: 2,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});
