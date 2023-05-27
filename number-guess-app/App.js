import { ImageBackground, StyleSheet, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartGameScreen from "./screens/StartGameScreen";
import background from "./assets//images/background.png";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };
  return (
    <LinearGradient colors={["#3b021f", "#ddb52f"]} style={styles.rootScreen}>
      <ImageBackground
        style={styles.rootScreen}
        source={background}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}>
        <SafeAreaView style={styles.rootScreen}>
          {userNumber ? (
            <GameScreen />
          ) : (
            <StartGameScreen onStartGame={startGameHandler} />
          )}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
