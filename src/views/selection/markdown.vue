<template>
	<div class="animation-container">
		<Markdown
			:markdownTitle="markdownTitle"
			:markdownUrl="markdownUrl"
		></Markdown>
	</div>
</template>

<script>
import Markdown from "../../components/markdown.vue";
export default {
	name: "SelectionMarkdown",
	props: {},
	components: {
		Markdown,
	},
	data() {
		return {
			markdownTitle: "选择排序-内容介绍",
			markdownUrl: "./md/SelectionSort.md",
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
