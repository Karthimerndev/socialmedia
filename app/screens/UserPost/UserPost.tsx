import React, { useEffect } from "react"
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native"
import { observer } from "mobx-react-lite"
import UserPostListStore from "@/stores/UserPostListStore"

const UserPostList = observer(({ route, navigation }: any) => {
  const { userId } = route.params

  const screenWidth = Dimensions.get("window").width
  const numColumns = screenWidth > 600 ? 3 : 1 // 3 columns on larger screens
  const cardSize = screenWidth / numColumns - 20 // Calculate width based on columns

  useEffect(() => {
    UserPostListStore.setUserId(userId)
    UserPostListStore.fetchPosts()
    return () => {
      UserPostListStore.reset()
    }
  }, [userId])

  const loadMorePosts = () => {
    UserPostListStore.loadMorePosts()
  }

  const renderPostItem = ({ item }: any) => (
    <TouchableOpacity
      style={{ marginBottom: 10 }}
      onPress={() => navigation.navigate("PostDetail", { postId: item.id })}
    >
      <View style={[styles.card, { width: cardSize }]}>
        <Text style={styles.postTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.postBody} numberOfLines={3}>
          {item.body}
        </Text>
        <Text style={styles.postTags}>Tags: {item.tags.join(", ")}</Text>
        <View style={styles.reactionContainer}>
          <Text style={styles.postReactions}>
            Likes: {item.reactions.likes} | Dislikes: {item.reactions.dislikes}
          </Text>
          <Text style={styles.postViews}>Views: {item.views}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={UserPostListStore.posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => `${item.id}`}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={UserPostListStore.loadingMore && <ActivityIndicator size="small" />}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
})

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  listContainer: {
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 8, // Increase margin for spacing between cards
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: width < 768 ? "100%" : width / 6 - 24,
  },
  reactionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 8,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  postBody: {
    fontSize: 14,
    marginBottom: 4,
    color: "#555",
  },
  postTags: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  postReactions: {
    fontSize: 12,
    color: "#999",
  },
  postViews: {
    fontSize: 12,
    color: "#999",
  },
})

export default UserPostList
