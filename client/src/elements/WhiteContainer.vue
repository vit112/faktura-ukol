<template>
  <div class="white-container--with-padding">
    <slot name="white-container"></slot>
  </div>
</template>

<script>
export default {
  name: "MyContainer",
};
</script>

<style lang="scss" scoped>
@import "../styles.scss";
.white-container--with-padding {
  background-color: $white;

  padding: 1.667rem;
}
</style>
