import { defineStore } from "pinia";

// interface ColorState {
//     name: string
// }

export const useColorStore = defineStore("color", {
  state: () => ({
    // configure the initial state
    name: "",
  }),

  actions: {
    setColor(data: string) {
      this.name = data;
    },
  },
});

export default useColorStore;
