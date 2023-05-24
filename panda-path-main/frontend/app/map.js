import MapView, { Heatmap, LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "./environments";
import Constants from "expo-constants";
import { useEffect, useRef, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import {COLORS, icons, images, SIZES, FONT} from '../constants';
import { ScreenHeaderBtn } from '../components'
import axios from 'axios';
import { Stack } from "expo-router"

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 49.260153,
  longitude: -123.114881,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

// latitude = y-axis (UP/DOWN),  longitude = x-axis (LEFT/RIGHT)
 points = [
  { latitude: 49.287263, longitude: -123.135029, weight: 1 }, // top left
  { latitude: 49.286535, longitude: -123.113644, weight: 1 }, // top right

  { latitude: 49.276485, longitude: -123.131859, weight: 1 }, // bottom left
  { latitude: 49.277269, longitude: -123.112620, weight: 1 }, // bottom right

  { latitude: 49.285022, longitude: -123.131566, weight: 1 }, 
  { latitude: 49.283696, longitude: -123.122548, weight: 1 },
  { latitude: 49.284682, longitude: -123.129572, weight: 1 }, 
  { latitude: 49.276771, longitude: -123.125628, weight: 1 },
  { latitude: 49.286620, longitude: -123.115358, weight: 1 }, 
  { latitude: 49.278858, longitude: -123.115938, weight: 1 },
  { latitude: 49.278860, longitude: -123.117571, weight: 1 }, 
  { latitude: 49.278494, longitude: -123.128293, weight: 1 },
  { latitude: 49.279152, longitude: -123.115926, weight: 1 }, 
  { latitude: 49.280804, longitude: -123.115649, weight: 1 },
  { latitude: 49.282798, longitude: -123.124357, weight: 1 }, 
  { latitude: 49.282698, longitude: -123.123638, weight: 1 },
  { latitude: 49.286923, longitude: -123.126360, weight: 1 }, 
  { latitude: 49.279007, longitude: -123.118996, weight: 1 },
  { latitude: 49.286877, longitude: -123.131338, weight: 1 }, 
  { latitude: 49.279718, longitude: -123.114838, weight: 1 },
  { latitude: 49.281653, longitude: -123.116137, weight: 1 }, 
  { latitude: 49.278573, longitude: -123.121294, weight: 1 },
  { latitude: 49.283729, longitude: -123.128635, weight: 1 },
  { latitude: 49.283638, longitude: -123.125194, weight: 1 },
  { latitude: 49.283389, longitude: -123.117388, weight: 1 },
  { latitude: 49.276883, longitude: -123.131103, weight: 1 },
  { latitude: 49.279951, longitude: -123.127239, weight: 1 },
  { latitude: 49.286376, longitude: -123.133310, weight: 1 },
  { latitude: 49.285725, longitude: -123.123478, weight: 1 },
  { latitude: 49.286091, longitude: -123.129754, weight: 1 },
  { latitude: 49.286532, longitude: -123.127669, weight: 1 },
  { latitude: 49.286803, longitude: -123.128732, weight: 1 },
  { latitude: 49.286985, longitude: -123.132071, weight: 1 },
  { latitude: 49.286527, longitude: -123.131749, weight: 1 },
  { latitude: 49.285888, longitude: -123.130497, weight: 1 },
  { latitude: 49.286334, longitude: -123.129089, weight: 1 },

  //east hastings
  { latitude: 49.281348, longitude: -123.104134, weight: 1 }, //left
  { latitude: 49.281348, longitude: -123.079202, weight: 1 },
  { latitude: 49.281348, longitude: -123.082337, weight: 1 },
  { latitude: 49.281348, longitude: -123.085472, weight: 1 },
  { latitude: 49.281348, longitude: -123.088607, weight: 1 },
  { latitude: 49.281348, longitude: -123.091742, weight: 1 },
  { latitude: 49.281348, longitude: -123.094877, weight: 1 },
  { latitude: 49.281348, longitude: -123.098012, weight: 1 },
  { latitude: 49.281348, longitude: -123.101147, weight: 1 },
  { latitude: 49.281348, longitude: -123.104282, weight: 1 },
  { latitude: 49.281348, longitude: -123.107417, weight: 1 },
  { latitude: 49.281348, longitude: -123.110552, weight: 1 },
  { latitude: 49.281348, longitude: -123.113687, weight: 1 },
  { latitude: 49.281348, longitude: -123.116822, weight: 1 },
  { latitude: 49.281348, longitude: -123.119957, weight: 1 },
  { latitude: 49.281348, longitude: -123.123092, weight: 1 },
  { latitude: 49.281348, longitude: -123.079202, weight: 1 }, //right

  // kits
  { latitude: 49.264511, longitude: -123.151537, weight: 1 },
  { latitude: 49.267875, longitude: -123.154339, weight: 1 },
  { latitude: 49.263537, longitude: -123.163847, weight: 1 },
  { latitude: 49.259168, longitude: -123.154743, weight: 1 },
  { latitude: 49.255358, longitude: -123.162301, weight: 1 },
  { latitude: 49.255694, longitude: -123.145295, weight: 1 },

  //surrey yuuuuutes
  { latitude: 49.194213, longitude: -122.857279, weight: 1 },
  { latitude: 49.196625, longitude: -122.810157, weight: 1 },
  { latitude: 49.188660, longitude: -122.767731, weight: 1 },
  { latitude: 49.179235, longitude: -122.781473, weight: 1 },
  { latitude: 49.178786, longitude: -122.804835, weight: 1 },
  { latitude: 49.174746, longitude: -122.859116, weight: 1 },
  { latitude: 49.163971, longitude: -122.862552, weight: 1 },
  { latitude: 49.174297, longitude: -122.882478, weight: 1 },
  { latitude: 49.176654, longitude: -122.842098, weight: 1 },
  { latitude: 49.201426, longitude: -122.865766, weight: 1 },
  { latitude: 49.189311, longitude: -122.856146, weight: 1 },
  { latitude: 49.187515, longitude: -122.822135, weight: 1 },
  { latitude: 49.191790, longitude: -122.828770, weight: 1 },
];


function InputAutocomplete(props) {
  return (
    <>
      <Text>{props.label}</Text>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder={props.placeholder || ""}
        fetchDetails
        onPress={(data, details = null) => {
          props.onPlaceSelected(details);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: "pt-BR",
          location:'49.281348,-123.151537',
          radius: 300,
        }}
      />
    </>
  );
}

export default function Map() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        setCurrentLocation({ latitude, longitude });
      } catch (error) {
        console.log("Error getting current location", error);
      }
    };

    getCurrentLocation();
  }, []);

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };


  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const traceRouteOnReady = (args) => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
  };

  const onPlaceSelected = (
    details,
    flag
  ) => {
    const set = flag === "origin" ? setOrigin : setDestination;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    set(position);
    moveTo(position);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options = {{ 
          headerStyle: { backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerTitle: "Panda Path",
          headerRight: () => (
            <ScreenHeaderBtn iconUrl = {icons.menu} dimension ="60%" />
          ),
        }}
      />
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={currentLocation || INITIAL_POSITION}
      >
        <Heatmap
            points={this.points}
            radius={100}
            opacity={0.8}
            gradient={{
              colors: ["purple", "red", "orange", "white"],
              startPoints: Platform.OS === 'ios' ? [0.04, 0.1, 0.45, 0.5] :
                [0.25, 0.5, 0.75, 1],
              colorMapSize: 1000
            }}
          >
          </Heatmap>
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
        {showDirections && origin && destination && (
          <MapViewDirections
            origin={origin}
            mode="WALKING"
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeColor={COLORS.darkgreen}
            strokeWidth={4}
            onReady={traceRouteOnReady}
          />
        )}
      </MapView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : height} style={styles.searchContainer}>
      {distance && duration ? (
          <>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Text style={styles.timeLabel}>{Math.ceil(duration)} min</Text>
              <Text style={styles.distLabel}> ({distance.toFixed(2)} km)</Text>
            </View>
            <Text style={styles.subText}>Safest Route</Text>
          </>
        ) : null}
        <InputAutocomplete
          style={styles.label}
          placeholder="Starting point"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "origin");
          }}
        />
        {/* <Text style={{textAlign: "center", fontSize: SIZES.medium, fontFamily: FONT.regular}}>to</Text> */}
        <InputAutocomplete
          style={styles.label}
          placeholder="Destination"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "destination");
          }}
        />
        <TouchableOpacity style={styles.button} onPress={traceRoute}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
       
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 15,
    bottom: 0,
  },
  input: {
    borderColor: COLORS.gray2,
    borderRadius: 10,
    borderWidth: 1,
    fontFamily: FONT.regular,
  },
  button: {
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 10,
    marginTop: 16,
    marginBottom: 50,
    borderRadius: 15,
  },
  buttonText: {
    textAlign: "center",
    color: COLORS.lightWhite,
    fontFamily: FONT.bold,
    fontSize: SIZES.large
  },
  timeLabel: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
  },
  distLabel: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.darkGreen
  },
  subText: {
    fontFamily: FONT.regular,
    color: COLORS.gray
  },
  modeBtn: {
    borderRadius: 50,
    border: "black 1px"
  }
});
