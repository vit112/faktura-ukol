<template>
  <div class="search-container">
    <el-input
      v-model="searchTerm"
      :placeholder="placeholder"
      class="search-input"
      clearable
    ></el-input>
  </div>
</template>
<script>
export default {
  name: "SearchGeneral",

  data() {
    return {
      searchTerm: "",
    };
  },

  props: {
    placeholder: {
      type: String,
      default: "Hledat",
    },
  },

  watch: {
    searchTerm(newSearchTerm) {
      this.$emit("search-term-updated", newSearchTerm);
    },
  },
};
</script>
<style lang="scss" scoped>
.search-container {
  display: flex;
  justify-content: flex-end;

  margin-right: 45px;
  .search-input {
    width: 250px;
  }
}
</style>
