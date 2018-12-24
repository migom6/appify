import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera, Permissions, Constants } from "expo";

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({
        quality: 1,
        base64: true
      });
      await this.props.getResult(photo);
      this.props.cameraOff();
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                backgroundColor: "transparent",
                flex: 1
              }}
            >
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: Constants.statusBarHeight + 4,
                  right: 8
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <Text style={{ fontSize: 18, color: "white" }}> Flip </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: Constants.statusBarHeight + 4,
                  left: 8
                }}
                onPress={() => {
                  this.props.cameraOff();
                }}
              >
                <Text style={{ fontSize: 18, color: "white" }}>back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 28,
                  right: "40%",
                  borderColor: "white",
                  borderWidth: 1,
                  padding: 4
                }}
                onPress={this.snap}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "white"
                  }}
                >
                  Capture
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
