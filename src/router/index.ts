import Vue from 'vue';
import Auth from '@okta/okta-vue';
import VueRouter, { RouteConfig, Route } from 'vue-router';
import Home from '../views/Home.vue';

import GenericRouterView from '@/views/GenericRouterView.vue';

import Login from '../views/Auth/Login.vue';
import Register from '../views/Auth/Register.vue';

import Albums from '../views/albums/Albums.vue';
import MyAlbumList from '../views/albums/MyAlbumList.vue';
import ViewAlbum from '../views/albums/ViewAlbum.vue';
import ViewPhoto from '../views/photos/ViewPhoto.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/implicit/callback',
    component: Auth.handleCallback()
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
    meta: { hideNavBar: true }
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: { hideNavBar: true }
  },
  {
    name: 'Albums',
    path: '/albums',
    component: Albums,
    meta: { requiresAuth: true },
    children: [
      { path: 'mine', component: MyAlbumList, meta: { requiresAuth: true } },
      { path: ':albumId', name: 'viewAlbum', component: ViewAlbum }
    ]
  },
  {
    name: 'Photos',
    path: '/photos',
    component: GenericRouterView, // TODO: change to a diff component
    children: [
      { path: 'view/:photoId', name: 'viewPhoto', component: ViewPhoto }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { requiresAuth: true }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active'
});

const onAuthRequired = async (from: Route, to: Route, next: any) => {
  if (from.matched.some((record) => record.meta.requiresAuth) && !(await Vue.prototype.$auth.isAuthenticated())) {
    next({ name: 'login' }); // TODO: Add returnUrl
  } else {
    next();
  }
};

router.beforeEach(onAuthRequired);

export default router;
