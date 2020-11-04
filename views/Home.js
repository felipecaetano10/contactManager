import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.getContacts(), 1000);
  }

  getContacts() {
    try {
      fetch("http://192.168.0.104:3333")
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            dataSource: responseJson,
          });
        });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    this.componentDidMount;
    let { dataSource } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.photoBtnContainer}>
          <TouchableOpacity
            style={styles.photoBtn}
            onPress={() =>
              this.props.navigation.navigate("Adicione um contato")
            }
          >
            <Ionicons name="md-person-add" size={30}></Ionicons>
          </TouchableOpacity>
        </View>
        <FlatList
          data={dataSource}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemView}>
                <View style={styles.imgContainer}>
                  <Image
                    style={styles.imageStyle}
                    source={{ uri: item.photo }}
                  />
                </View>
                <View style={styles.itemInfo}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("Edite um contato", {
                        id: item.id,
                      })
                    }
                  >
                    <Text style={styles.name}>{item.name}</Text>
                    <Text numberOfLines={1}>{item.phone}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  itemView: {
    flex: 1,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderStyle: "solid",
    borderColor: "#add8e6",
    borderBottomWidth: 1.5,
  },
  imgContainer: {
    flex: 0,
    width: 110,
    height: 110,
  },
  imgContainer: {
    flex: 0,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  itemInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 30,
    color: "#191970",
    textAlign: "left",
  },
  photoBtn: {
    backgroundColor: "skyblue",
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 20,
  },
  photoBtnContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
    maxWidth: 360,
    marginVertical: 10,
    marginBottom: 20,
  }
});
