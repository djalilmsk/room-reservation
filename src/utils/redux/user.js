import { createSlice } from "@reduxjs/toolkit";

// Default initial data if Local Storage is empty
const initialData = {
  data: {
    firstName: "djalil",
    lastName: "msk",
    email: "djalil.msk@gmail.com",
    agreedToTerms: true,
    password: "12345678",
    confirmPassword: "12345678",
    userType: "Student",
    referralSource: "Social Media",
  },
  token: "",
};

const getDataFromLocalStorage = () => {
  try {
    // Replace 'yourDataKey' with the key name used in Local Storage
    return JSON.parse(localStorage.getItem("user")) || initialData;
  } catch (err) {
    console.error("Failed to parse Local Storage data:", err);
    return initialData;
  }
};

// Initial state for the slice
const initialState =
  // Replace 'data' with your desired state property name
  getDataFromLocalStorage();

const user = createSlice({
  // Replace 'yourSliceName' with a descriptive name for your slice
  name: "user",
  initialState,
  reducers: {
    // Add your actions here
    login: (state, action) => {
      state.user.data = action.payload.data;
      state.user.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

// Export the actions created by the slice
export const { login } = user.actions;

export default user.reducer;
