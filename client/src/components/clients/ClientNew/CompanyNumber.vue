<template>
  <div class="company-number-wrapper">
    <el-form-item label="ICO" prop="company_number" class="company-number">
      <div class="company-number--column-wrapper">
        <el-input
          :value="companyNumber"
          @input="updateCompanyNumber"
          placeholder="Doplnit udaje podle ICO"
          prefix-icon="el-icon-search"
          class="company-number--column"
        ></el-input>
        <el-button
          type="success"
          icon="el-icon-check"
          circle
          size="mini"
          class="company-number--button"
        ></el-button>
        <el-button
          type="primary"
          icon="el-icon-refresh-right"
          circle
          size="mini"
          class="company-number--button"
          @click="fetchClientData(companyNumber)"
        ></el-button>
      </div>
      <el-form-item label="">
        <el-alert
          title="Pokud zadate ICO subjektu, jeho nazev a adresa se automaticky nactou"
          type="info"
          :closable="false"
        />
      </el-form-item>
    </el-form-item>
  </div>
</template>

<script>
export default {
  props: {
    companyNumber: {
      type: String,
      default: "",
    },
  },

  methods: {
    fetchClientData(companyNumber) {
      this.$emit("fetch-client-data", companyNumber);
    },

    updateCompanyNumber(newValue) {
      this.$emit("update-company-number", newValue);
    },
  },
};
</script>
<style lang="scss" scoped>
.company-number-wrapper {
  display: flex;
  flex-direction: column;

  .company-number {
    &--column-wrapper {
      display: flex;
      align-items: center;
    }
    &--column {
      display: flex;
      width: 75%;
    }
    &--button {
      margin-left: 10px;
    }
  }
}
</style>
