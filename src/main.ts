import { createApp } from "vue";
// import "./taiyou-webui/CSS/main.css";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { useTelegramUserStore } from "./stores/TelegramUser";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount("#app");

// Specific Overrides when Running on Telegram
const telegramStore = useTelegramUserStore();
telegramStore.load_user();
