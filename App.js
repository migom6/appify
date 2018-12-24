import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";

import ImagePicker from "./components/ImagePicker";
import Cameraja from "./components/Camera";
import Predict from "./components/Predict";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      camera: false,
      predict: false
    };
  }
  getResult = result => {
    this.setState({ result });
  };
  cameraOn = () => {
    this.setState({ camera: true });
  };
  cameraOff = () => {
    this.setState({ camera: false });
  };
  predictOff = () => {
    this.setState({ predict: false });
  };
  render() {
    if (this.state.predict) {
      return <Predict navback={this.predictOff} result={this.state.result} />;
    }
    if (!this.state.camera) {
      return (
        <View style={styles.container}>
          <View style={{ margin: 8 }}>
            <ImagePicker getResult={this.getResult} />
          </View>
          <View style={{ margin: 8 }}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={this.cameraOn}
            >
              <Text style={styles.textStyle}>CAPTURE WITH CAMERA</Text>
            </TouchableOpacity>
          </View>
          {this.state.result && (
            <>
              <Image
                source={{ uri: this.state.result.uri }}
                style={{ width: 300, height: 225, margin: 14 }}
              />
              <View style={{ margin: 8 }}>
                <TouchableOpacity
                  style={styles.predictTouch}
                  onPress={() => {
                    this.setState({ predict: true });
                  }}
                >
                  <Text style={styles.predictText}>PREDICTION</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      );
    } else {
      return <Cameraja getResult={this.getResult} cameraOff={this.cameraOff} />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  textStyle: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center"
  },

  buttonStyle: {
    padding: 10,
    backgroundColor: "#202646",
    borderRadius: 10
  },
  predictText: {
    fontSize: 20,
    color: "#202646",
    textAlign: "center"
  },
  predictTouch: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#202646"
  }
});
