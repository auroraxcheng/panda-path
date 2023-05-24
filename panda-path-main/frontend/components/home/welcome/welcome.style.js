import { StyleSheet, Dimensions} from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    color: COLORS.primary,
    marginTop: 0,
    textAlign: 'left',
    paddingHorizontal: 30,
    paddingVertical: 0,
  },

  promptMessage: {
    fontFamily: FONT.bold,
    fontSize: 20,
    textAlign: "left",
    color: COLORS.primary,
  },

  savedPlacesWrapper: {
    marginRight: SIZES.small,
    height: 230,
    width: 320,
    backgroundColor: COLORS.green,
    borderRadius: SIZES.medium,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,

  },

  savedPlacesContainer: {
    height: 350,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 40,
    marginBottom: 5,
    
  },

  savedPlacesText: {
    fontFamily: FONT.bold,
    fontSize: 25,
    color: COLORS.primary,
    marginTop: 10,
    textAlign: 'left',
    paddingTop: 10,
  },

  destinationContainer: {
    height: 100,
    width: 500,
    color: COLORS.gray,
    paddingVertical: 20,
    alignItems: "center",
  },

  mainContainer: {
    height: 600,
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    paddingHorizontal: 20,
    marginTop: 10,
    
  },
  
  mainWrapper: {
    flex: 1,
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
    backgroundColor: COLORS.lightGreen,
    paddingHorizontal: 5,
    marginTop: 10,
    marginBottom: 10,
  },

  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },

  searchBtn: {
    width: "60%",
    length: "90%",
    height: 50,
    backgroundColor: COLORS.darkGreen,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    marginTop: "30%",

    marginLeft: "20%",
    marginRight: "20%",
    marginBottom: "5%",

    alignItems: "center",

  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    
  },

  input: {
    height: 50,
    width: 250,
    textAlign: "center",
    backgroundColor: COLORS.pureWhite,
    marginHorizontal: 20,
    marginVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: 10,
    fontFamily: FONT.regular,
  },

  carouselStyle: {
    height: 300,
    width: 200,
    paddingLeft: 5,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 5,
  },

  carouselImageStyle: {
    width: Dimensions.get('window').width -250, 
    marginLeft: 20,
    height: 150,
    borderRadius: 20,
  },

  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  tab: (activeJobType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
  tabText: (activeJobType, item) => ({
    fontFamily: FONT.medium,
    color: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
});

export default styles;