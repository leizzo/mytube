<script lang="ts" setup>
import { watch, ref } from "vue";
import { getDisabledStatusService } from "~/services/disabledStatusService";
import type { DisabledStatus } from "~/services/disabledStatusService";

const { getDisabledStatus, setDisabledStatus } = getDisabledStatusService();

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

const disabledStatus = ref<DisabledStatus>({
  Home: false,
  Recommendations: false,
  Shorts: false,
  Comments: false,
  Notifications: false,
  Thumbnail: false,
});

async function init() {
  const values = (await getDisabledStatus()) as DisabledStatus;

  if (values) {
    disabledStatus.value = values;
  }
}

init();

watch(
  disabledStatus,
  (changedValue) => {
    setDisabledStatus(changedValue as never);
  },
  { deep: true }
);
</script>

<template>
  <div class="bg-slate-600 text-white font-bold p-2 w-60">
    <h1>My Tube</h1>

    <div
      v-for="item in Object.entries(disabledStatus) as Entries<DisabledStatus>"
      :key="item[0]"
      class="mt-2"
      v-memo="[disabledStatus[item[0]]]"
    >
      <label class="flex" :for="item[0]">
        <input
          v-model.lazy="disabledStatus[item[0]]"
          :id="item[0]"
          type="checkbox"
          class="mr-1"
        />
        Disable {{ item[0] }}
      </label>
    </div>
  </div>
</template>
