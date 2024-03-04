import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { Configs, GroupSettings, Rules, Welcomes } from "../models/GroupSettings";

export const useGroupStore = defineStore("group_store", () => {
  let settingsLoaded = ref(false);
  let groupName = ref("No group name");
  let currentSettings = ref(new GroupSettings());
  let originalSettings: GroupSettings | null = null;

  function loadGroupSettings() {
    // Load bogus settings
    var newGroupSettings = new GroupSettings();
    currentSettings.value = newGroupSettings;
    currentSettings.value.configs = new Configs();
    currentSettings.value.welcomes = new Welcomes();
    currentSettings.value.rules = new Rules();

    currentSettings.value.configs.furbots = true;
    currentSettings.value.configs.sfw = true;

    currentSettings.value.welcomes.message = "Do caldo da pi";

    settingsLoaded.value = true;
    originalSettings = structuredClone(newGroupSettings);
  }

  // Generated with Bing AI, so probably stolen from someone's github or stack overflow
  function difference(object1: any, object2: any) {
    const result: any = {};
    for (const key in object1) {
      if (!(key in object2)) {
        result[key] = object1[key];
      } else if (typeof object1[key] === "object" && typeof object2[key] === "object") {
        const diff = difference(object1[key], object2[key]);
        if (Object.keys(diff).length > 0) {
          result[key] = diff;
        }
      } else if (object1[key] !== object2[key]) {
        result[key] = object1[key];
      }
    }
    return result;
  }
  
  
  async function saveSettings() {
    if (originalSettings == null) return;

    const differencer = difference(currentSettings.value, originalSettings);

    console.log(differencer);
  }

  return { groupName, settingsLoaded, loadGroupSettings, currentSettings, saveSettings };
});
