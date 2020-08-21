import Vue from "vue";
import VueRouter from "vue-router";

import Collection from '../views/Collection';
import Videos from '../views/Videos';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Collection
  },
  { 
    path: '/:releaseId',
    component: Videos,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
