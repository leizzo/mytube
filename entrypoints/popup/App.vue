<script lang="ts" setup>
import { ref, watch } from "vue";
import { getMessageService } from "@/hooks/proxyService";

const { getDisabledStatusForHomePage, setDisabledStatusForHomePage } =
  getMessageService();

const disableHome = ref<boolean | null>(false);

async function init() {
  try {
    disableHome.value = await getDisabledStatusForHomePage();
  } catch (error) {
    console.error(error);
  }
}

init();
watch(disableHome, setDisabledStatusForHomePage);
</script>

<template>
  <div class="bg-slate-600 text-white font-bold p-2 w-48">
    <h1>My Tube</h1>

    <div class="mt-2">
      <label class="flex" for="isHomePageDisabled">
        <input
          v-model="disableHome"
          type="checkbox"
          id="isHomePageDisabled"
          class="mr-1"
        />
        Disable Home
      </label>
    </div>
  </div>
</template>
