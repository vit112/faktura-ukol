<template>
  <nav class="breadcrumb">
    <ol>
      <li class="home-separator">
        <router-link to="/">
          <i class="el-icon-house"></i>
        </router-link>
      </li>
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        class="breadcrumb__item"
      >
        <router-link v-if="index < breadcrumbs.length - 1" :to="crumb.path">
          {{ crumb.name }}
        </router-link>
        <span v-else>{{ crumb.name }}</span>
      </li>
    </ol>
  </nav>
</template>
<script>
export default {
  name: "ClientBreadcrumb",
  data() {
    return {
      breadcrumbs: [{ name: "ClientList", path: "/" }],
    };
  },
  watch: {
    $route() {
      this.updateBreadcrumbs();
    },
  },
  created() {
    this.updateBreadcrumbs();
  },
  methods: {
    updateBreadcrumbs() {
      if (this.$route.name === "ClientEdit") {
        this.breadcrumbs = [
          { name: "ClientList", path: "/" },
          { name: "ClientEdit", path: this.$route.path },
        ];
      } else if (this.$route.name === "ClientNew") {
        this.breadcrumbs = [
          { name: "ClientList", path: "/" },
          { name: "ClientNew", path: this.$route.path },
        ];
      } else {
        this.breadcrumbs = [{ name: "ClientList", path: "/" }];
      }
    },
  },
};
//ClientEdit is not showing the name of client currently
//not dynamic
//use meta field
</script>
<style lang="scss" scoped>
@import "../../../styles.scss";
.breadcrumb {
  display: flex;
  padding: 0;

  ol {
    padding-left: 0;
  }

  li {
    display: inline-flex;
    align-items: center;
    list-style-type: none;
  }

  &__item {
    margin-right: 8px;
    font-weight: 600;
  }

  &__item:not(:last-child)::after {
    content: ">";
    margin-left: 8px;
    color: $gray-500;
  }

  .el-icon-house {
    margin-right: 8px;
  }

  .home-separator::after {
    content: ">";
    margin-right: 8px;
    color: $gray-500;
  }
  a.router-link-exact-active,
  a.router-link-active {
    color: $blue;
  }
}
</style>
