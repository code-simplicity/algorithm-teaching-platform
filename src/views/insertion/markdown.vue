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
	name: "InsertMarkdown",
	props: {},
	components: {
		Markdown,
	},
	data() {
		return {
			markdownTitle: "插入排序",
			markdownUrl: "./md/InsertionSort.md",
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
