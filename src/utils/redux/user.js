import { createSlice } from "@reduxjs/toolkit";

// Default initial data if Local Storage is empty
const initialData = {
  data: undefined,
};

const fakeUser = {
  data: {
    firstName: "djalil",
    lastName: "msk",
    email: "djalil.msk@gmail.com",
    role: "user",
    agreedToTerms: true,
    password: "12345678",
    confirmPassword: "12345678",
    profession: "Student",
    referral_source: "Social Media",
  },
  token: "",
};

const getDataFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || initialData;
  } catch (err) {
    console.error("Failed to parse Local Storage data:", err);
    return initialData;
  }
};

const initialState = getDataFromLocalStorage();

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("Logging in with:", action.payload);
      state.data = action.payload.data;
      localStorage.setItem("user", JSON.stringify(action.payload));
      // localStorage.setItem("user", JSON.stringify(fakeUser));
    },
    logout: (state) => {
      state.data = undefined;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = user.actions;
export default user.reducer;
