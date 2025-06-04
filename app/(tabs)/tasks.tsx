import MainTitle from '@/components/MainTitle';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Task } from './index';
const TabTwoScreen = () => {
  const { index } = useLocalSearchParams<{ index?: string }>();
  const router = useRouter();
  const [task, setTask] = useState('');

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    try {
      if (index !== undefined) {
        const stored = await AsyncStorage.getItem('TASKS');
        if (stored) {
          const parsed: Task[] = JSON.parse(stored);
          setTask(parsed[parseInt(index)].text);
        }
      }
    } catch (err) {
      console.error('Failed to load task', err);
    }
  };

  const saveTask = async () => {
    if (task.trim() === '')
      return Alert.alert('Validation', 'Task cannot be empty');
    try {
      const stored = await AsyncStorage.getItem('TASKS');
      let updated: Task[] = stored ? JSON.parse(stored) : [];

      if (index !== undefined) {
        updated[parseInt(index)] = { text: task, completed: false };
      } else {
        updated.push({ text: task, completed: false });
      }

      await AsyncStorage.setItem('TASKS', JSON.stringify(updated));
      // router.back();
    } catch (err) {
      console.error('Failed to save task', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <MainTitle title={'Add Task'} />
      </View>
      <View style={styles.taskUp}>
        <TextInput
          placeholder="Enter your task"
          value={task}
          onChangeText={setTask}
          multiline={true}
          style={styles.input}
        />
      </View>
      <Text style={styles.taskDownText}>Add your task Here </Text>
      <View style={styles.taskDown}>
        <TouchableOpacity onPress={saveTask} style={styles.button}>
          <AntDesign name="addfile" size={24} color="white" />
          <Text style={styles.btnText}>Save Task</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 40,
  },
  input: {
    width: '100%',
    height: 350,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderColor: '#dfe6e9',
    borderRadius: 10,
    textAlignVertical: 'top',
    fontSize: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#54a0ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  taskUp: {
    flex: 1,
  },
  taskDown: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  taskDownText: {
    fontSize: 18,
    color: '#dfe6e9',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default TabTwoScreen;
