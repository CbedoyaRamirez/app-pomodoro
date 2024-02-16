import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, DrawerLayoutAndroid, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import { Audio } from 'expo-av'

const colors = ['#F7DC6F', '#A2D9CE', '#D7BDE2'];

export default function App() {

  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1)
      }, 10)
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setIsWorking(prev => !prev);
      setTime(isWorking ? 300 : 1500)
    }

    return () => clearInterval(interval)

  }, [isActive, time])

  const handleStarStop = () => {
    playSound();
    setIsActive(!isActive);
  }

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/Audio/Computer_Mouse_Click.mp3")
    )
    await sound.playAsync();
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors[currentTime] }]}>
      <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: Platform.OS === 'android' && 30 }} >
        <Header setTime={setTime} currentTime={currentTime} setCurrentTime={setCurrentTime} />
        <Timer time={time} />
        <TouchableOpacity onPress={handleStarStop} style={styles.button} >
          <Text style={{ color: "white", fontWeight: "bold" }} >{isActive ? "STOP" : "START"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center"
  }
});
