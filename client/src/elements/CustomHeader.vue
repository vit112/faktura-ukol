<template>
  <div class="custom-header">
    <img v-if="image" :src="image" class="custom-header__image" />
    <component
      :is="headerTag"
      class="custom-header__title"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot></slot>
    </component>
  </div>
</template>

<script>
export default {
  name: "CustomHeader",
  props: {
    headerTag: {
      type: String,
      default: "h2",
      validator: (value) => ["h1", "h2"].includes(value),
    },
    image: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
.custom-header {
  display: flex;
  align-items: center;

  margin-bottom: 35px;
}
.custom-header__image {
  margin-right: 8px;
}

.custom-header__title {
  margin: 0;
}
</style>
