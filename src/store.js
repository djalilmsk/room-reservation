import { configureStore } from "@reduxjs/toolkit";
import formCache from "@/utils/redux/form-cache";
import user from "@/utils/redux/user";

export const store = configureStore({
  reducer: {
    formCache: formCache,
    user: user,
  },
});
