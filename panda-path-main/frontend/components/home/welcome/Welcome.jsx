import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = ({ searchTerm, setSearchTerm, handleClick, user }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time");

  const Carousel = () => {
    const data = [
      { id: 1, image: require('../../../assets/images/School.png') },
      { id: 2, image: require('../../../assets/images/Home.png') },
      { id: 3, image: require('../../../assets/images/Work.png') },
      // Add more images as needed
    ];
  
    const renderItem = ({ item }) => (
      <View style={styles.carouselStyle}>
        <Image source={item.image} style={styles.carouselImageStyle}/>
      </View>
    );
  
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').width}
        decelerationRate="fast"
      />
    );
  };

    const [textInputValue1, setTextInputValue1] = useState('');
  const [textInputValue2, setTextInputValue2] = useState('');

  const handleTextInputChange1 = (text) => {
    setTextInputValue1(text);
  };

  const handleTextInputChange2 = (text) => {
    setTextInputValue2(text);
  };
  


  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeMessage}>Hi {user ? user : "User" }!</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.mainWrapper}>
          <View style={styles.savedPlacesContainer}>
            <View style={styles.savedPlacesWrapper}>
            <Text style={styles.savedPlacesText}>Saved Places</Text>

      
            <Carousel></Carousel>

            </View>
            <Text style={styles.promptMessage}>Where would you like to go today?</Text>

            <View style={styles.destinationContainer}>

            <TextInput style={styles.input}
            onChangeText={handleTextInputChange1}
            value={textInputValue1}
            placeholder="Location"
            />
            
            <TextInput style={styles.input}
            onChangeText={handleTextInputChange2}
            value={textInputValue2}
            placeholder="Destination"
            />

            </View>

            
            
      </View>
      
          <TouchableOpacity style={styles.searchBtn} onPress={
            () => {
              router.push("./map")
            }
          } >
          
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />

        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;