import {
  Alert,
  FlatList,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let min = 1;
let max = 100;

function GameScreen({ userChoice, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [rounds, setRounds] = useState([initialGuess]);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  useEffect(() => {
    min = 1;
    max = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      max = currentGuess;
    } else {
      min = currentGuess + 1;
    }
    const newRndNum = generateRandomBetween(min, max, currentGuess);
    setCurrentGuess(newRndNum);
    setRounds(prevRounds => [newRndNum, ...prevRounds]);
  }

  const guessRoundsListLength = rounds.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(null, "lower")}>
            <Ionicons name="md-remove" size={24} color={"#fff"} />
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(null, "greater")}>
            <Ionicons name="md-add" size={24} color={"#fff"} />
          </PrimaryButton>
        </View>
      </Card>
    </>
  );

  if (width > 450) {
    content = (
      <>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonsContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(null, "lower")}>
              <Ionicons name="md-remove" size={24} color={"#fff"} />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonsContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(null, "greater")}>
              <Ionicons name="md-add" size={24} color={"#fff"} />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={rounds}
          renderItem={itemData => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={item => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
  },
  buttonsContainerWide: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
