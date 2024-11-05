<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface WorkPeriodBoxProps {
  index: number;
  workPeriods: {
    work_period_date?: string;
    work_period_percent?: string;
  }[];
}

const props = withDefaults(defineProps<WorkPeriodBoxProps>(), {
  index: 0,
  workPeriods: () => [
    {
      work_period_date: "",
      work_period_percent: "",
    },
  ],
});
</script>

<template>
  <div
    class="w-full flex flex-col lg:grid lg:grid-cols-2 gap-4 border rounded-md p-4"
  >
    <p class="col-span-full">งานที่ {{ props.index + 1 }}</p>
    <FormField
      v-slot="{ field }"
      :name="`workPeriods.${props.index}.work_period_date`"
    >
      <FormItem>
        <FormControl>
          <div class="flex items-center">
            <input
              type="date"
              v-bind="field"
              class="input-control w-full border-[1px] px-2 py-2 mt-sm rounded-md"
              :validateOnChange="false"
            />
          </div>
        </FormControl>
      </FormItem>
    </FormField>

    <FormField
      v-slot="{ field }"
      :name="`workPeriods.${props.index}.work_period_percent`"
    >
      <FormItem>
        <FormControl>
          <div class="flex items-center">
            <input
              type="text"
              v-bind="field"
              placeholder="จำนวนเปอร์เซ็นต์ของงานงวด"
              class="input-control w-full border-[1px] px-2 py-2 mt-sm rounded-md"
              :validateOnChange="false"
            />
          </div>
        </FormControl>
      </FormItem>
      <FormMessage />
    </FormField>
  </div>
</template>

<style scoped></style>
