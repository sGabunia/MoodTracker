import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {MoodOptionType} from '../types';
import {theme} from '../theme';

type Props = {
  option: MoodOptionType;
  selectedMood: MoodOptionType | undefined;
  setSelectedMood: (option: MoodOptionType) => void;
};

const MoodItem = ({option, selectedMood, setSelectedMood}: Props) => {
  return (
    <View>
      <Pressable
        onPress={() => setSelectedMood(option)}
        key={option.emoji}
        style={[
          styles.moodItem,
          option.emoji === selectedMood?.emoji && styles.selectedMoodItem,
        ]}>
        <Text style={styles.moodText}>{option.emoji}</Text>
      </Pressable>
      <Text style={styles.description}>
        {selectedMood?.emoji === option.emoji && option.description}
      </Text>
    </View>
  );
};

export default MoodItem;

const styles = StyleSheet.create({
  moodText: {
    fontSize: 24,
  },
  moodItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorWhite,
  },
  description: {
    color: '#454C73',
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
});
