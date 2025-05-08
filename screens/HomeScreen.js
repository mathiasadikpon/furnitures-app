import { View } from "react-native";
import { Text } from "react-native-elements";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const furnitures = useSelector((state) => state.furnitures.furnituresArray);
console.log(furnitures.length);
console.log(furnitures);
  return (
    <View>
      <Text>Home Screen</Text>
      <Text>Welcome to the Home Screen!</Text>
 
    </View>
  );
};

export default HomeScreen;
