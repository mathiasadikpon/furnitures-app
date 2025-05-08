import Loading from "../../components/LoadingComponent";

const HomeItem =  ({item, isLoading, errMess}) => {
      
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
    if (item) {
      return (
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
          <Text style={{ margin: 20 }}>{`Price: ${item.price}\nRating: ${item.rating} (${item.reviews.length})`}</Text>
          
        </Card>
      );
    }
    return <View />;
  };