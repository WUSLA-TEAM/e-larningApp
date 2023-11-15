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
<<<<<<< HEAD
=======
import {ActivityIndicator} from 'react-native-paper';
>>>>>>> check

const {width, height} = Dimensions.get('window');

const Class = () => {
  const [data, setData] = useState([]);
<<<<<<< HEAD
=======
  const [loading, setLoading] = useState(true); // add a loading state
>>>>>>> check
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
<<<<<<< HEAD
=======
        setLoading(false); // set loading to false when data is ready
>>>>>>> check
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchDataFromFirestore();
  }, []);

  const onItemPress = item => {
<<<<<<< HEAD
=======
    console.log(`Image Url : ${item.imageUrl}`);
    console.log(`Video Url : ${item.videoUrl}`);
>>>>>>> check
    navigation.navigate('Latest', {
      imageUrl: item.imageUrl,
      name: item.name,
      description: item.description,
      videoUrl: item.videoUrl,
      notes: item.notes,
    });
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
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
=======
      {loading ? ( // show a loading indicator if loading is true
        <ActivityIndicator size="medium" color="#8352DE" />
      ) : (
        // render the FlatList component if loading is false
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.list}
              onPress={() => onItemPress(item)}>
              <Image source={{uri: item.imageUrl}} style={styles.image} />
              <View style={styles.content}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
>>>>>>> check
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
    color: '#FFF',
    fontFamily: 'OpenSans-ExtraBold',
  },
  description: {
    fontSize: 15,
    color: '#FFF',
    fontWeight: '400',
    fontFamily: 'OpenSans-Medium',
  },
});
