import Vue from "vue";
import ElementUI from "element-ui";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
import VueRouter from "vue-router";

import "./styles.scss";

import App from "./App.vue";
import ClientsList from "./components/clients/ClientList/ClientsList.vue";
import ClientEdit from "./components/clients/ClientEdit/ClientEdit.vue";
import ClientNew from "./components/clients/ClientNew/ClientNew.vue";

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

Vue.use(ElementUI);
Vue.use(VueApollo);
Vue.use(VueRouter);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", name: "ClientsList", component: ClientsList },
    { path: "/new", name: "ClientNew", component: ClientNew },
    {
      path: "/edit/:id",
      name: "ClientEdit",
      component: ClientEdit,
    },
  ],
});

new Vue({
  el: "#app",
  router,
  apolloProvider,
  render: (h) => h(App),
});
