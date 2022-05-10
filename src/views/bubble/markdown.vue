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
	name: "BubbleMarkdown",
	props: {},
	components: {
		Markdown,
	},
	data() {
		return {
			markdownTitle: "冒泡排序",
			markdownUrl: "./md/BubbleSort.md",
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
