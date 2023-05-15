<template>
  <div class="combined-button-wrapper">
    <el-button
      :class="['combined-button', `el-button--${buttonType}`]"
      @click.prevent="$emit('action')"
    >
      <i v-if="iconClass" :class="iconClass"></i>
      {{ buttonText }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: "CombinedButton",
  props: {
    iconClass: {
      type: String,
      default: null,
    },
    buttonText: {
      type: String,
      required: true,
    },
    buttonType: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "danger"].includes(value),
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles.scss";

.combined-button-wrapper {
  margin-left: 10px;
}
.combined-button {
  &:hover,
  &:focus,
  &:active {
    color: $white;
  }

  &.el-button--primary {
    background-color: $orange;
    border-color: $orange;

    &:hover,
    &:focus,
    &:active {
      background-color: darken($orange, 5%);
      border-color: $orange;
    }
  }

  &.el-button--danger {
    background-color: $white;
    border-color: $blue;
    color: $blue;

    &:hover,
    &:focus,
    &:active {
      background-color: darken($white, 5%);
      border-color: $blue;
    }
  }
}
</style>
