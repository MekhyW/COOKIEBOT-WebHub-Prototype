import { defineStore } from "pinia";

const useUserStore = defineStore("user_store", () => {
  var user_id: number = -1;
  var user_first_name: string;

  function load_user() {
    if (Telegram.WebApp.initDataUnsafe.user == undefined || Telegram.WebApp.initDataUnsafe.user.id == undefined) {
      throw "Could not load user from Telegram";
    }
    user_id = Telegram.WebApp.initDataUnsafe.user.id;
  }

  return { user_id, load_user };
});
