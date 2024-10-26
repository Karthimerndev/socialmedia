import { types, flow } from "mobx-state-tree"
import axios from "axios"

// Define the User model
const User = types.model("User", {
  id: types.identifierNumber,
  firstName: types.string,
  lastName: types.string,
  email: types.string,
  phone: types.string,
  image: types.string,
  bloodGroup: types.string,
  birthDate: types.string,
  company: types.maybe(
    types.model({
      name: types.string,
      title: types.string,
    }),
  ),
  address: types.maybe(
    types.model({
      address: types.string,
      city: types.string,
      state: types.string,
    }),
  ),
})

// Define the UserStore
const UserStore = types
  .model("UserStore", {
    users: types.array(User),
    loading: types.optional(types.boolean, false),
    loadingMore: types.optional(types.boolean, false),
    page: types.optional(types.number, 0),
    totalUsers: types.maybe(types.number),
  })
  .actions((self) => ({
    // Fetch users using a flow for async actions
    fetchUsers: flow(function* () {
      if (self.loadingMore || (self.totalUsers && self.users.length >= self.totalUsers)) return

      self.loadingMore = true
      try {
        const response = yield axios.get(`https://dummyjson.com/users?skip=${self.page}&limit=10`)
        self.users.push(...response.data.users)
        self.totalUsers = response.data.total
      } catch (error) {
        console.error(error)
      } finally {
        self.loadingMore = false
      }
    }),
    loadMoreUsers() {
      if (!self.loadingMore && (!self.totalUsers || self.users.length < self.totalUsers)) {
        self.page += 10
        self.fetchUsers()
      }
    },
  }))

// Create an instance of UserStore
const userStoreInstance = UserStore.create({
  users: [],
  loading: false,
  loadingMore: false,
  page: 0,
  totalUsers: 0,
})

export default userStoreInstance
export type UserStoreType = typeof UserStore
