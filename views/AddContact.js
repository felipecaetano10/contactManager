import React from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default class AddContact extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/1200px-Google_Contacts_icon.svg.png",
    };
  }

  photoFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      this.updateValue(data.uri, "photo");
    } else {
      Alert.alert(
        "Sem permissão",
        "É necessário permissão da camera do dispositivo para utilizar esta funcionalidade"
      );
    }
  };

  photoFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      this.updateValue(data.uri, "photo");
    } else {
      Alert.alert(
        "Sem permissão",
        "É necessário permissão da camera do dispositivo para utilizar esta funcionalidade"
      );
    }
  };

  updateValue(text, field) {
    this.setState({ [field]: text });
  }

  async register() {
    let collection = {};
    (collection.name = this.state.name),
      (collection.email = this.state.email),
      (collection.phone = this.state.phone),
      (collection.photo = this.state.photo);

    try {
      await fetch("http://192.168.0.104:3333", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(collection),
      });
      this.props.navigation.navigate("Lista de contatos");
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Nome"
          style={styles.inputs}
          onChangeText={(text) => this.updateValue(text, "name")}
        />
        <TextInput
          placeholder="Email"
          style={styles.inputs}
          onChangeText={(text) => this.updateValue(text, "email")}
        />
        <TextInput
          placeholder="Telefone"
          style={styles.inputs}
          onChangeText={(text) => this.updateValue(text, "phone")}
        />
        <View style={styles.photoBtnContainer}>
          <TouchableOpacity
            style={styles.photoBtn}
            title="galeria"
            onPress={() => this.photoFromGallery()}
          >
            <Ionicons name="md-images" size={32}></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.photoBtn}
            title="camera"
            onPress={() => this.photoFromCamera()}
          >
            <Ionicons name="md-camera" size={32}></Ionicons>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => this.register()}>
          <Text>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    margin: 20,
    marginTop: 70,
  },
  btn: {
    backgroundColor: "skyblue",
    height: 40,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  inputs: {
    borderWidth: 2,
    borderColor: "skyblue",
    margin: 20,
  },
  photoBtnContainer: {
    alignSelf: "center",
    flexDirection: "row",
    maxWidth: 360,
    marginBottom: 20
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
});
