import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Import your router

const app = createApp(App);

// Use the router instance
app.use(router);

app.mount("#app");
