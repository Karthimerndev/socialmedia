import React, { useEffect } from "react"
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  Dimensions,
} from "react-native"
import { observer } from "mobx-react-lite"
import UserListStore from "@/stores/UserListStore"
import UserCard from "@/components/UserCard"

const UserList = observer(({ navigation }: any) => {
  const screenWidth = Dimensions.get("window").width
  const numColumns = screenWidth > 600 ? 3 : 1 // Show 3 columns on larger screens
  const cardSize = screenWidth / numColumns - 20 // Adjust for spacing

  useEffect(() => {
    UserListStore.fetchUsers()
  }, [])

  const renderUserItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("UserPosts", { userId: item.id })
      }}
    >
      <UserCard user={item} />
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={UserListStore.users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={UserListStore.loadMoreUsers}
        onEndReachedThreshold={2}
        ListFooterComponent={UserListStore.loadingMore && <ActivityIndicator size="small" />}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  listContainer: {
    justifyContent: "center",
  },
  cardContainer: {
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  userImage: {
    width: "80%",
    height: "50%",
    borderRadius: 10,
    marginBottom: 10,
  },
  userDetails: {
    alignItems: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 12,
    color: "#666",
  },
  userPhone: {
    fontSize: 12,
    color: "#999",
  },
  userCompany: {
    fontSize: 12,
    color: "#999",
  },
})

export default UserList
