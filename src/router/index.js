import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/employees',
    name: 'employees',
    component: () => import(/* webpackChunkName: "employees" */ '../views/EmployeesView.vue'),
  },
  {
    path: '/employees/:id',
    name: 'employee-detail',
    component: () => import(/* webpackChunkName: "employee-detail" */ '../views/EmployeeDetailView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
