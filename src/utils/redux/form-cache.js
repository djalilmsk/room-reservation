import { createSlice } from "@reduxjs/toolkit";

// Default initial data if Local Storage is empty
const initialData = {};

const getDataFromLocalStorage = () => {
  try {
    // Replace 'yourDataKey' with the key name used in Local Storage
    return JSON.parse(localStorage.getItem("form-cache")) || initialData;
  } catch (err) {
    return initialData;
  }
};

// Initial state for the slice
const initialState = {
  // Replace 'data' with your desired state property name
  data: getDataFromLocalStorage(),
};

const formCache = createSlice({
  // Replace 'yourSliceName' with a descriptive name for your slice
  name: "formCache",
  initialState,
  reducers: {
    // Add your actions here
    setData: (store, action) => {
      const { fieldName, newData } = action.payload;
      store.data[fieldName] = newData;
      localStorage.setItem("form-cache", JSON.stringify(store.data));
    },
    clearData: (store) => {
      store.data = initialData;
      localStorage.removeItem("form-cache");
      localStorage.setItem("form-cache", JSON.stringify(initialData));
    },
  },
});

// Export the actions created by the slice
export const { setData, clearData, updateField } = formCache.actions;

export default formCache.reducer;
