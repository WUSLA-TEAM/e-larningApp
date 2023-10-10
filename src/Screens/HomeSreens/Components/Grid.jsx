import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState} from 'react';

const {width, height} = Dimensions.get('window');

const DATA = [
  {
    id: '1', // Change to a string
    title: 'first Clall',
  },
  {
    id: '2', // Change to a string
    title: 'Second Clall',
  },
  {
    id: '3', // Change to a string
    title: 'Third Clall',
  },
  {
    id: '4', // Change to a string
    title: 'forth Clall',
  },
  // Add more items as needed
];

const keyExtractor = item => item.id.toString(); // Use 'item' instead of 'items' and convert to a string

const renderListItem = ({item}) => {
  console.log(keyExtractor);
  return (
    <View key={item.id.toString()}>
      <TouchableHighlight
        onPress={() => Alert.alert('Wait')}
        style={styles.columTouch}>
        <Text style={styles.textgrid}>{item.title}</Text>
      </TouchableHighlight>
    </View>
  );
};

export const Grid = () => {
  const [numColumns, setNumColumns] = useState(2); // Initial number of columns

  return (
    <View>
      <FlatList
        data={DATA}
        renderItem={renderListItem}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  columTouch: {
    width: width * 0.46, // Adjust the width to create 2 columns
    height: height * 0.18,
    backgroundColor: '#131D35',
    marginLeft: width * 0.02, // Adjust the margin as needed
    marginTop: height * 0.03,
    borderRadius: width * 0.023,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeColumnsButton: {
    marginTop: 10,
    backgroundColor: '#7D59BC',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textgrid: {
    color: '#FFF',
  },
});
