import { configureStore } from "@reduxjs/toolkit";
import formCache from "@/utils/redux/form-cache";

export const store = configureStore({
  reducer: {
    formCache: formCache,
  },
});
