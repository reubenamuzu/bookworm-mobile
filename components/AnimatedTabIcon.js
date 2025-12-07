import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";

export default function AnimatedTabIcon({ name, focused }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    // Bounce effect
    scale.value = withSpring(focused ? 1.4 : 1, {
      damping: 6,       // lower = more bouncy
      stiffness: 150,   // higher = snappier
      mass: 0.6,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons
        name={name}
        size={26}
        color={focused ? "#FFD700" : "gray"}
      />
    </Animated.View>
  );
}
