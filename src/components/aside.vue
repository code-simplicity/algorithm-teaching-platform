<template>
	<el-aside :width="isCollapse ? '60px' : '200px'" class="aside-container">
		<div @click="toggleCollapse" class="aside-collapse">
			<div v-show="isCollapse">
				<i class="el-icon-s-unfold"> </i>
				显示
			</div>
			<div v-show="!isCollapse">
				<i class="el-icon-s-fold"> </i>
				隐藏
			</div>
		</div>
		<el-menu
			class="el-menu-vertical-demo"
			:default-active="toIndex"
			background-color="#797EA0"
			text-color="#fff"
			active-text-color="#FFBC00"
			router
			:collapse="isCollapse"
		>
			<el-menu-item
				v-for="(item, index) in childrenMenuItem"
				:key="index"
				:index="item.path"
				router
			>
				<i class="icon-color" :class="item.meta.icon"></i>
				<span>{{ item.meta.title }}</span>
			</el-menu-item>
		</el-menu>
	</el-aside>
</template>

<script>
// 侧边栏
export default {
	name: "AsideLayout",
	props: {
		childrenMenuItem: {
			type: Array,
		},
	},
	data() {
		return {
			isCollapse: false, // 菜单栏收缩
			clientWidth: document.body.clientWidth, // 屏幕宽度
		};
	},
	computed: {
		toIndex() {
			// 根据路径绑定到对应的二级菜单，防止页面刷新重新跳回第一个
			return this.$route.path.split("/")[2];
		},
	},
	watch: {
		// 观察屏幕的变化，收缩菜单栏
		clientWidth(newVal) {
			this.isCollapse = newVal > 1200 ? false : true;
			this.clientWidth = newVal;
		},
	},

	mounted() {
		window.addEventListener("resize", () => {
			this.clientWidth = document.body.clientWidth;
		});
	},
	methods: {
		// 切换收缩
		toggleCollapse() {
			this.isCollapse = !this.isCollapse;
		},
	},
};
</script>

<style scoped lang="less">
.aside-container {
	border-radius: 6px;
	overflow: hidden;
	position: relative;
	display: flex;
	flex-direction: column;
	.aside-collapse {
		display: flex;

		cursor: pointer;
		font-size: 16px;
		margin-bottom: 6px;
	}
	/deep/.el-menu-vertical-demo {
		font-size: 18px;
		// text-align: center;
		.icon-color {
			color: #ffffff;
			margin-right: 16px;
			font-size: 18px;
		}
		.el-menu-item.is-active {
			background: #e4d6f5 !important;
			background: linear-gradient(to right, #425255, #555457) !important;
		}
		&:not(.el-menu--collapse) {
			width: 200px;
			min-height: 200px;
		}
	}
}
</style>
