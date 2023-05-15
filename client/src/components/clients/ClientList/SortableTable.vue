<template>
  <div class="sortable-table">
    <el-table
      :data="pagedClients"
      @sort-change="handleSortChange"
      style="width: 100%"
    >
      <el-table-column prop="name" label="Name" width="230" sortable>
        <template slot-scope="scope">
          <span @click="redirectToEdit(scope.row)" class="link-style">
            {{ scope.row.name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="company_number"
        label="ICO"
        width="150"
        sortable
      ></el-table-column>
      <el-table-column
        prop="email"
        label="Email"
        width="300"
        sortable
      ></el-table-column>
      <el-table-column prop="phone" label="Phone" sortable></el-table-column>
      <el-table-column
        prop="invoices_count"
        label="Invoices"
        sortable
      ></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <div class="sortable-table__icon-button-wrapper">
            <el-button
              icon="el-icon-edit"
              @click="redirectToEdit(scope.row)"
              class="icon-button-edit"
            ></el-button>
            <el-button
              icon="el-icon-delete"
              @click.stop="deleteContact(scope.row)"
              class="icon-button-delete"
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="pageSize"
      :total="filteredClients.length"
      layout="prev, pager, next"
      v-model="currentPage"
      @current-change="handlePageChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    filteredClients: Array,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 7,
    };
  },
  computed: {
    pagedClients() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;
      return this.filteredClients.slice(start, end);
    },
  },
  methods: {
    redirectToEdit(row) {
      this.$emit("edit", row);
    },

    deleteContact(row) {
      this.$emit("delete", row);
    },

    handleSortChange({ prop, order }) {
      this.$emit("sort-change", { prop, order });
    },

    handlePageChange(page) {
      this.currentPage = page;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../styles.scss";

.sortable-table {
  .link-style {
    color: $blue;
    text-decoration: underline;
    cursor: pointer;
  }

  &__icon-button-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  .icon-button-edit {
    border: none;
    background-color: transparent;
    color: $blue;
    padding: 12px 12px;
  }
  .icon-button-delete {
    border: none;
    background-color: transparent;
    color: $red;
    padding: 12px 12px;
  }
}
</style>
