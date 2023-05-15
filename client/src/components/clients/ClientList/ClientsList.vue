<template>
  <div class="clients-list">
    <CustomHeader headerTag="h1"> Seznam Kontaktu </CustomHeader>
    <WhiteContainer class="white-container">
      <template #white-container>
        <div class="clients-list__upper-wrapper">
          <CombinedButton
            iconClass="el-icon-plus"
            buttonText="Pridat kontakt"
            buttonType="primary"
            @action="addNewClient"
            class="clients-list__client-button"
          />
          <SearchGeneral @search-term-updated="updateFilteredClients" />
        </div>
        <div class="clients-list__sortable-table-wrapper">
          <SortableTable
            :filteredClients="filteredClients"
            :current-page="currentPage"
            @edit="redirectToEdit"
            @delete="deleteContact"
            @sort-change="handleSortChange"
            @page-change="handlePageChange"
          />
        </div>
      </template>
    </WhiteContainer>
  </div>
</template>

<script>
import { CLIENTS_LIST_QUERY } from "../../../queries";
import WhiteContainer from "../../../elements/WhiteContainer.vue";
import CombinedButton from "../../../elements/CombinedButton.vue";
import SortableTable from "./SortableTable.vue";
import CustomHeader from "../../../elements/CustomHeader.vue";
import SearchGeneral from "@/elements/SearchGeneral.vue";

export default {
  name: "ClientList",

  components: {
    WhiteContainer,
    CombinedButton,
    SortableTable,
    CustomHeader,
    SearchGeneral,
  },

  data() {
    return {
      clients: [],
      searchTerm: "",
      headerRowClass: "header-row-color",
      currentPage: 1,
    };
  },
  async created() {
    await this.fetchClientData();
  },

  watch: {
    searchTerm() {
      // Accessing the computed property will cause it to update
      this.filteredClients;
    },
  },

  computed: {
    filteredClients() {
      return this.clients.filter((client) => {
        return (
          client.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          client.phone.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          client.company_number
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        );
      });
    },
  },

  methods: {
    async fetchClientData() {
      try {
        const { data } = await this.$apollo.query({
          query: CLIENTS_LIST_QUERY,
        });
        console.log("Data from server:", data);
        if (data && data.allClients) {
          this.clients = data.allClients;
        }
      } catch (error) {
        console.error("Query error:", error);
      }
    },

    redirectToEdit(row) {
      const clientId = row.id;
      if (clientId) {
        this.$router.push({ name: "ClientEdit", params: { id: clientId } });
      } else {
        console.log("No client id provided");
      }
    },

    handleSortChange({ prop, order }) {
      console.log("Sorting by:", prop, "in", order, "order");

      // Sort the clients array based on the given prop and order
      this.clients.sort((a, b) => {
        if (order === "ascending") {
          return a[prop] > b[prop] ? 1 : -1;
        } else {
          return a[prop] < b[prop] ? 1 : -1;
        }
      });

      // Refresh the filteredClients computed property
      this.updateFilteredClients(this.searchTerm);
    },

    updateFilteredClients(searchTerm) {
      this.searchTerm = searchTerm;
    },

    addNewClient() {
      this.$router.push({ name: "ClientNew" });
    },

    async deleteContact(client) {
      console.log("Deleting client:", client);
    },

    handlePageChange(page) {
      this.currentPage = page;
    },
  },
};
//vuex could be created to manage the state of filtered data.
</script>
<style lang="scss" scoped>
@import "../../../styles.scss";
.clients-list {
  &__upper-wrapper {
    justify-content: space-between;
    display: flex;
  }

  &__sortable-table-wrapper {
    margin-top: 15px;
  }

  &__client-button {
    margin-left: 40px;
  }
}

.white-container {
  padding-left: 0;
  padding-right: 0;
}
</style>
