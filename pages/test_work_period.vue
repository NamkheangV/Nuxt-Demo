<script setup lang="ts">
import { ref } from "vue";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

// สร้างตัวแปร workPeriods แบบ reactive โดยมีค่าเริ่มต้นเป็น array ที่มี object ที่มี key ชื่อว่า work_period_date และ work_period_percent โดยมีค่าเริ่มต้นเป็น string ว่าง
const workPeriods = ref<
  Array<{ work_period_date?: string; work_period_percent?: string }>
>([{}]);

// สร้าง function onAddWorkPeriod ที่ทำหน้าที่เพิ่ม object ใหม่เข้าไปใน array workPeriods
const onAddWorkPeriod = () => {
  workPeriods.value.push({});
};

const suppliesSchema = toTypedSchema(
  z.object({
    workPeriods: z.array(
      z.object({
        work_period_date: z.string(),
        work_period_percent: z.string(),
      })
    ),
  })
);

const { handleSubmit } = useForm({
  validationSchema: suppliesSchema,
  initialValues: {
    workPeriods: [
      {
        work_period_date: "",
        work_period_percent: "",
      },
    ],
  },
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>

<template>
  <div class="m-16 flex flex-col items-center">
    <p class="self-start">งานงวด</p>
    <div
      class="w-full flex flex-col gap-y-4 items-center border mx-6 my-2 p-3.5 rounded-md"
    >
      <div
        v-for="(period, index) in workPeriods"
        :key="index"
        class="w-full"
      >
        <WorkPeriodBox
          :index="index"
          :workPeriods="workPeriods"
        />
      </div>
      <button
        @click="onAddWorkPeriod"
        class="flex px-2 py-1 items-center text-[#ED6E46] border border-[#ED6E46] rounded-md"
      >
        <Icon name="ic:round-plus" />
        <p>เพิ่มงาน</p>
      </button>
    </div>
    <button
      @click.prevent="onSubmit"
      class="w-full bg-[#ED6E46] text-white rounded-md p-2"
    >
      บันทึก
    </button>
  </div>
</template>

<style scoped></style>
