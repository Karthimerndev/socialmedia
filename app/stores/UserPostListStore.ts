import { types, flow } from "mobx-state-tree"
import axios from "axios"

// Define the Post model
const Post = types.model("Post", {
  id: types.identifierNumber,
  title: types.string,
  body: types.string,
  tags: types.array(types.string),
  reactions: types.model({
    likes: types.number,
    dislikes: types.number,
  }),
  views: types.number,
  userId: types.number,
})

// Define the PostStore
const PostStore = types
  .model("PostStore", {
    posts: types.array(Post),
    loading: types.optional(types.boolean, false),
    loadingMore: types.optional(types.boolean, false),
    page: types.optional(types.number, 0),
    totalPosts: types.maybe(types.number),
    userId: types.maybe(types.number), // Track the current user ID
  })
  .actions((self) => ({
    setUserId(userId: number) {
      self.userId = userId // Set the user ID for fetching posts
    },
    reset() {
      self.posts = []
      self.page = 0 // Set the user ID for fetching posts
      self.totalPosts = 0
    },
    // Fetch posts using a flow for async actions
    fetchPosts: flow(function* () {
      if (self.loadingMore || (self.totalPosts && self.posts.length >= self.totalPosts)) return

      self.loadingMore = true
      try {
        const response = yield axios.get(
          `https://dummyjson.com/posts?userId=${self.userId}&skip=${self.page}&limit=10`,
        )
        self.posts.push(...response.data.posts)
        self.totalPosts = response.data.total
      } catch (error) {
        console.error(error)
      } finally {
        self.loadingMore = false
      }
    }),
    loadMorePosts() {
      if (!self.loadingMore && (!self.totalPosts || self.posts.length < self.totalPosts)) {
        self.page += 10
        self.fetchPosts()
      }
    },
  }))

// Create an instance of PostStore
const postStoreInstance = PostStore.create({
  posts: [],
  loading: false,
  loadingMore: false,
  page: 0,
  totalPosts: 0,
  userId: 0,
})

export default postStoreInstance
export type PostStoreType = typeof PostStore
