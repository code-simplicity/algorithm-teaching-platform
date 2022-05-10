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
	name: "Heap",
	props: {},
	components: {
		AsideLayout,
	},
	data() {
		return {
			childrenMenuItem: [
				{
					path: "heap-markdown",
					name: "HeapMarkdown",
					meta: {
						title: "内容介绍",
						icon: "el-icon-document",
					},
				},
				{
					path: "heap-video",
					name: "HeapVideo",
					meta: {
						title: "视频教学",
						icon: "el-icon-video-camera",
					},
				},
				{
					path: "heap-animation",
					name: "HeapAnimation",
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

<style scoped lang="less"></style>
