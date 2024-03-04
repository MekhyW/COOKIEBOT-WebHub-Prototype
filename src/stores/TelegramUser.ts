import { defineStore } from "pinia";
import { ref } from "vue";

export const useTelegramUserStore = defineStore("telegram_user_store", () => {
  var user_id = ref(-1);
  var user_display_name = ref("");
  var init_data = ref("");
  var hash = ref("");
  var example_data = ref(true);

  function load_user() {
    example_data.value = Telegram.WebApp.initData == "";

    if (example_data.value) {
      user_id.value = 1234567890;
      user_display_name.value = "Example User";
      init_data.value = "test_data";
      hash.value = "1234567890abcdefgihjklmopqrstuvwxyz";

      return;
    }
    console.log(Telegram.WebApp);

    if (
      Telegram.WebApp.initDataUnsafe.user == undefined ||
      Telegram.WebApp.initDataUnsafe.user.id == undefined ||
      Telegram.WebApp.initDataUnsafe.user.first_name == undefined ||
      Telegram.WebApp.initDataUnsafe.user.last_name == undefined ||
      Telegram.WebApp.initDataUnsafe.hash == undefined
    ) {
      throw "Could not load user from Telegram";
    }

    user_id.value = Telegram.WebApp.initDataUnsafe.user.id;
    user_display_name.value = `${Telegram.WebApp.initDataUnsafe.user.first_name} ${Telegram.WebApp.initDataUnsafe.user.last_name}`;
    init_data.value = Telegram.WebApp.initData;
    hash.value = Telegram.WebApp.initDataUnsafe.hash;

    Telegram.WebApp.expand();
  }

  return { user_id, user_display_name, load_user };
});
