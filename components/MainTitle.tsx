import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type MainTitleProps = {
  title: string;
};

const MainTitle: React.FC<MainTitleProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default MainTitle;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});
