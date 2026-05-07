import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
  myItems: [],
  currentItem: null,
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
  totalItems: 0,
}

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setItems: (state, action) => {
      state.items = action.payload.items
      state.totalPages = action.payload.totalPages
      state.currentPage = action.payload.currentPage
      state.totalItems = action.payload.totalItems
    },
    appendItems: (state, action) => {
      state.items = [...state.items, ...action.payload.items]
      state.totalPages = action.payload.totalPages
      state.currentPage = action.payload.currentPage
      state.totalItems = action.payload.totalItems
    },
    setMyItems: (state, action) => {
      state.myItems = action.payload.items
      state.totalPages = action.payload.totalPages
      state.currentPage = action.payload.currentPage
      state.totalItems = action.payload.totalItems
    },
    setCurrentItem: (state, action) => {
      state.currentItem = action.payload
    },
    addItem: (state, action) => {
      state.myItems = [action.payload, ...state.myItems]
    },
    updateItem: (state, action) => {
      const index = state.myItems.findIndex(item => item._id === action.payload._id)
      if (index !== -1) {
        state.myItems[index] = action.payload
      }
      if (state.currentItem?._id === action.payload._id) {
        state.currentItem = action.payload
      }
    },
    removeItem: (state, action) => {
      state.myItems = state.myItems.filter(item => item._id !== action.payload)
      state.items = state.items.filter(item => item._id !== action.payload)
    },
    updateItemAvailability: (state, action) => {
      const { itemId, availability } = action.payload
      const myItemIndex = state.myItems.findIndex(item => item._id === itemId)
      if (myItemIndex !== -1) {
        state.myItems[myItemIndex].availability = availability
      }
      const itemIndex = state.items.findIndex(item => item._id === itemId)
      if (itemIndex !== -1) {
        state.items[itemIndex].availability = availability
      }
      if (state.currentItem?._id === itemId) {
        state.currentItem.availability = availability
      }
    },
    clearItems: (state) => {
      state.items = []
      state.myItems = []
      state.currentItem = null
      state.totalPages = 0
      state.currentPage = 1
      state.totalItems = 0
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  setLoading,
  setError,
  setItems,
  appendItems,
  setMyItems,
  setCurrentItem,
  addItem,
  updateItem,
  removeItem,
  updateItemAvailability,
  clearItems,
  clearError,
} = itemsSlice.actions

export default itemsSlice.reducer

