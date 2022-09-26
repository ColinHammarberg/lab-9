import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  ScrollView,
  Button,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import Constants from "expo-constants";

export default function App() {
  let data = [
    {
      title: "BMW",
      location: "Göteborg",
      price: 80500,
      img: require("./pictures/bmw.jpeg"),
    },
    {
      title: "Porsche",
      location: "Stockholm",
      price: 120000,
      img: require("./pictures/porsche-preview.webp"),
    },
    {
      title: "BMW",
      location: "Uppsala",
      price: 100500,
      img: require("./pictures/bmw.jpeg"),
    },
    {
      title: "Porsche",
      location: "Uppsala",
      price: 76000,
      img: require("./pictures/porsche-preview.webp"),
    },
  ];

  console.log("data", data);

  const [clicked, set_clicked] = React.useState(false);
  const [search, set_search] = useState("");

  function SortPrice(x) {
    let filterArray = Array.from(x);
    if (search) {
      filterArray = x.filter((a) => a.title.toLowerCase().includes(search));
    } else return clicked ? x.sort((a, b) => a.price - b.price) : x;
    return filterArray;
  }

  const Ads = (props) => {
    console.log(props.img);
    return (
      <View style={styles.styleSub}>
        <View style={styles.styleSub}>
          <View style={{ marginBottom: "10px" }}>
            <Image
              source={{ uri: `${props.img}` }}
              style={{ width: 200, height: 150 }}
            />
            <Text style={styles.information}>Car Information</Text>
            <Text>{props.title}</Text>
            <Text>{props.location}</Text>
            <Text>{props.price}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Enter keyword"
            selectionColor="black"
            keyboardType="default"
            onChangeText={(text) => set_search(text)}
          />
        </View>

        <View style={styles.view}>
          <FlatList
            data={SortPrice(data)}
            renderItem={({ item }) => (
              <Ads
                title={item.title}
                location={item.location}
                price={item.price}
                img={item.img}
                style={styles.component}
              />
            )}
          />
        </View>
      </ScrollView>
      <View>
        <Button title="Sort By Price" onPress={() => set_clicked(true)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgrey",
    flex: 1,
  },
  inputs: {
    margin: "auto",
  },
  input: {
    height: 40,
    margin: 12,
    width: "600px",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  component: {
    margin: "auto",
  },
  view: {
    margin: "auto",
    marginTop: "20px",
  },
  information: {
    fontSize: "14px",
    fontWeight: "bold",
    marginTop: "10px",
    marginBottom: "10px",
  },
});
