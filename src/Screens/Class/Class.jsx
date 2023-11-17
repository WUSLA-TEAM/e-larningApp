import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';

const {width, height} = Dimensions.get('window');

const Class = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // add a loading state
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      try {
        const querySnapshot = await firestore().collection('StorageData').get();
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(data);
        setLoading(false); // set loading to false when data is ready
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchDataFromFirestore();
  }, []);

  const onItemPress = item => {
    console.log(`Image Url : ${item.imageUrl}`);
    console.log(`Video Url : ${item.videoUrl}`);
    navigation.navigate('Latest', {
      imageUrl: item.imageUrl,
      name: item.name,
      name: item.name,
      description: item.description,
      videoUrl: item.videoUrl,
      notes: item.notes,
      videoUrl: item.videoUrl,
      notes: item.notes,
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="medium" color="#8352DE" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.list}
              onPress={() => onItemPress(item)}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <View style={styles.content}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
          }

export default Class;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: width * 0.8,
    width: width * 0.8,
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
    fontSize: height * 0.03,
    fontSize: height * 0.03,
    color: '#FFF',
    fontFamily: 'OpenSans-ExtraBold',
    fontFamily: 'OpenSans-ExtraBold',
  },
  description: {
    fontSize: 15,
    fontSize: 15,
    color: '#FFF',
    fontWeight: '400',
    fontFamily: 'OpenSans-Medium',
    fontFamily: 'OpenSans-Medium',
  },
});
