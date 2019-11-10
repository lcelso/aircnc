import React, { useState, useEffect } from "react";
import socketio from "socket.io-client";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  AsyncStorage,
  Alert,
  View,
  TouchableOpacity
} from "react-native";

import SpotList from "../components/SpotLists";
import logo from "../assets/logo.png";

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://your-ip:3333', {
        query: { user_id }
      });
      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
      });
    });
  });

  useEffect(() => {
    AsyncStorage.getItem("techs").then(storagedTechs => {
      const techsArray = storagedTechs.split(",").map(tech => tech.trim());

      setTechs(techsArray);
    });
  }, []);

  async function handleLogout() {
    await AsyncStorage.removeItem('user');
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={styles.logo} source={logo} />
        <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
          <Text style={styles.textButton}>X SAIR</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  },
  buttonLogout: {
    alignSelf: "flex-end",
    textAlignVertical: "top",
    position: "absolute",
    top: 20,
    right: 20,
  },
  textButton: {
    color: "#f05a5b",
    fontWeight: "bold",
    fontSize: 12,
  },
  title: {
    fontSize: 22,
    color: "#444",
    paddingHorizontal: 20,
    marginTop: 30
  }
});

