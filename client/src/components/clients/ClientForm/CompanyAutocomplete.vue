<template>
  <div>
    <template v-if="showDropdown">
      <el-autocomplete
        v-model="companyName"
        placeholder="Vyhledat firmu podle nazvu"
        prefix-icon="el-icon-search"
        :fetch-suggestions="fetchCompanySuggestions"
        @select="onCompanySelect"
        class="company-autocomplete"
      >
        <template #default="{ item }">
          <div class="dropdown">
            <div class="dropdown--company-name">{{ item.name }}</div>
            <div class="dropdown--company-number">
              ICO: {{ item.company_number }}
            </div>
            <div class="dropdown--company_address">
              {{ item.address_city }}, {{ item.address_postcode }}
            </div>
          </div>
        </template>
      </el-autocomplete>
    </template>
    <!-- No dropdown in edit -->
    <template v-else>
      <el-input
        v-model="companyName"
        placeholder="Vyhledat firmu podle nazvu"
        prefix-icon="el-icon-search"
        class="company-autocomplete"
      />
    </template>
  </div>
</template>
<script>
import { ALL_COMPANY_INFOS } from "../../../queries";
export default {
  name: "CompanyAutocomplete",
  props: {
    form: Object,
    showDropdown: Boolean,
  },

  data() {
    return {
      companyName: this.form.name,
    };
  },

  methods: {
    async fetchCompanySuggestions(input, callback) {
      try {
        const { data } = await this.$apollo.query({
          query: ALL_COMPANY_INFOS,
        });

        if (data && data.allCompanyInfos && data.allCompanyInfos.length > 0) {
          const filteredSuggestions = data.allCompanyInfos.filter((company) =>
            company.name.toLowerCase().includes(input.toLowerCase())
          );
          // Limit the number of results to 4
          const limitedSuggestions = filteredSuggestions.slice(0, 4);
          callback(limitedSuggestions);
        } else {
          callback([]);
        }
      } catch (error) {
        console.error("Query error:", error);
        callback([]);
      }
    },

    onCompanySelect(company) {
      this.companyName = company.name || "";
      const updatedForm = {
        ...this.form,
        name: company.name || "",
        vat_number: company.vat_no || "",
        phone: company.phone || company.mobile || "",
        email: company.email || "",
        web: company.web || "",
        street: company.address_street || "",
        city: company.address_city || "",
        postcode: company.address_postcode || "",
        country_code: company.country_code || "",
        company_number: company.company_number || "",
      };
      this.$emit("update-form", updatedForm);
    },
  },

  watch: {
    "form.name": function (newVal) {
      this.companyName = newVal;
    },

    companyName(newVal, oldVal) {
      if (newVal !== oldVal) {
        const updatedForm = { ...this.form, name: newVal };
        this.$emit("update-form", updatedForm);
      }
    },
  },
};

//improvements
//fetchCompanySuggestions should be debounced (avoid making too many requests)
</script>
<style lang="scss" scoped>
.company-autocomplete {
  width: 100%;
}
.dropdown {
  line-height: 1;
  margin-bottom: 0.5rem;

  &--company-name {
    font-weight: bold;
  }
}
</style>
