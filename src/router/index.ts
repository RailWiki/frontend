import Vue from 'vue';
import Auth from '@okta/okta-vue';
import VueRouter, { RouteConfig, Route } from 'vue-router';
import Home from '../views/Home.vue';

import GenericRouterView from '@/views/GenericRouterView.vue';

import Login from '../views/Auth/Login.vue';
import Register from '../views/Auth/Register.vue';

import UserList from '../views/users/UserList.vue';
import UserProfile from '../views/users/Profile.vue';

import Albums from '../views/albums/Albums.vue';
import MyAlbumList from '../views/albums/MyAlbumList.vue';
import ViewAlbum from '../views/albums/ViewAlbum.vue';
import ViewPhoto from '../views/photos/ViewPhoto.vue';

import RoadsList from '@/views/roads/RoadList.vue';
import RoadDetails from '@/views/roads/RoadDetails.vue';

import LocomotiveList from '@/views/locomotives/LocomotiveList.vue';
import LocomotiveDetails from '@/views/locomotives/LocomotiveDetails.vue';

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
    name: 'Users',
    path: '/users',
    component: GenericRouterView,
    children: [
      { path: '', name: 'userList', component: UserList },
      { path: 'profile/:userId', name: 'userProfile', component: UserProfile }
    ]
  },
  {
    name: 'Albums',
    path: '/albums',
    component: Albums,
    meta: { requiresAuth: true },
    children: [
      { path: 'mine', component: MyAlbumList, meta: { requiresAuth: true } },
      { path: ':albumId', name: 'viewAlbum', component: ViewAlbum },
    ]
  },
  {
    name: 'Photos',
    path: '/photos',
    component: GenericRouterView, // TODO: change to a diff component
    children: [
      { path: 'view/:photoId', name: 'viewPhoto', component: ViewPhoto },
    ]
  },
  {
    name: 'roads',
    path: '/railroads',
    component: GenericRouterView,
    children: [
      { path: ':typeSlug?', name: 'roadsList', component: RoadsList },
      { path: 'view/:id', name: 'roadDetails', component: RoadDetails },
      // { path: 'details/:slug', name: 'roadDetails', component: RoadDetails },
    ]
  },
  {
    name: 'locomotives',
    path: '/locomotives',
    component: GenericRouterView,
    children: [
      { path: '', name: 'locomotiveList', component: LocomotiveList },
      { path: ':id', name: 'locomotiveDetails', component: LocomotiveDetails },
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
