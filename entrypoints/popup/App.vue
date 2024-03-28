<script lang="ts" setup>
import { ref, watch } from "vue";
import { getMessageService } from "@/hooks/proxyService";

const { getDisabledStatus, setDisabledStatus } = getMessageService();

const disableHome = ref<boolean | null>(false);
const disableRecommendations = ref<boolean | null>(false);

async function init() {
  try {
    disableHome.value = await getDisabledStatus("local:disabledHome");
    disableRecommendations.value = await getDisabledStatus(
      "local:disabledRecommendations"
    );
  } catch (error) {
    console.error(error);
  }
}

init();

watch(disableHome, (val) => setDisabledStatus("local:disabledHome", val));

watch(disableRecommendations, (val) =>
  setDisabledStatus("local:disabledRecommendations", val)
);
</script>

<template>
  <div class="bg-slate-600 text-white font-bold p-2 w-60">
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

    <div class="mt-2">
      <label class="flex" for="isRecommendationsDisabled">
        <input
          v-model="disableRecommendations"
          type="checkbox"
          id="isRecommendationsDisabled"
          class="mr-1"
        />
        Disable Recommendations
      </label>
    </div>
  </div>
</template>
