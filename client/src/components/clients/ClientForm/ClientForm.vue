<template>
  <div class="client-form">
    <CustomHeader
      headerTag="h1"
      :image="require('@/assets/ico-basic-info.svg')"
    >
      Zakladni udaje
    </CustomHeader>
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      class="demo-ruleForm"
      label-position="left"
      label-width="100px"
    >
      <el-row :gutter="70">
        <el-col class="el-col el-col-24 el-col-xs-24 el-col-md-12">
          <!-- When using the Element UI form validation feature, the prop value is used to associate the form item with the corresponding validation rules. -->
          <el-form-item label="Jmeno" prop="name">
            <CompanyAutocomplete
              :form="form"
              @update-form="updateForm"
              :show-dropdown="showDropdown"
            />
          </el-form-item>
          <div class="company-number--wrapper">
            <el-form-item
              label="ICO"
              prop="company_number"
              class="company-number"
            >
              <div class="company-number--column-wrapper">
                <el-input
                  v-model="form.company_number"
                  placeholder="Doplnit udaje podle ICO"
                  prefix-icon="el-icon-search"
                  class="company-number--column"
                ></el-input>
                <el-button
                  v-if="companyDataLoaded"
                  type="success"
                  icon="el-icon-check"
                  circle
                  size="mini"
                  class="company-number--button"
                  :disabled="true"
                ></el-button>
                <el-button
                  type="primary"
                  icon="el-icon-refresh-right"
                  circle
                  size="mini"
                  class="company-number--button"
                  @click="fetchClientData(form.company_number)"
                ></el-button>
              </div>
              <el-form-item label="">
                <el-alert
                  title="Pokud zadate ICO subjektu, jeho nazev a adresa se automaticky nactou"
                  type="info"
                  :closable="false"
                  class="company-number--alert"
                />
              </el-form-item>
            </el-form-item>
          </div>
          <el-form-item label="DIC" prop="vat_number">
            <el-input v-model="form.vat_number"></el-input>
          </el-form-item>
          <el-form-item label="Telefon" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="E-mail" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="el-col el-col-24 el-col-xs-24 el-col-md-12">
          <el-form-item label="Web" prop="web">
            <el-input v-model="form.web"></el-input>
          </el-form-item>
          <el-form-item label="Ulice" prop="street">
            <el-input v-model="form.street"></el-input>
          </el-form-item>
          <el-form-item label="Mesto" prop="city">
            <el-input v-model="form.city"></el-input>
          </el-form-item>
          <el-form-item label="PSC" prop="postcode">
            <el-input v-model="form.postcode"></el-input>
          </el-form-item>
          <el-form-item label="Zeme" prop="country_code">
            <el-select
              v-model="form.country_code"
              placeholder="Zeme"
              class="country-select custom-select"
            >
              <el-option
                v-for="country in countries"
                :key="country.code"
                :label="country.name"
                :value="country.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="buttons-container">
        <CombinedButton
          iconClass="el-icon-delete"
          buttonText="Zahodit zmeny"
          buttonType="danger"
          @action="resetForm"
        />
        <CombinedButton
          iconClass="el-icon-upload"
          buttonText="Ulozit zmeny"
          buttonType="primary"
          @action="submitForm"
        />
      </div>
    </el-form>
  </div>
</template>
<script>
import CompanyAutocomplete from "./CompanyAutocomplete.vue";
import { ALL_COMPANY_INFOS_BY_NUMBER } from "../../../queries";
import CombinedButton from "../../../elements/CombinedButton.vue";
import CustomHeader from "../../../elements/CustomHeader.vue";

export default {
  components: {
    CompanyAutocomplete,
    CombinedButton,
    CustomHeader,
  },

  props: {
    clientData: {
      type: Object,
      default: () => ({}),
    },
    showDropdown: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      form: {
        name: "",
        vat_number: "",
        phone: "",
        email: "",
        web: "",
        street: "",
        city: "",
        postcode: "",
        country_code: "",
        tax_number: "",
        invoices_count: 0,
        company_number: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Zadejte název společnosti",
            trigger: "blur",
          },
        ],
        company_number: [
          {
            required: true,
            message: "Zadejte IČ společnosti",
            trigger: "blur",
          },
        ],
        street: [{ required: true, message: "Zadejte ulici", trigger: "blur" }],
        city: [{ required: true, message: "Zadejte město", trigger: "blur" }],
        postcode: [{ required: true, message: "Zadejte PSČ", trigger: "blur" }],
        country_code: [
          { required: true, message: "Zadejte kód země", trigger: "change" },
        ],
        tax_number: [
          { required: true, message: "Zadejte daňové číslo", trigger: "blur" },
        ],
        vat_number: [
          { required: true, message: "Zadejte DIČ", trigger: "blur" },
        ],
        email: [{ required: true, message: "Zadejte e-mail", trigger: "blur" }],
        phone: [
          {
            required: true,
            message: "Zadejte telefonní číslo",
            trigger: "blur",
          },
        ],
        web: [
          {
            required: true,
            message: "Zadejte webovou adresu",
            trigger: "blur",
          },
        ],
      },
      countries: [
        { code: "CZ", name: "Česko" },
        { code: "US", name: "Spojené státy" },
        { code: "CA", name: "Kanada" },
        { code: "MX", name: "Mexiko" },
        { code: "NO", name: "Norsko" },
        { code: "GB", name: "Velká Británie" },
      ],
      companyDataLoaded: false,
    };
  },

  mounted() {
    if (Object.keys(this.clientData).length > 0) {
      this.form = { ...this.form, ...this.clientData };
    }
  },

  watch: {
    clientData(newData) {
      if (Object.keys(newData).length > 0) {
        this.form = { ...this.form, ...newData };
      }
    },
  },

  methods: {
    updateForm(newData) {
      this.form = { ...this.form, ...newData };
    },

    async fetchClientData(company_number) {
      try {
        const { data } = await this.$apollo.query({
          query: ALL_COMPANY_INFOS_BY_NUMBER,
          variables: { companyNumber: company_number },
        });

        if (data && data.allCompanyInfos && data.allCompanyInfos.length > 0) {
          this.companyDataLoaded = true;

          //Using $set ensures that the new values are properly tracked and triggers reactivity.
          const client = data.allCompanyInfos[0];
          this.$set(this.form, "name", client.name || "");
          this.$set(this.form, "vat_number", client.vat_no || "");
          this.$set(this.form, "phone", client.phone || client.mobile || "");
          this.$set(this.form, "email", client.email || "");
          this.$set(this.form, "web", client.web || "");
          this.$set(this.form, "street", client.address_street || "");
          this.$set(this.form, "city", client.address_city || "");
          this.$set(this.form, "postcode", client.address_postcode || "");
          this.$set(this.form, "country_code", client.country_code || "");
        } else {
          console.log("No client found with the provided company number");
          this.companyDataLoaded = false;
        }
      } catch (error) {
        console.error("Query error:", error);
      }
    },

    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("submit-form", this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm() {
      this.$refs.form.resetFields();
      this.companyDataLoaded = false;
    },
  },
};
//imrovements:
//form field validation - e.g. if email address is in the correct format
//error states
</script>

<style lang="scss" scoped>
@import "../../../styles.scss";
.company-number--wrapper {
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

    &--alert {
      line-height: 0;
      background-color: $white;
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 0;
    }
  }
}

.country-select {
  width: 100%;
}

.buttons-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
