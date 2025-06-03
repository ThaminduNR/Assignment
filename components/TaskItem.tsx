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
      <TouchableOpacity onPress={onToggleComplete} style={{ flex: 1 }}>
        <Text style={[styles.taskText, item.completed && styles.completed]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  taskContainer: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  taskText: {
    fontSize: 18,
  },

  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  actions: {
    flexDirection: 'row',
    gap: 15,
    marginLeft: 10,
  },
  edit: {
    color: 'blue',
    marginHorizontal: 5,
  },
  delete: {
    color: 'red',
    marginHorizontal: 5,
  },
});
