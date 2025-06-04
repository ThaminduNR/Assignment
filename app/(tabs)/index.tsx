import MainTitle from '@/components/MainTitle';
import TaskItem from '@/components/TaskItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

export interface Task {
  text: string;
  completed: boolean;
}
const HomeScreen = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadTasks();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, []),
  );

  const loadTasks = async () => {
    try {
      const stored = await AsyncStorage.getItem('TASKS');
      if (stored) setTasks(JSON.parse(stored));
    } catch (err) {
      console.error('Failed to load tasks', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (index: number) => {
    Alert.alert('Confirm Delete', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          const updated = tasks.filter((_, i) => i !== index);
          setTasks(updated);
          await AsyncStorage.setItem('TASKS', JSON.stringify(updated));
        },
      },
    ]);
  };

  const handleToggleComplete = async (index: number) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
    await AsyncStorage.setItem('TASKS', JSON.stringify(updated));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.homeSection}>
        <LottieView
          source={require('../../assets/animation/task2.json')}
          autoPlay
          loop
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
          }}
        />
      </View>

      <MainTitle title="Tasks List" />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          style={styles.list}
          data={tasks}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          scrollEnabled={true}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TaskItem
              item={item}
              //@ts-ignore
              onEdit={() =>
                router.push({ pathname: '/tasks', params: { index } })
              }
              onDelete={() => handleDelete(index)}
              onToggleComplete={() => handleToggleComplete(index)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 16,
  },
  list: {
    width: '100%',
    height: 'auto',
  },

  homeSection: {
    width: '100%',
    height: 250,
    backgroundColor: '#f5f6fa',
    padding: 10,
    marginBottom: 20,
    gap: 30,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#54a0ff',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  heroUp: {
    flex: 1,
  },
  heroDown: {
    width: '100%',
    height: 200,

    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default HomeScreen;
