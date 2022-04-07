<template>
	<el-container id="app" ref="app">
		<el-header class="home-header-box">
			<el-menu
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b"
				:default-active="activeMenu()"
				mode="horizontal"
				router
			>
				<el-menu-item @click="tools"
					><i class="el-icon-s-tools"></i
				></el-menu-item>
				<el-submenu index="/sort">
					<template slot="title">排序</template>
					<el-menu-item
						v-for="(item, index) in sortNavItem"
						:key="index"
						:index="item.index"
						><span slot="title">{{ item.title }}</span></el-menu-item
					>
				</el-submenu>
				<el-submenu index="/search">
					<template slot="title">查找</template>
					<el-menu-item
						v-for="(item, index) in searchNavItem"
						:index="item.index"
						:key="index"
					>
						<span slot="title">{{ item.title }}</span>
					</el-menu-item>
				</el-submenu>
			</el-menu>
		</el-header>
		<el-main class="home-main-box" ref="main">
			<transition name="slide-fade" mode="out-in">
				<router-view :key="key" />
			</transition>
		</el-main>
		<el-drawer
			:visible.sync="drawer"
			direction="ltr"
			:with-header="false"
			:size="size"
		>
			<div class="drawer-container">
				<div>
					<h3 class="drawer-title">全局设置</h3>
					<div class="drawer-item">
						<span>交换动画</span>
						<el-switch v-model="hasAnimation" class="drawer-switch" />
					</div>
				</div>
			</div>
		</el-drawer>
	</el-container>
</template>
<script>
export default {
	name: "home",
	data() {
		return {
			drawer: false,
			size: "300",
			// 排序菜单
			sortNavItem: [],
			// 查找菜单
			searchNavItem: [],
		};
	},
	methods: {
		activeMenu() {
			return this.$route.path;
		},
		tools() {
			this.drawer = true;
		},
	},
	mounted() {
		// 获取菜单
		this.sortNavItem = require("@/json/sortNavItem.json");
		this.searchNavItem = require("@/json/searchNavItem.json");
		// //获取浏览器高度
		// const mainHeight = document.documentElement.clientHeight;
		// this.$refs.main.$el.style.height = mainHeight - 90 + "px";
		// //获取页面宽度
		// const mainWidth = this.$refs.main.$el.clientWidth;
		// if (mainWidth >= 1920) {
		// 	this.$store.dispatch("changeState", { key: "size", val: "xl" });
		// } else if (mainWidth < 1920 && mainWidth >= 1200) {
		// 	this.$store.dispatch("changeState", { key: "size", val: "lg" });
		// } else if (mainWidth < 1200 && mainWidth >= 992) {
		// 	this.$store.dispatch("changeState", { key: "size", val: "md" });
		// } else if (mainWidth < 992 && mainWidth >= 768) {
		// 	this.$store.dispatch("changeState", { key: "size", val: "sm" });
		// } else if (mainWidth < 768) {
		// 	this.$store.dispatch("changeState", { key: "size", val: "xs" });
		// }
		//计算每行会有几个元素
		this.$store.dispatch("changeState", {
			key: "lineNum",
			val: Math.floor((mainWidth - 80) / 65),
		});
	},
	computed: {
		key() {
			return this.$route.path;
		},
		hasAnimation: {
			get() {
				return this.$store.state.hasAnimation;
			},
			set(val) {
				this.$store.dispatch("changeState", { key: "hasAnimation", val });
			},
		},
	},
};
</script>

<style lang="less" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
	transition: all 0.5s ease;
}
.slide-fade-leave-active {
	transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
	transform: translateX(10px);
	opacity: 0;
}
@font-face {
	font-family: "iconfont"; /* project id 2047640 */
	src: url("//at.alicdn.com/t/font_2047640_aq84d5tg0s4.eot");
	src: url("//at.alicdn.com/t/font_2047640_aq84d5tg0s4.eot?#iefix")
			format("embedded-opentype"),
		url("//at.alicdn.com/t/font_2047640_aq84d5tg0s4.woff2") format("woff2"),
		url("//at.alicdn.com/t/font_2047640_aq84d5tg0s4.woff") format("woff"),
		url("//at.alicdn.com/t/font_2047640_aq84d5tg0s4.ttf") format("truetype"),
		url("//at.alicdn.com/t/font_2047640_aq84d5tg0s4.svg#iconfont") format("svg");
}
.iconfont {
	font-family: "iconfont" !important;
	font-size: 25px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}
.drawer-container {
	padding: 24px;
	font-size: 14px;
	line-height: 1.5;
	word-wrap: break-word;
}
.drawer-title {
	margin-bottom: 12px;
	color: rgba(0, 0, 0, 0.85);
	font-size: 14px;
	line-height: 22px;
}

.drawer-item {
	color: rgba(0, 0, 0, 0.65);
	font-size: 14px;
	padding: 12px 0;
}

.drawer-switch {
	float: right;
}
.home-header-box {
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
}
.home-main-box {
	margin-top: 60px;
}
</style>
