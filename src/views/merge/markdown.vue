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
	name: "MergeMarkdown",
	props: {},
	components: {
		Markdown,
	},
	data() {
		return {
			markdownTitle: "归并排序",
			markdownUrl: "./md/MergeSort.md",
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
