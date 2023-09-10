import React, {Component} from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

class Class extends Component {
  state = {
    data: [
      {
        id: 1,
        title: 'Image 1',
        description: 'This is the description for image 1.',
        imageUrl: 'https://picsum.photos/200/200',
      },
      {
        id: 2,
        title: 'Image 2',
        description: 'This is the description for image 2.',
        imageUrl: 'https://picsum.photos/200/200',
      },
      {
        id: 3,
        title: 'Image 3',
        description: 'This is the description for image 3.',
        imageUrl: 'https://picsum.photos/200/200',
      },
      {
        id: 4,
        title: 'Image 4',
        description: 'This is the description for image 4.',
        imageUrl: 'https://picsum.photos/200/200',
      },
      {
        id: 5,
        title: 'Image 5',
        description: 'This is the description for image 5.',
        imageUrl: 'https://picsum.photos/200/200',
      },
      {
        id: 6,
        title: 'Image 6',
        description: 'This is the description for image 5.',
        imageUrl: 'https://picsum.photos/200/200',
      },
      {
        id: 7,
        title: 'Image 7',
        description: 'This is the description for image 5.',
        imageUrl: 'https://picsum.photos/200/200',
      },
      {
        id: 8,
        title: 'Image 8',
        description: 'This is the description for image 5.',
        imageUrl: 'https://picsum.photos/200/200',
      },
    ],
  };

  onItemPress = item => {
    // Navigate to the 'Latest' screen with the selected image.
    this.props.navigation.navigate('Latest', {
      imageUrl: item.imageUrl,
      title: item.title,
      description: item.description,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.list}
              onPress={() => this.onItemPress(item)}>
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
  }
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
