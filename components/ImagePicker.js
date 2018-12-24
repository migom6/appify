import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ImagePicker } from "expo";

export default class ImagePickerExample extends React.Component {
  state = {
    image: null
  };

  render() {
    return (
      <TouchableOpacity style={styles.buttonStyle} onPress={this._pickImage}>
        <Text style={styles.textStyle}>PICK AN IMAGE FROM CAMERA ROLL</Text>
      </TouchableOpacity>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      base64: true,
      quality: 0.7
    });

    this.props.getResult(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center"
  },

  buttonStyle: {
    padding: 10,
    backgroundColor: "#202646",
    borderRadius: 10
  }
});
