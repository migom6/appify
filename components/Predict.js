import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator
} from "react-native";
import { Constants, ImageManipulator } from "expo";
import env from "../env.json";

export default class Predict extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: null,
      error: false,
      loading: false
    };
  }

  async componentDidMount() {
    await this.setState({ loading: true, error: false, class: null });
    let _compressed = await ImageManipulator.manipulateAsync(
      this.props.result.uri,
      [{ resize: { width: 800 } }],
      { base64: true, compress: 0.7 }
    );
    this._apicall(_compressed.base64);
  }

  _apicall = base64 => {
    var url = env.HOST;
    console.log(url);
    var data = { image: base64 };
    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          class: response.results,
          error: false,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          class: null,
          error: true,
          loading: false
        });
      });
  };

  render() {
    if (this.state.error) {
      return (
        <View style={styles.loader}>
          <Text style={styles.error}>Some error occured !!! </Text>

          <TouchableOpacity
            style={{
              padding: 10,
              alignSelf: "stretch",
              backgroundColor: "#BB3523",
              margin: 10,
              borderRadius: 4
            }}
            onPress={() => {
              this.props.navback();
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 18, color: "white" }}>
              go back
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadertitle}>Predicting, please wait ...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Image
          source={{ uri: this.props.result.uri }}
          style={{ width: 300, height: 225, margin: 14 }}
        />
        <Text style={styles.title}>Predicted Class : </Text>
        <Text style={styles.class}>{this.state.class}</Text>
        <TouchableOpacity
          style={{
            padding: 10,
            alignSelf: "stretch",
            backgroundColor: "#202646",
            margin: 10,
            borderRadius: 4
          }}
          onPress={() => {
            this.props.navback();
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 18, color: "white" }}>
            back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight + 30
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#202646",
    textAlign: "center",
    marginTop: 30
  },
  error: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#BB3523",
    textAlign: "center",
    marginBottom: 30
  },
  class: {
    fontSize: 20,
    color: "#202646",
    textAlign: "center"
  },
  loader: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  loadertitle: {
    fontSize: 20,
    color: "#202646",
    textAlign: "center",
    marginTop: 26
  }
});
