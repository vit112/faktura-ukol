<template>
  <div class="client-invoices">
    <WhiteContainer class="white-container">
      <template #white-container>
        <div v-if="loading">Loading...</div>
        <div v-else>
          <CustomHeader
            headerTag="h1"
            :image="require('@/assets/ico-basic-info.svg')"
            class="client-invoices__header"
          >
            Propojene faktury
          </CustomHeader>
          <div v-if="paginatedInvoices.length === 0">No invoices available</div>
          <div v-else>
            <div class="client-invoices__upper-wrapper">
              <UnpaidFilterSwitch
                @switch-toggled="handleSwitchToggle"
                class="client-invoices__switch"
              ></UnpaidFilterSwitch>

              <SearchGeneral
                placeholder="Hledat fakturu"
                @search-term-updated="searchInvoices"
                class="client-invoices__search"
              />
            </div>
            <!-- <el-table :data="filteredInvoices" style="width: 100%"> -->
            <el-table
              :data="paginatedInvoices"
              style="width: 100%"
              class="client-invoices__table"
            >
              <el-table-column
                prop="number"
                label="Cislo"
                sortable
              ></el-table-column>
              <el-table-column
                prop="due_on"
                label="Splatnost"
                sortable
              ></el-table-column>
              <el-table-column
                prop="kind"
                label="Typ dokladu"
                sortable
              ></el-table-column>
              <el-table-column label="Castka" sortable>
                <template slot-scope="scope">
                  {{ scope.row.total_float }} {{ scope.row.currency }}
                </template>
              </el-table-column>

              <el-table-column
                prop="state"
                label="Stav"
                sortable
              ></el-table-column>
              <el-table-column label="Zaplaceno?" sortable>
                <template slot-scope="scope">
                  <el-checkbox
                    :value="scope.row.state === 'paid'"
                    disabled
                  ></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="prev, pager, next"
              :total="paginatedInvoices.length"
            >
            </el-pagination>
          </div>
        </div>
      </template>
    </WhiteContainer>
  </div>
</template>

<script>
import { GET_CLIENT_INVOICES } from "../../../queries";
import SearchGeneral from "../../../elements/SearchGeneral.vue";
import UnpaidFilterSwitch from "./UnpaidFilterSwitch.vue";
import WhiteContainer from "../../../elements/WhiteContainer.vue";
import CustomHeader from "../../../elements/CustomHeader.vue";

export default {
  name: "ClientInvoices",

  components: {
    SearchGeneral,
    UnpaidFilterSwitch,
    WhiteContainer,
    CustomHeader,
  },

  props: ["clientId"],

  data() {
    return {
      invoices: [],
      filteredInvoices: [],
      loading: false,
      currentPage: 1,
      pageSize: 10,
    };
  },

  watch: {
    async clientId(newClientId) {
      await this.fetchInvoices(newClientId);
    },

    invoices(newInvoices) {
      this.filteredInvoices = newInvoices;
      console.log("Invoices:", this.invoices);
    },
  },

  computed: {
    paginatedInvoices() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      const paginated = this.filteredInvoices.slice(start, end);
      console.log("Paginated Invoices:", paginated);
      return paginated;
    },
  },

  methods: {
    async fetchInvoices(clientId) {
      this.loading = true;
      try {
        const { data } = await this.$apollo.query({
          query: GET_CLIENT_INVOICES,
          variables: { clientId },
        });

        if (data && data.allInvoices) {
          this.invoices = data.allInvoices;
        } else {
          console.log("No invoices found for the client with the provided id");
        }
      } catch (error) {
        console.error("Query error:", error);
      } finally {
        this.loading = false;
      }
    },

    searchInvoices(searchTerm) {
      if (!searchTerm) {
        this.filteredInvoices = this.invoices;
        return;
      }

      this.filteredInvoices = this.invoices.filter(
        (invoice) =>
          invoice.number.includes(searchTerm) ||
          invoice.total_float.toString().includes(searchTerm) ||
          invoice.kind.includes(searchTerm)
      );
    },

    handleSwitchToggle(showOnlyUnpaid) {
      if (showOnlyUnpaid) {
        this.filteredInvoices = this.invoices.filter(
          (invoice) => invoice.state !== "paid"
        );
      } else {
        this.filteredInvoices = this.invoices;
      }
    },

    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>
<style lang="scss" scoped>
.client-invoices {
  margin-top: 40px;
  &__search {
    margin-bottom: 20px;
  }

  &__switch {
    margin-bottom: 20px;
    margin-right: 20px;
  }

  &__upper-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__header {
    margin-left: 30px;
  }

  .white-container {
    padding-left: 0;
    padding-right: 0;
  }

  &__table {
    ::v-deep .el-table__header .cell {
      word-break: keep-all;
      white-space: nowrap;
    }
    ::v-deep .el-table__row .cell {
      word-break: keep-all;
    }
  }
}
</style>
