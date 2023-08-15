import React from 'react';
import {TextInput, View, Button, StyleSheet} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Circle, Svg} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);

const radius = 45;
// Formula for circumference
// C=2×π×r
const circumference = radius * Math.PI * 2;
const duration = 200;

export const ProgressCircle = () => {
  // determines how much of the circle's stroke is visible
  const strokeOffset = useSharedValue(circumference);

  const percentage = useDerivedValue(() => {
    const number = ((circumference - strokeOffset.value) / circumference) * 100;
    return withTiming(number, {duration: duration});
  });

  const strokeColor = useDerivedValue(() => {
    return interpolateColor(
      percentage.value,
      [0, 50, 100],
      ['#6FCB4F', '#76C865', '#4CA22F'],
    );
  });

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffset.value, {
        duration: duration,
      }),
      stroke: strokeColor.value,
    };
  });

  //   TODO: fix initial text
  const animatedTextProps = useAnimatedProps(() => {
    const initialText =
      percentage.value === 0 ? '0%' : `${Math.round(percentage.value)} %`;

    return {
      text: initialText,
    };
  });

  const handlePress = () => {
    if (percentage.value >= 100) {
      return;
    } // Add this condition to prevent further progress

    let targetValue = ((100 - (percentage.value + 10)) / 100) * circumference;

    strokeOffset.value = withTiming(targetValue, {duration: duration / 10});
  };

  const resetProgress = () => {
    strokeOffset.value = withTiming(circumference, {duration: duration * 2});
  };

  const slices = Array(10)
    .fill(0)
    .map((_, index) => (
      <Circle
        key={index}
        cx="50"
        cy="50"
        r="45"
        stroke="#E7E7E7"
        strokeWidth="10"
        fill="transparent"
      />
    ));

  return (
    <View style={styles.container}>
      <AnimatedText
        style={styles.textStyle}
        // @ts-ignore
        animatedProps={animatedTextProps}
      />

      <Svg height="50%" width="50%" viewBox="0 0 100 100">
        {slices}
        <AnimatedCircle
          animatedProps={animatedCircleProps}
          cx="50"
          cy="50"
          r="45"
          strokeDasharray={`${circumference}`}
          strokeWidth="10"
          fill="transparent"
          strokeLinecap="round"
        />
      </Svg>

      <Button title="Update Progress" color={'black'} onPress={handlePress} />

      <Button title="reset Progress" color={'black'} onPress={resetProgress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    paddingBottom: 50,
  },
});
