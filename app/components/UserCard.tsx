import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import Fontisto from "react-native-vector-icons/Fontisto"
import FontAwesome from "react-native-vector-icons/FontAwesome"

const UserCard = ({ user }: any) => {
  console.log(JSON.stringify(user) + "lkjhgfdsa")
  return (
    <View style={styles.cardContainer}>
      {/* User's Main Info */}
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: user.image }} style={styles.userImage} />
        </View>
        <View style={{ height: 50 }}>
          <Text style={styles.userName}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.subText}>{user.company.title}</Text>
        </View>
      </View>

      {/* Category Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Icon name="location-pin" size={16} color="#FFF" style={{ marginRight: 5 }} />
          <Text style={styles.buttonText}>{user.address.city}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Fontisto name="blood-drop" size={14} color="#FFF" style={{ marginRight: 7 }} />
          <Text style={styles.buttonText}>{user.bloodGroup}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FontAwesome name="birthday-cake" size={14} color="#FFF" style={{ marginRight: 7 }} />
          <Text style={styles.buttonText}>{user.birthDate}</Text>
        </TouchableOpacity>
      </View>

      {/* Detail Cards */}
      <View style={styles.detailContainer}>
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Email</Text>
          <Text style={styles.detailValue}>{user.email}</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Phone</Text>
          <Text style={styles.detailValue}>{user.phone}</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Company</Text>
          <Text style={styles.detailValuenormal}>{user.company?.name}</Text>
        </View>
      </View>
    </View>
  )
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    margin: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    // Responsive width: Full width on mobile, fixed width for tablet
    width: width < 768 ? "100%" : width / 3 - 24, // 3 cards in a row on tablets
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  subText: {
    color: "#4CAF50",
    fontSize: 18,
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 16,
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonInactive: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
  buttonTextInactive: {
    color: "#333",
    fontSize: 14,
  },
  detailContainer: {
    marginTop: 20,
  },
  detailCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(241, 241, 241, 0.5)",
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0088cc",
  },
  detailValuenormal: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  userImage: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
})

export default UserCard
