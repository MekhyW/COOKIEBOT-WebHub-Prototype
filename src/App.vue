<script setup lang="ts">
import { onMounted, ref } from "vue";
import ModalDialog from "./taiyou-webui/Components/ModalDialog.vue";

class Settings {
  id: string;
  language: string;
  threadPosts: string;
  furbots: boolean;
  functionsFun: boolean;
  functionsUtility: boolean;
  sfw: boolean;
  publisherPost: boolean;
  publisherAsk: boolean;
  stickerSpamLimit: number;
  timeWithoutSendingImages: number;
  timeCaptcha: number;
  maxPosts: number;

  constructor(
    id: string,
    furbots: boolean,
    functionsFun: boolean,
    functionsUtility: boolean,
    sfw: boolean,
    publisherPost: boolean,
    publisherAsk: boolean,
    stickerSpamlimit: number,
    timeWithoutSendingImages: number,
    timeCaptcha: number,
    maxPosts: number,
    language: string,
    threadPosts: string
  ) {
    this.id = id;
    this.furbots = furbots;
    this.stickerSpamLimit = stickerSpamlimit;
    this.timeWithoutSendingImages = timeWithoutSendingImages;
    this.timeCaptcha = timeCaptcha;
    this.functionsFun = functionsFun;
    this.functionsUtility = functionsUtility;
    this.sfw = sfw;
    this.language = language;
    this.publisherPost = publisherPost;
    this.publisherAsk = publisherAsk;
    this.threadPosts = threadPosts;
    this.maxPosts = maxPosts;
  }
}

let settings = ref<Settings[]>();
let currentSelectedGroup = ref<Settings | undefined>(undefined);
let originalSelectedGroup: Settings | undefined = undefined;
let discard_dialog = ref(false);
let discard_dialog_ref = ref<InstanceType<typeof ModalDialog> | null>(null);

function select_group(group_id: string) {
  currentSelectedGroup.value = settings.value?.find((value) => value.id == group_id);
  // Copy currentSelectedGroup to originalSelectedGroup
  if (currentSelectedGroup.value != undefined) {
    var value: Settings = currentSelectedGroup.value;
    originalSelectedGroup = { ...value };
  }
}

function discard_changes() {
  if (originalSelectedGroup != undefined) {
    currentSelectedGroup.value = { ...originalSelectedGroup };
  }

  discard_dialog_ref?.value?.requestClose();
}

onMounted(async () => {
  var result = await fetch("https://localhost:443/configs", {
    headers: {
      Authorization: "Basic c2luYXM6MTIzNDU2Nzg=",
    },
    mode: "cors",
    credentials: "include",
    method: "GET",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    cache: "no-cache",
  });

  var json_result: Settings[] = await result.json();

  settings.value = json_result;
});
</script>

<template>
  <div class="side-by-side">
    <ModalDialog v-if="discard_dialog" @on-closed="discard_dialog = false" ref="discard_dialog_ref">
      <form class="dialog-form" @submit.prevent="">
        <h1>Discard Changes?</h1>
        <p>All changes will be lost and restored to the values they had before</p>
        <div class="flex gap-0_75rem">
          <button class="button" @click="discard_changes">Yes</button>
          <button class="button" @click="discard_dialog_ref?.requestClose">No</button>
        </div>
      </form>
    </ModalDialog>

    <div class="division-groups">
      <p>Select a Group</p>
      <ul class="flex-column gap-small">
        <li
          v-for="setting in settings"
          :id="setting.id"
          class="flex align-left button-like gap-small align-items-center iforgottoaddpaddingtobuttonlike"
          @click="select_group(setting.id)"
        >
          <span class="placeholder-circle"></span>
          <p>{{ setting.id }}</p>
        </li>
      </ul>
    </div>

    <div class="division-setter">
      <div v-if="currentSelectedGroup" class="flex-column align-left gap-small">
        <header>
          <p>Group: {{ currentSelectedGroup.id }}</p>
        </header>
        <!-- General -->
        <header class="settings-header">
          <p>General</p>
        </header>

        <div>
          <label for="language-select">Language</label>
          <select id="language-select" name="language" v-model="currentSelectedGroup.language">
            <option value="pt">Português</option>
            <option value="en">English</option>
          </select>
        </div>

        <div>
          <label for="thread-posts">Thread Posts</label>
          <input id="thread-posts" type="text" v-model="currentSelectedGroup.threadPosts" />
        </div>

        <!-- Security and Moderation -->
        <header class="settings-header">
          <p>Security and Moderation</p>
        </header>

        <div>
          <label for="captcha-time">Captcha Time</label>
          <input id="captcha-time" type="number" v-model="currentSelectedGroup.timeCaptcha" />
        </div>

        <div>
          <label for="max-posts">Max Posts</label>
          <input id="max-posts" type="number" v-model="currentSelectedGroup.maxPosts" />
        </div>

        <div>
          <label for="sticker-spam-limit">Sticker Spam Limit</label>
          <input type="number" id="sticker-spam-limit" v-model="currentSelectedGroup.stickerSpamLimit" />
        </div>

        <div>
          <label for="time-without-sending-images">Time without sending images</label>
          <input
            id="time-without-sending-images"
            type="number"
            v-model="currentSelectedGroup.timeWithoutSendingImages"
          />
        </div>

        <!-- Features -->
        <header class="settings-header">
          <p>Features</p>
        </header>

        <div>
          <input id="furbots" type="checkbox" v-model="currentSelectedGroup.furbots" />
          <label for="furbots">Furbots</label>
        </div>

        <div>
          <input id="functions-fun" type="checkbox" v-model="currentSelectedGroup.functionsFun" />
          <label for="functions-fun">Functions Fun</label>
        </div>

        <div>
          <input id="utility-functions" type="checkbox" v-model="currentSelectedGroup.functionsUtility" />
          <label for="utility-functions">Utility Functions</label>
        </div>

        <div>
          <input id="sfw" type="checkbox" v-model="currentSelectedGroup.sfw" />
          <label for="sfw">SFW (Safe for Work)</label>
        </div>

        <!-- Post Publisher -->
        <header class="settings-header">
          <p>Post Publisher</p>
        </header>

        <div>
          <input id="publisher-post" type="checkbox" v-model="currentSelectedGroup.publisherPost" />
          <label for="publisher-post">Receive content from other groups</label>
        </div>

        <div>
          <input id="publisher-ask" type="checkbox" v-model="currentSelectedGroup.publisherAsk" />
          <label for="publisher-ask">Publish content from this group to others</label>
        </div>

        <div class="action-buttons">
          <button class="button">Save</button>
          <button class="button" @click="discard_dialog = true">Discard</button>
        </div>
      </div>
      <div v-else>
        <header>
          <p>Choose a group on the right to change it's settings</p>
        </header>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* li {
  background-color: var(--background-panel);
  border: 1px solid var(--border-slight);
  border-radius: 6px;
  padding: 0.5rem;
  margin: 1rem 0rem;
} */

header {
  color: var(--font-color-title);
  font-size: 1.25rem;
  margin: 0.25rem;
}

.settings-header {
  border-bottom: 1px solid var(--border-slight);
  border-radius: 4px;
  padding: 0.25rem;
  margin: 0.25rem 0px;
  font-size: 1.025rem;
  text-align: left;
}

input[type="number"] {
  width: 8ch;
}

label {
  margin-right: 0.5rem;
}

.side-by-side {
  display: flex;
  gap: 0.5rem;
}

.division-setter {
  flex: 1;
  background-color: var(--background-panel);
  padding: 0.5rem;
  border: 1px solid var(--border-slight);
  border-radius: 6px;
}

.division-groups {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: var(--background-panel);
  padding: 0.5rem;
  border: 1px solid var(--border-slight);
  border-radius: 6px;
}

.placeholder-circle {
  width: 32px;
  height: 32px;
  background-color: var(--placeholder-color);
  border-radius: 100%;
}

.action-buttons {
  display: flex;
  margin: 0.5rem;
  gap: 0.5rem;
}

.iforgottoaddpaddingtobuttonlike {
  padding: 0.2rem 0.25rem;
}
</style>
