import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"

const UserDetails = ({ user }: any) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.image }} style={styles.userImage} />

      <Text style={styles.name}>
        {user.firstName} {user.lastName} {user.maidenName && `(${user.maidenName})`}
      </Text>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Contact Information</Text>
        <Text style={styles.infoText}>Email: {user.email}</Text>
        <Text style={styles.infoText}>Phone: {user.phone}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Address</Text>
        <Text style={styles.infoText}>
          {user.address.address}, {user.address.city}, {user.address.state}{" "}
          {user.address.postalCode}
        </Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Personal Details</Text>
        <Text style={styles.infoText}>Age: {user.age}</Text>
        <Text style={styles.infoText}>Gender: {user.gender}</Text>
        <Text style={styles.infoText}>Blood Group: {user.bloodGroup}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Company Information</Text>
        <Text style={styles.infoText}>Company: {user.company.name}</Text>
        <Text style={styles.infoText}>Position: {user.company.title}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Bank Information</Text>
        <Text style={styles.infoText}>Card Type: {user.bank.cardType}</Text>
        <Text style={styles.infoText}>Currency: {user.bank.currency}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  infoSection: {
    marginVertical: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
  },
})

export default UserDetails
