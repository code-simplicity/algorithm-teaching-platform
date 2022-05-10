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
	name: "HeapMarkdown",
	props: {},
	components: {
		Markdown,
	},
	data() {
		return {
			// markdownTitle
			markdownTitle: "堆排序",
			markdownUrl: "./md/HeapSort.md",
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
