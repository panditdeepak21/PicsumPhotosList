import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { Component } from "react";
import { getImageList, getImageURL } from "./utils";

import ImageSlider from "react-native-image-slider";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      loading: true,
      ImageListData: [],
    };
  }

  componentDidMount() {
    try {
      getImageList().then((data) => {
        const newdata = data.map(item => ({...item, img_uri: `https://picsum.photos/200/300?image=${item.id}`}))
        this.setState({
          ImageListData: newdata,
          loading: false,
          index: Math.floor(Math.random() * (10 - 0)),
        });
      });
    } catch (e) {
      console.error("error",e);
      this.setState({
        loading: false,
      });
    }
  }

  onChangeImage = (index) => {
    // getImageURL(id,)
    // .then(data =>{
    //     console.log("getImageURL",JSON.stringify(data))
    //     this.setState({ImageURL: data})
    // } )
    this.setState({
      index,
    });
  };

  render() {
    const { ImageListData, index } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.head}>Picsum Photos</Text>
        {ImageListData.length > 0 ? (
          <ImageSlider
            images={ImageListData}
            position={index}
            onPositionChanged={this.onChangeImage}
            customSlide={({ index, item, style, width }) => (
              <View key={index} style={[style, styles.customSlide]}>
                <View style={styles.content2}>
                  <Text style={styles.contentText}>
                    {item.author} {" ("}
                    {index + 1} / {ImageListData.length + 1}
                    {")"}
                  </Text>
                </View>
                <Image
                  source={{ uri: item.img_uri }}
                  style={styles.customImage}
                />
              </View>
            )}
          />
        ) : (
          <View style={styles.container}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  head: {
    marginTop: 35,
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 32,
  },
  content2: {
    width: "100%",
    height: 100,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: { color: "#000", fontSize: 15, fontStyle: "italic" },
  customSlide: {
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  customImage: {
    width: 200,
    height: 300,
  },
});

export default App;
