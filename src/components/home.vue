<template>
	<el-container id="app" ref="app">
		<el-header class="home-header-box" ref="headerRef">
			<el-menu
				background-color="#fff"
				text-color="#000"
				active-text-color="#0034ff"
				mode="horizontal"
				:default-active="toIndex"
				@select="handleSelect"
			>
				<el-menu-item @click="tools"
					><i class="el-icon-s-tools"></i
				></el-menu-item>

				<!-- 菜单列表 -->
				<el-menu-item
					v-show="!isDropDownShow"
					v-for="(item, index) in sortNavItem"
					:key="index"
					:index="item.path"
				>
					<template slot="title">
						<i :class="item.meta.icon"></i>
						<span>{{ item.meta.title }}</span>
					</template>
				</el-menu-item>
				<!-- 下拉菜单 -->
				<el-submenu v-show="isDropDownShow" index="">
					<template slot="title">{{ subMenuTitle }}</template>
					<el-menu-item
						v-for="(item, index) in sortNavItem"
						:key="index"
						:index="item.path"
					>
						<template slot="title">
							<i :class="item.meta.icon"></i>
							<span>{{ item.meta.title }}</span>
						</template>
					</el-menu-item>
				</el-submenu>
			</el-menu>
		</el-header>
		<el-container>
			<el-main class="home-main-box" ref="main">
				<transition name="slide-fade" mode="out-in">
					<keep-alive :exclude="['Heap']">
						<router-view :key="key" />
					</keep-alive>
				</transition>
			</el-main>
		</el-container>

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
	components: {},
	data() {
		return {
			drawer: false,
			size: "300",
			// 排序菜单
			sortNavItem: [],
			// 获取屏幕的宽度，进行判断
			windowWidth: document.body.clientWidth,
			// 默认title
			subMenuTitle: "冒泡排序",
		};
	},
	methods: {
		tools() {
			this.drawer = true;
		},
		handleSelect(path) {
			// 切换菜单栏
			this.$router.push({
				path: path,
			});
			// 通过控制选择切换title
			// 首先就是对菜单进行遍历，然后找到对应的值
			this.sortNavItem.forEach((item) => {
				if (item.path === path) {
					this.subMenuTitle = item.meta.title;
				}
			});
		},
		// 监听屏幕宽度的变化
		windowWidthChange() {
			this.windowWidth = document.body.clientWidth;
			if (this.windowWidth > 1200) {
				this.$store.dispatch("changeDropDownShow", false);
			} else {
				this.$store.dispatch("changeDropDownShow", true);
			}
		},
	},
	watch: {
		// 观察屏幕宽度的变化,使得值变化
		windowWidth(newVal) {
			this.windowWidth = newVal;
		},
	},
	mounted() {
		// 获取菜单
		this.sortNavItem = this.$router.options.routes[1].children;
		// 使用该方法解决屏幕宽度路由切换不响应的bug
		window.addEventListener("resize", () => {
			this.windowWidthChange();
		});
		// 获取页面宽度
		const mainWidth = this.$refs.main.$el.clientWidth;
		//计算每行会有几个元素
		this.$store.dispatch("changeState", {
			key: "lineNum",
			val: Math.floor((mainWidth - 80) / 65),
		});
	},
	computed: {
		// 获取dom,定位位置
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
		toIndex() {
			// 根据路径绑定到对应的一级菜单，防止页面刷新重新跳回第一个
			return "/" + this.$route.path.split("/")[1];
		},
		isDropDownShow() {
			return this.$store.state.dropDownShow;
		},
	},
};
</script>

<style lang="less" scoped>
#app {
	.home-header-box {
		width: 100%;
		z-index: 999;
		.el-menu-item.is-active {
		}
	}
	.home-main-box {
		position: absolute;
		top: 60px;
		bottom: 0;
		left: 0px;
		right: 0px;
		overflow: auto;
	}
	.drawer-container {
		padding: 24px;
		font-size: 14px;
		line-height: 1.5;
		word-wrap: break-word;

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
			.drawer-switch {
				float: right;
			}
		}
	}
}
</style>
