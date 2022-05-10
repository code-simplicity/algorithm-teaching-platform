// 路由的注册
import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
Vue.use(VueRouter);

// 递归读取路由
let pages = {};
const modules = require.context("./modules/", true, /\.js$/);
modules.keys().forEach((key) => {
	pages[key.replace(/(\.\/|\.js)/g, "")] = modules(key).default;
});
let routeModuleList = [];
Object.keys(pages).forEach((item) => {
	routeModuleList.push({
		path: pages[item].path,
		name: pages[item].name,
		meta: pages[item].meta,
		redirect: pages[item].redirect,
		children: pages[item].children,
		component: pages[item].component,
	});
});
const routes = [
	{
		path: "/login",
		name: "login",
		meta: {
			title: "登录",
		},
		component: () => import("../views/login/index.vue"),
	},
	{
		path: "/",
		redirect: "/bubble", //设置默认指向的路径（重定向到冒泡排序）
		component: () => import("../components/home.vue"),
		meta: {
			title: "选择排序",
			icon: "el-icon-document-copy",
		},
		// 二级路由
		children: [...routeModuleList],
	},
];
let router = new VueRouter({
	routes,
});

router.beforeEach((to, from, next) => {
	NProgress.start();
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title + "-动画算法";
	}
	next();
});
router.afterEach(() => {
	NProgress.done();
});

export default router;
