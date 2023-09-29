<script setup lang="ts">
import { useRouter } from "vue-router";
import { useGroupStore } from "../stores/GroupStore";
import { useTelegramUserStore } from "../stores/TelegramUser";
import PageHeader from "../components/PageHeader.vue";

const telegramStore = useTelegramUserStore();
const groupStore = useGroupStore();
const router = useRouter();

function gotoGroup(group_id: string) {
  console.log(`goto group ${group_id}`);
  router.push({ path: "/group", query: { group_id: group_id } });
}
</script>

<template>
  <div>
    <PageHeader></PageHeader>
    <p>Select Group Route</p>
    <p>Your name is {{ telegramStore.user_display_name }}</p>

    <ul class="groups-list">
      <li v-for="group in groupStore.groups" :id="group.id" class="tg-button group-button" @click="gotoGroup(group.id)">
        <div class="right-section">
          <img :src="group.profile_picture_url" class="group-icon" />
          <p>{{ group.name }}</p>
        </div>
        <span class="flex-end">&gt;</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.groups-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0px 0.25rem;
}

.group-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  font-size: 1.25rem;
  user-select: none;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.group-icon {
  width: 52px;
  border-radius: 100%;
}
</style>
