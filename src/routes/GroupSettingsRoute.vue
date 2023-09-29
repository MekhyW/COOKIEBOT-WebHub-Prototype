<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import PageHeader from "../components/PageHeader.vue";
import { useGroupStore } from "../stores/GroupStore";

//const isLoading = ref(true);
let group_id = "";
let dialogVisible = ref(false);
let dialogMessage = ref("Saving...");
let dialogButtonVisible = ref(false);
const groupStore = useGroupStore();

groupStore.$subscribe((mutation, state) => {
  if (state.settingsLoaded) {
    dialogVisible.value = false;
    dialogButtonVisible.value = false;
  } else {
    showLoadingDialog();
  }
});

onMounted(() => {
  showLoadingDialog();
  groupStore.loadGroupSettings();
});

function showLoadingDialog() {
  dialogVisible.value = true;
  dialogMessage.value = "Loading...";
  dialogVisible.value = true;
  dialogButtonVisible.value = false;
}

async function saveSettings() {
  dialogVisible.value = true;
  dialogMessage.value = "Saving Changes...";
  dialogButtonVisible.value = false;
}
</script>

<template>
  <div class="container">
    <PageHeader></PageHeader>

    <div class="scroll-container">
      <form @submit.prevent="saveSettings">
        <!-- General -->
        <span class="category">General</span>

        <div class="setting-item">
          <label for="language-select">Language</label>
          <select id="language-select" name="language" v-model="groupStore.currentSettings.language">
            <option value="pt">Português</option>
            <option value="en">English</option>
          </select>
        </div>
        <div class="setting-item">
          <input id="furbots" type="checkbox" v-model="groupStore.currentSettings.furbots" />
          <label for="furbots">Furbots</label>
        </div>
        <div class="setting-item">
          <input id="sfw" type="checkbox" v-model="groupStore.currentSettings.sfw" />
          <label for="sfw">SFW</label>
        </div>
        <div class="setting-item">
          <input id="functions-fun" type="checkbox" v-model="groupStore.currentSettings.functionsFun" />
          <label for="functions-fun">Entertainment Functions</label>
        </div>
        <div class="setting-item">
          <input id="functions-utility" type="checkbox" v-model="groupStore.currentSettings.functionsUtility" />
          <label for="functions-utility">Utility Functions</label>
        </div>

        <!-- Moderation -->
        <span class="category">Moderation</span>
        <div class="setting-item">
          <label for="captcha-time">Captcha Time</label>
          <input id="captcha-time" type="number" v-model="groupStore.currentSettings.timeCaptcha" />
        </div>
        <div class="setting-item">
          <label for="max-posts">Max Posts</label>
          <input id="max-posts" type="number" v-model="groupStore.currentSettings.maxPosts" />
        </div>
        <div class="setting-item">
          <label for="sticker-spam-limit">Sticker Spam Limit</label>
          <input type="number" id="sticker-spam-limit" v-model="groupStore.currentSettings.stickerSpamLimit" />
        </div>
        <div class="setting-item">
          <label for="time-without-sending-images">Time without sending images</label>
          <input
            id="time-without-sending-images"
            type="number"
            v-model="groupStore.currentSettings.timeWithoutSendingImages"
          />
        </div>

        <!-- Publisher -->
        <span class="category">Publisher</span>
        <div class="setting-item">
          <input id="publisher-post" type="checkbox" v-model="groupStore.currentSettings.publisherPost" />
          <label for="publisher-post">Receive content from other groups</label>
        </div>
        <div class="setting-item">
          <input id="publisher-ask" type="checkbox" v-model="groupStore.currentSettings.publisherAsk" />
          <label for="publisher-ask">Publish content from this group to others</label>
        </div>

        <button class="tg-button">Save</button>
      </form>
    </div>
    <div class="overlay-dialog" v-if="dialogVisible">
      <div class="overlay-foreground">
        <p>{{ dialogMessage }}</p>
        <button class="tg-button" v-if="dialogButtonVisible" @click="dialogVisible = false">OK</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background: rgba(0, 0, 0, 0.65);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  user-select: none;
}

.overlay-foreground {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: var(--tg-theme-secondary-bg-color);
  padding: 1.5rem;
  border-radius: 8px;
}

.container {
  display: flex;
  flex-direction: column;
}

.scroll-container {
  position: relative;
  flex: 1;
  overflow-y: scroll;
}

span.category {
  text-align: center;
  font-size: 1.5rem;
}

input[type="number"] {
  width: 10ch;
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

form {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;
}
</style>
