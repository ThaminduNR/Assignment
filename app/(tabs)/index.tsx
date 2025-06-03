import MainTitle from '@/components/MainTitle';
import TaskItem from '@/components/TaskItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

export interface Task {
  text: string;
  completed: boolean;
}
export default function HomeScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    //const unsubscribe = router.addListener?.('focus', loadTasks);
    loadTasks();
    //return unsubscribe;
  }, []);

  const loadTasks = async () => {
    try {
      const stored = await AsyncStorage.getItem('TASKS');
      if (stored) setTasks(JSON.parse(stored));
    } catch (err) {
      console.error('Failed to load tasks', err);
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
      <View style={styles.homeSection}></View>
      <MainTitle title="Tasks" />
      <FlatList
        style={{ width: '100%', height: 'auto' }} // Ensure the FlatList takes full width
        data={tasks}
        scrollEnabled={true}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TaskItem
            item={item}
            //@ts-ignore
            onEdit={() => router.push({ pathname: '/task', params: { index } })}
            onDelete={() => handleDelete(index)}
            onToggleComplete={() => handleToggleComplete(index)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },

  homeSection: {
    width: '100%',
    height: 250,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
});
