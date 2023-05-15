<template>
  <el-switch v-model="showOnlyUnpaid" active-text="Jen nezaplacene"></el-switch>
</template>

<script>
export default {
  name: "UnpaidFilterSwitch",

  data() {
    return {
      showOnlyUnpaid: false,
    };
  },

  watch: {
    showOnlyUnpaid(newVal) {
      this.$emit("switch-toggled", newVal);
    },
  },
};
</script>
