<script setup>
const files = ref([]);
const uploading = ref(false);
const message = ref("");
const status = ref("");

const handleFileSelect = (event) => {
  const selectedFiles = Array.from(event.target.files);
  files.value = [...files.value, ...selectedFiles];
};

const removeFile = (indexToRemove) => {
  files.value = files.value.filter((_, index) => index !== indexToRemove);
};

const handleSubmit = async () => {
  uploading.value = true;
  message.value = "";
  status.value = "";

  try {
    // Create FormData object to send files
    const formData = new FormData();
    files.value.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    // Example API call using useFetch
    const { data, error } = await useFetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (error.value) {
      throw error.value;
    }

    message.value = "Files uploaded successfully!";
    status.value = "success";
    files.value = []; // Clear files after successful upload
  } catch (error) {
    console.error("Upload error:", error);
    message.value = "Error uploading files. Please try again.";
    status.value = "error";
  } finally {
    uploading.value = false;
  }
};
</script>

<template>
  <div class="w-full max-w-md mx-auto p-4 space-y-4">
    <form
      @submit.prevent="handleSubmit"
      class="space-y-4"
    >
      <!-- File Input -->
      <div class="flex items-center justify-center w-full">
        <label
          class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 relative"
          :class="{ 'opacity-50': uploading }"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-8 h-8 mb-2 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p class="mb-2 text-sm text-gray-500">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
          </div>
          <input
            ref="fileInput"
            type="file"
            class="hidden"
            multiple
            @change="handleFileSelect"
            :disabled="uploading"
          />
        </label>
      </div>

      <!-- File List -->
      <div
        v-if="files.length > 0"
        class="space-y-2"
      >
        <h3 class="text-sm font-medium">Selected Files:</h3>
        <div class="space-y-2">
          <div
            v-for="(file, index) in files"
            :key="index"
            class="flex items-center justify-between p-2 bg-gray-50 rounded"
          >
            <span class="text-sm truncate">{{ file.name }}</span>
            <button
              type="button"
              @click="removeFile(index)"
              class="text-red-500 hover:text-red-700"
              :disabled="uploading"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="files.length === 0 || uploading"
      >
        {{ uploading ? "Uploading..." : "Upload Files" }}
      </button>
    </form>

    <!-- Status Message -->
    <div
      v-if="message"
      class="p-4 rounded-lg"
      :class="{
        'bg-green-100 text-green-700': status === 'success',
        'bg-red-100 text-red-700': status === 'error',
      }"
    >
      {{ message }}
    </div>
  </div>
</template>
