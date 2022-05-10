<template>
	<div class="flex">
		<div class="margin-right-20">
			<el-row>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<AsideLayout :childrenMenuItem="childrenMenuItem"></AsideLayout>
				</el-col>
			</el-row>
		</div>
		<div class="flex-layout">
			<el-row>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<router-view></router-view>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import AsideLayout from "../../components/aside.vue";

export default {
	props: {},
	components: {
		AsideLayout,
	},
	data() {
		return {
			childrenMenuItem: [
				{
					path: "selection-markdown",
					name: "SelectionMarkdown",
					meta: {
						title: "内容介绍",
						icon: "el-icon-document",
					},
				},
				{
					path: "selection-video",
					name: "SelectionVideo",

					meta: {
						title: "视频教学",
						icon: "el-icon-video-camera",
					},
				},
				{
					path: "selection-animation",
					name: "SelectionAnimation",

					meta: {
						title: "动画演示",
						icon: "el-icon-rank",
					},
				},
			],
		};
	},
	computed: {},
	created() {},
	mounted() {},
	watch: {},
	methods: {},
};
</script>

<style scoped lang="scss"></style>
