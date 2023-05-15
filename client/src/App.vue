<template>
  <div class="page-wrapper">
    <div id="app">
      <ClientBreadcrumb />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ClientBreadcrumb from "./components/clients/ClientBreadcrumb/ClientBreadcrumb.vue";
export default {
  name: "App",
  components: { ClientBreadcrumb },
};
</script>

<style lang="scss">
@import "./styles.scss";

body {
  background-color: $blue-100;
  min-height: 100vh;
}
.page-wrapper {
  margin: 0 100px 60px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 1200px;
  margin: auto;
}

//global component styling

.el-input__suffix {
  background-color: $blue;
  color: $white;
  border-radius: 4px;
  margin-right: -4px;
  padding-left: 5px;
  padding-right: 5px;
}

.el-table th.el-table__cell {
  background-color: $blue;
  color: $white;
}
</style>
