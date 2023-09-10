import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

const {width, height} = Dimensions.get('window');

const Profile = () => {
  const [data, setData] = useState([]);

  const getAPIData = async () => {
    const URL = 'https://fakestoreapi.com/products';
    try {
      const response = await fetch(URL);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.imageOfUser}
        />
        <Text style={[styles.UserName, styles.h1Text]}>Name</Text>
      </View>
      <View style={styles.middleSection}>
        {data.length ? (
          <FlatList
            data={data}
            renderItem={({item}) => (
              <TouchableRipple
                style={styles.productItem}
                onPress={() => {
                  Alert.alert('hi');
                }}>
                <Text style={styles.productTitle}>{item.title}</Text>
                {/* Add more data fields here */}
              </TouchableRipple>
            )}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            style={styles.FlatListItem}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h1Text: {
    fontFamily: Platform.OS === 'android' ? 'OpenSans-Bold' : 'SF-Pro',
    fontSize: height * 0.04,
    fontWeight: 'bold',
  },
  pText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: height * 0.017,
    fontWeight: '400',
  },
  topSection: {
    backgroundColor: '#724EB7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.31,
  },
  imageOfUser: {
    backgroundColor: '#FFF',
    borderRadius: width * 0.5,
    width: 100, // Set the width and height according to your design
    height: 100,
  },
  UserName: {
    color: '#FFF',
    marginTop: height * 0.021,
  },
  middleSection: {
    flex: 1,
    backgroundColor: '#fff', // Add background color for the product list
    padding: 20,
    height: height * 0.0021,
  },
  productItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#724EB7',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  FlatListItem: {},
});

export default Profile;
