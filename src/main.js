//Style and icons
import "./assets/main.css";
import "@/assets/bootstrap/bootstrap.min.css";
import "@/assets/bootstrap/bootstrap.bundle.min.js";
import "material-icons/iconfont/material-icons.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router"; // <---
import store from "./store";
import VueSweetalert2 from "vue-sweetalert2";


createApp(App).use(router).use(store).use(VueSweetalert2).mount("#app");
