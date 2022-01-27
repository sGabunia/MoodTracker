import React, {useState, useEffect, useCallback, createContext} from 'react';

import {MoodOptionWithTimestamp, MoodOptionType} from './types';

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectMode: (mood: MoodOptionType) => void;
  handleDeleteMood: (mood: MoodOptionWithTimestamp) => void;
};

type AppData = {
  moods: MoodOptionWithTimestamp[];
};

const AppContext = createContext<AppContextType>({
  moodList: [],
  handleSelectMode: () => {},
  handleDeleteMood: () => {},
});

import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = 'my-app-data';

const getAppData = async (): Promise<AppData | null> => {
  try {
    const data = await AsyncStorage.getItem(storageKey);

    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch {
    return null;
  }
};

const setAppData = async (newData: AppData) => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
  } catch {}
};

const AppProvider = ({children}: any) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  useState(() => {
    const getDataFromStorage = async () => {
      const data = await getAppData();

      if (data) {
        setMoodList(data.moods);
      }
    };

    getDataFromStorage();
  });

  const handleSelectMode = useCallback((mood: MoodOptionType) => {
    setMoodList(prev => {
      const newValue = [{mood, timestamp: Date.now()}, ...prev];
      setAppData({moods: newValue});
      return newValue;
    });
  }, []);

  const handleDeleteMood = useCallback((mood: MoodOptionWithTimestamp) => {
    setMoodList(prev => {
      const newValue = prev.filter(item => item.timestamp !== mood.timestamp);
      setAppData({moods: newValue});
      return newValue;
    });
  }, []);

  return (
    <AppContext.Provider value={{moodList, handleSelectMode, handleDeleteMood}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);

export default AppProvider;
