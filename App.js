import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  ScrollView,
  Image,
  Slider
} from 'react-native';

const deviceHeght = Dimensions.get('window').height;

export default class Pes extends Component {
  constructor(props) {
    super(props);
    this.animation = new Animated.ValueXY({ x: 0, y: deviceHeght - 90 });
    this.state = {
      offset: 0
    };
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.animation.extractOffset();
      },
      onPanResponderMove: (evt, gestureState) => {
        this.animation.setValue({ x: 0, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.setState({
          offset: gestureState.moveY
        });
        if (gestureState.moveY > deviceHeght * 0.8) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 1
          }).start();
        }
        if (gestureState.moveY < deviceHeght * 0.2) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 1
          }).start();
        }
        if (gestureState.dy < 0) {
          Animated.spring(this.animation.y, {
            toValue: -deviceHeght + deviceHeght * 0.2,
            tension: 1
          }).start();
        }

        if (gestureState.dy > 0) {
          Animated.spring(this.animation.y, {
            toValue: deviceHeght - 120,
            tension: 1
          }).start();
        }
      }
    });
  }

  render() {
    const animatedHeight = {
      transform: this.animation.getTranslateTransform()
    };
    const containerBackgroundColor = this.animation.y.interpolate({
      inputRange: [0, deviceHeght * 0.7],
      outputRange: ['rgba(0,0,0,0.8)', 'orange'],
      extrapolate: 'clamp'
    });
    return (
      <Animated.View
        style={{ flex: 1, backgroundColor: containerBackgroundColor }}
      >
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            animatedHeight,
            {
              position: 'absolute',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              height: deviceHeght
            }
          ]}
        >
          <Animated.View
            style={{
              borderTopColor: 'gray',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Animated.Text
              style={{
                fontSize: 18,
                paddingLeft: 10
              }}
            >
              Chạy ngay đi
            </Animated.Text>F
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
