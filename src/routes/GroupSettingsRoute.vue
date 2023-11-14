<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import PageHeader from "../components/PageHeader.vue";
import { useGroupStore } from "../stores/GroupStore";
import CategoryToggler from "../components/CategoryToggler.vue";

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
  await groupStore.saveSettings();

  dialogButtonVisible.value = true;
}
</script>

<template>
  <div class="container">
    <PageHeader></PageHeader>

    <form @submit.prevent="saveSettings" class="scroll-container">
      <div class="form-scroll-container">
        <!-- General -->
        <CategoryToggler title="General">
          <div class="setting-item">
            <label for="language-select">Language</label>
            <select id="language-select" name="language" v-model="groupStore.currentSettings.language">
              <option value="pt">Português</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div class="setting-item-horizontal">
            <label for="welcome-message">Welcome Message</label>
            <textarea
              v-model="groupStore.currentSettings.welcomeMessage"
              maxlength="4096"
              id="welcome-message"
              placeholder="Welcome to my awesome group"
            ></textarea>
          </div>
          <div class="setting-item-horizontal">
            <label for="rules-message">Rules</label>
            <textarea
              v-model="groupStore.currentSettings.rulesMessage"
              maxlength="4096"
              id="rules-message"
              placeholder="No cogs allowed, toons only area"
            ></textarea>
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
        </CategoryToggler>

        <!-- Moderation -->
        <CategoryToggler title="Moderation">
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
        </CategoryToggler>

        <!-- Publisher -->
        <CategoryToggler title="Publisher">
          <div class="setting-item">
            <input id="publisher-post" type="checkbox" v-model="groupStore.currentSettings.publisherPost" />
            <label for="publisher-post">Receive content from other groups</label>
          </div>
          <div class="setting-item">
            <input id="publisher-ask" type="checkbox" v-model="groupStore.currentSettings.publisherAsk" />
            <label for="publisher-ask">Publish content from this group to others</label>
          </div>
        </CategoryToggler>
      </div>

      <div class="action-buttons">
        <button class="button flex-1">Save Changes</button>
      </div>
    </form>

    <div class="overlay-dialog" v-if="dialogVisible">
      <div class="overlay-foreground">
        <p>{{ dialogMessage }}</p>
        <button class="button" v-if="dialogButtonVisible" @click="dialogVisible = false">OK</button>
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
  background: rgba(0, 0, 0, 0.7);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  user-select: none;
  z-index: 1;
}

.overlay-foreground {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: var(--foreground-level1);
  padding: 1.5rem;
  border-radius: 12px;
}

.container {
  display: flex;
  flex-direction: column;
}

.scroll-container {
  position: relative;
  flex: 1;
  overflow-y: hidden;
}

.form-scroll-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem;
  flex: 1;
  overflow-y: scroll;
}

span.category {
  text-align: center;
  font-size: 1.5rem;
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.setting-item-horizontal {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
}

.form-cierra {
  display: flex;
  flex: 1;
}

form {
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
}

label {
  font-size: 1rem;
}

.action-buttons {
  display: flex;
  box-shadow: 0px -7px 7px var(--background);
  padding: 0.5rem;
  z-index: 1;
}
</style>
