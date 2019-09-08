import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

export default class App extends React.Component {
  state = {
    cameraPermission: null,
    type: Camera.Constants.Type.back,
    isCamera: false
  };

  openCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === "granted") {
      this.setState({ cameraPermission: true, isCamera: true });
    } else {
      this.setState({ cameraPermission: false, isCamera: false });
    }
  };

  getSnap = async () => {
    const photo = await this.camera.Permissions.takePictureAsync();
    this.setState({ photo: photo.uri, isCamera: false });
  };

  render() {
    console.log("Render time state", this.state);

    const { cameraPermission, isCamera } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {!isCamera && (
          <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              Welcome to Camera App
            </Text>
            <TouchableOpacity style={styles.button} onPress={this.openCamera}>
              <Text>Open Camera</Text>
            </TouchableOpacity>
          </View>
        )}

        {!!this.state.isCamera && (
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.5,
                  alignSelf: "flex-end",
                  alignItems: "center"
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
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  {" "}
                  Flip{" "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.snap}
                style={{
                  flex: 0.5,
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  Capture
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    padding: 6,
    margin: 10,
    color: "white",
    fontSize: 18,
    alignItems: "center",
    backgroundColor: "#e74c3c",
    borderRadius: 5
  }
});
