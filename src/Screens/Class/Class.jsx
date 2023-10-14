import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const {width, height} = Dimensions.get('window');

const Class = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStorageData = async () => {
      try {
        const storageDataCollection = firestore().collection('StorageData');
        const snapshot = await storageDataCollection.get();

        const data = snapshot.docs.map(doc => ({
          id: doc.id, // Ensure each item has a unique key
          ...doc.data(),
        }));
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStorageData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id} // Use the 'id' as the key
        renderItem={({item}) => (
          <View style={styles.list}>
            <Image source={{uri: item.imageUrl}} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '100%',
    height: height * 0.17,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.021,
    backgroundColor: '#724EB7',
    marginVertical: height * 0.021,
    borderRadius: width * 0.023,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  content: {
    marginLeft: width * 0.021,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: 'OpenSans-Medium',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '400',
  },
});

export default Class;
