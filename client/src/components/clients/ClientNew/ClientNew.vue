<template>
  <div class="client-new">
    <CustomHeader headerTag="h1"> Novy kontakt </CustomHeader>
    <white-container>
      <template #white-container>
        <ClientForm @submit-form="submitForm" ref="form" />
      </template>
    </white-container>
  </div>
</template>

<script>
import ClientForm from "../ClientForm/ClientForm.vue";
import { CREATE_CLIENT } from "../../../mutations";
import { CLIENTS_LIST_QUERY } from "../../../queries";
import WhiteContainer from "../../../elements/WhiteContainer.vue";
import CustomHeader from "../../../elements/CustomHeader.vue";
import { Message } from "element-ui";

export default {
  name: "NewClient",
  components: {
    WhiteContainer,
    ClientForm,
    CustomHeader,
  },

  data() {
    return {
      companyDataLoaded: false,
    };
  },

  methods: {
    async submitForm(formData) {
      try {
        const { data } = await this.$apollo.mutate({
          mutation: CREATE_CLIENT,
          variables: {
            name: formData.name,
            company_number: formData.company_number,
            street: formData.street,
            city: formData.city,
            postcode: formData.postcode,
            country_code: formData.country_code,
            tax_number: formData.tax_number,
            vat_number: formData.vat_number,
            email: formData.email,
            phone: formData.phone,
            web: formData.web,
            invoices_count: parseInt(formData.invoices_count),
          },
          // Update the cache after the mutation
          refetchQueries: [
            {
              query: CLIENTS_LIST_QUERY,
            },
          ],
        });
        console.log("Created client:", data.createClient);

        Message({
          message: "Form submitted successfully!",
          type: "success",
        });
        // Reset the form
        this.$refs.form.resetForm();
      } catch (error) {
        console.error("Mutation error:", error);

        Message({
          message: "Failed to submit form.",
          type: "error",
        });
      }
    },
  },
};
//improvements
// could be redirected to clientList after submit
</script>
<style lang="scss" scoped>
@import "../../../styles.scss";
.client-new {
  margin-top: 40px;
}
</style>
