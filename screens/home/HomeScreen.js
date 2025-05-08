import { useEffect } from "react";
import { FlatList, View } from "react-native";
import { Card, ListItem, Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { fetchFurnitures } from "../../features/furnitures/furnituresSlice";
import Loading from "../../components/LoadingComponent";
const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFurnitures());
  }, [dispatch]);
  const furnitures = useSelector((state) => state.furnitures);
  console.log("furniture " + furnitures.length);
  const { furnituresArray, isLoading, errMess } = furnitures;

  const homeItem = ({ item }) => {
    return (
      <ListItem>
        <Card containerStyle={{ padding: 0 }}>
          <Card.Image source={{ uri: item.images[0] }}>
            <View style={{ justifyContent: "center", flex: 1 }}>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                {item.title}
              </Text>
            </View>
          </Card.Image>
          <Text
            style={{ margin: 20 }}
          >{`Price: ${item.price}\nRating: ${item.rating} (${item.reviews.length})`}</Text>
        </Card>
      </ListItem>
    );
  };

  if (isLoading) {
    return <Loading />;
  }
  if (errMess) {
    return (
      <View>
        <Text>{errMess}</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Text>Welcome to the Home Screen!</Text>
      <Text>{furnitures.length}</Text>
      <FlatList
        data={furnituresArray}
        renderItem={homeItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default HomeScreen;
