import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Dimensions,
  Alert,
} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');

const DATA = [
  {
    id: 1,
    title: 'first Clall',
  },
  {
    id: 2,
    title: 'Second Clall',
  },
  {
    id: 3, // Change the id to be unique
    title: 'Third Clall',
  },
];

const keyExtractor = item => item.id; // Use 'item' instead of 'items'

const renderListItem = ({item}) => {
  // Change 'rnederItem' to 'renderListItem'
  return (
    <View>
      <TouchableHighlight
        onPress={() => Alert.alert('Wait')}
        style={styles.columTouch}>
        <Text key={item.id}>{item.title}</Text>
        {/* Use 'item' instead of 'items' */}
      </TouchableHighlight>
    </View>
  );
};

export const Grid = () => {
  return (
    <View>
      <FlatList
        data={DATA}
        renderItem={renderListItem}
        keyExtractor={keyExtractor}
        numColumns={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  columTouch: {
    width: width * 0.06,
    height: height * 0.021,
    backgroundColor: '#242424',
  },
});
