<template>
	<el-collapse>
		<el-collapse-item :title="markdownTitle">
			<MarkdownPro :value="htmlMD" theme="dark"></MarkdownPro>
		</el-collapse-item>
	</el-collapse>
</template>

<script>
import { MarkdownPro } from "vue-meditor";
import axios from "axios";
export default {
	name: "MarkDown",
	props: {
		markdownTitle: String,
		markdownUrl: String,
	},
	components: {
		MarkdownPro,
	},
	data() {
		return {
			// markdown内容介绍
			htmlMD: "",
		};
	},
	computed: {},
	created() {},
	mounted() {
		const url = this.markdownUrl;
		axios.get(url).then((response) => {
			this.htmlMD = response.data;
		});
	},
	watch: {},
	methods: {},
};
</script>

<style lang="less" scoped>
/deep/.el-collapse-item__header {
	padding: 0 10px;
	font-size: 14px;
}
/deep/.el-collapse-item__content {
	padding: 0 16px;
}
</style>
