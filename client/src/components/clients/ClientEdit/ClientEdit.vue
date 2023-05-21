<template>
  <div class="client-details">
    <CustomHeader headerTag="h1"> Seznam Klientu </CustomHeader>
    <white-container>
      <ClientForm
        :clientData="clientData"
        @submit-form="editClient"
        :show-dropdown="false"
      />
    </white-container>
    <ClientInvoices :clientId="clientData.id" />
  </div>
</template>

<script>
import WhiteContainer from "../../../elements/WhiteContainer.vue";
import ClientForm from "../ClientForm/ClientForm.vue";
import { UPDATE_CLIENT_MUTATION } from "../../../mutations";
import { FETCH_CLIENT_BY_ID } from "../../../queries";
import CustomHeader from "../../../elements/CustomHeader.vue";
import ClientInvoices from "../ClientInvoices/ClientInvoices.vue";
import { Message } from "element-ui";

export default {
  name: "ClientDetails",

  components: {
    WhiteContainer,
    ClientForm,
    CustomHeader,
    ClientInvoices,
  },

  data() {
    return {
      clientData: {},
    };
  },

  async created() {
    const clientId = this.$route.params.id; // Get the client id from the URL
    await this.fetchClientData(clientId);
  },

  methods: {
    async fetchClientData(clientId) {
      try {
        const { data } = await this.$apollo.query({
          query: FETCH_CLIENT_BY_ID,
          variables: { id: clientId },
        });

        console.log("Data from server:", data);

        if (data && data.Client) {
          this.clientData = data.Client;
        } else {
          console.log("No client found with the provided id");
        }
      } catch (error) {
        console.error("Query error:", error);
      }
    },

    async editClient(updatedClientData) {
      console.log("Updated client data:", updatedClientData);
      try {
        // Call the GraphQL mutation to update the client with the `updatedClientData`
        await this.$apollo.mutate({
          mutation: UPDATE_CLIENT_MUTATION,
          variables: {
            id: updatedClientData.id,
            name: updatedClientData.name,
            company_number: updatedClientData.company_number,
            street: updatedClientData.street,
            city: updatedClientData.city,
            postcode: updatedClientData.postcode,
            country_code: updatedClientData.country_code,
            tax_number: updatedClientData.tax_number,
            vat_number: updatedClientData.vat_number,
            email: updatedClientData.email,
            phone: updatedClientData.phone,
            web: updatedClientData.web,
            invoices_count: updatedClientData.invoices_count,
          },
        });
        Message({
          message: "Form submitted successfully!",
          type: "success",
        });
      } catch (error) {
        Message({
          message: "Form not submitted successfully!",
          type: "error",
        });
      }
    },
  },
  //improvements to be made
  //1) refetching data after edit
  //2) loading and no empty state handled
};
</script>

<style scoped></style>
