<script setup lang="ts">
import { useField } from 'vee-validate';

type InputType = 'text' | 'password';
type InputAction = 'toggle-password' | 'clear';
type InputSize = 'small' | 'normal' | 'large';

interface InputProps {
  modelValue: string;
  name: string;
  type: InputType;
  placeholder?: string;
  maxLength?: number;

  inputIcon?: string;
  inputAction?: InputAction;
  inputFloat?: boolean;

  notify?: boolean;
  inputSize?: InputSize;
  roundedLeft?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<InputProps>(), {
  inputFloat: false,
  notify: false,
  disabled: false,
  inputSize: 'normal',
});

const emit = defineEmits<{
  'update:modelValue': [value: string],
  onClear: [],
}>();

const clearIcon = 'ion:close-outline';


const togglePasswordIcon = {
  show: 'ion:eye-outline',
  hide: 'ion:eye-off-outline'
};

const showPassword = ref<boolean>(false);


const { value, errorMessage } = useField(props.name, undefined, {
  syncVModel: true,
})

const handleInput = (event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    emit('update:modelValue', event.target.value);
  }
}

const handleInputType = () => {
  if (props.inputAction === 'toggle-password') {
    return showPassword.value ? 'text' : 'password';
  }

  return props.type;
}

// ==========================
// TOGGLE PASSWORD
// ==========================
const handleIconShowPassword = () => {
  if (showPassword.value) {
    return togglePasswordIcon.show;
  }

  return togglePasswordIcon.hide;
}

// =======================
// CLEAR
// =======================
const handleClickClear = () => {
  emit('onClear');
  emit('update:modelValue', '');
}
</script>

<template>
  <div class="relative">
    <Icon 
      v-if="inputIcon" 
      :name="inputIcon || ''" 
      class="text-grey-modern-500 absolute top-1/2 -translate-y-1/2 left-sm text-base-m" 
    />

    <input 
      :value="value"
      :id="name"
      :name="name"
      :type="handleInputType()"
      :placeholder="inputFloat ? '' : placeholder"
      :maxlength="maxLength"
      :disabled="disabled"
      @input="handleInput"
      class="input-control border-[1px] px-xs py-sm w-full"
      :class="{
        'pl-5xl': inputIcon,
        'pr-5xl': inputAction === 'clear',
        'peer': inputFloat,
        'py-3xs h-[45px]': inputSize === 'small',
        'py-xs': inputSize === 'normal',
        'py-sm': inputSize === 'large',
        '!border-error-500': errorMessage,
        '!rounded-none !rounded-l-md': roundedLeft,
        'bg-grey-modern-50': disabled
      }"
    />

    <label 
      v-if="inputFloat"
      :for="name" 
      class="
        absolute text-base text-grey-neutral-400 
        transform top-5xs -translate-y-1/2 z-10 
        ml-sm scale-75 bg-white  origin-[0] duration-300  
        peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 
        peer-focus:top-5xs peer-focus:scale-75 peer-focus:ml-sm peer-focus:text-secondary-500 
        select-none cursor-text
      "
      :class="{
        'peer-placeholder-shown:ml-5xl': inputIcon,
        'peer-placeholder-shown:ml-sm': !inputIcon,
        '!text-error-500': errorMessage
      }"
    >
      {{ placeholder }}
    </label>


    <p v-if="notify" 
      class="text-error-500 !text-sm absolute -bottom-[22px]"
    >
      {{ errorMessage }}
    </p>

    <Icon 
      v-if="inputAction === 'toggle-password'"
      :name="handleIconShowPassword()"
      class="text-grey-modern-500 text-line-sans-s absolute top-1/2 -translate-y-1/2 right-md cursor-pointer hover:text-primary-500"
      @click="() => showPassword = !showPassword"
    />
    <Icon 
      v-if="inputAction === 'clear' && modelValue.length > 0" 
      :name="clearIcon"
      class="text-grey-modern-500 text-line-sans-s absolute top-1/2 -translate-y-1/2 right-md cursor-pointer hover:text-primary-500"
      @click="handleClickClear"
    />
  </div>
</template>

<style scoped>
  
</style>