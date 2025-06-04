import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Task {
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  item: Task;
  onEdit: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  item,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  return (
    <View style={styles.taskContainer}>
      <View style={styles.radioContainer}>
        <TouchableOpacity onPress={onToggleComplete}>
          <MaterialIcons
            name={item.completed ? 'check-circle' : 'check-circle-outline'}
            size={30}
            color={item.completed ? 'green' : 'gray'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onToggleComplete}
          style={{ width: '100%', height: 'auto' }}
        >
          <Text style={[styles.taskText, item.completed && styles.completed]}>
            {item.text}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.acrionBtn}>
          <AntDesign name="edit" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.acrionBtn}>
          <AntDesign name="delete" size={15} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android drop shadow
  },
  taskText: {
    fontSize: 18,
    textAlign: 'left',
  },

  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  actions: {
    width: '100%',
    height: 30,
    flex: 1,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  edit: {
    color: 'blue',
    marginHorizontal: 5,
  },
  delete: {
    color: 'red',
    marginHorizontal: 5,
  },
  acrionBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,

    marginLeft: 15,
  },
});
