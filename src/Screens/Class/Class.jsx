import React, {useEffect, useState} from 'react';
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

const {width, height} = Dimensions.get('window');

const Class = () => {
  const [data, setData] = useState([]);
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
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchDataFromFirestore();
  }, []);

  const onItemPress = item => {
    console.log(item.videoUrl);
    navigation.navigate('Latest', {
      imageUrl: item.imageUrl,
      title: item.title,
      description: item.description,
      videoUri: item.videoUrl,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.list}
            onPress={() => onItemPress(item)}>
            <Image source={{uri: item.imageUrl}} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Class;

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
