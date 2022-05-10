<template>
	<el-row :gutter="20">
		<el-col :xs="24" :sm="24" :md="getSpan()" :lg="getSpan()" :xl="getSpan()">
			<el-card class="box-card" shadow="always">
				<div slot="header" style="text-align: center">
					<span>控制台</span>
					<el-button
						style="float: right"
						type="danger"
						icon="el-icon-delete"
						@click="clear"
						size="small"
						circle
					></el-button>
				</div>
				<div class="consoleDiv" style="text-align: left">
					<el-row v-if="method === 'select'">
						<el-col :span="8"
							><el-tag effect="dark" type="success"
								>i{{ current.outside }}</el-tag
							></el-col
						>
						<el-col :span="8"
							><el-tag effect="dark" type="info"
								>min{{ current.min }}</el-tag
							></el-col
						>
						<el-col :span="8"
							><el-tag effect="dark" type="danger"
								>j{{ current.inner }}</el-tag
							></el-col
						>
					</el-row>
					<el-row v-else-if="method === 'insert'">
						<el-col :span="12"
							><el-tag effect="dark" type="success"
								>i{{ current.outside }}</el-tag
							></el-col
						>
						<el-col :span="12"
							><el-tag effect="dark" type="info"
								>j{{ current.inner }}</el-tag
							></el-col
						>
					</el-row>
					<el-row v-else-if="method === 'shell'">
						<el-col :span="6"
							><el-tag effect="dark" type="success"
								>N{{ current.N }}</el-tag
							></el-col
						>
						<el-col :span="6"
							><el-tag effect="dark" type="info"
								>h{{ current.h }}</el-tag
							></el-col
						>
						<el-col :span="6"
							><el-tag effect="dark" type="danger"
								>i{{ current.outside }}</el-tag
							></el-col
						>
						<el-col :span="6"
							><el-tag effect="dark" type="success"
								>j{{ current.inner }}</el-tag
							></el-col
						>
					</el-row>
					<div v-for="(text, index) in textArr" :key="index">
						<el-link :underline="false" type="primary">{{ text }}</el-link>
					</div>
				</div>
			</el-card>
		</el-col>
		<el-col :xs="24" :sm="24" :md="getSpan()" :lg="getSpan()" :xl="getSpan()">
			<el-card class="box-card" shadow="always">
				<div slot="header" style="text-align: center">
					<span>代码区域</span>
				</div>
				<div class="consoleDiv">
					<codemirror
						ref="codeRef1"
						v-model="codeData"
						:options="option"
						class="codemirror-container"
					></codemirror>
				</div>
			</el-card>
		</el-col>
		<el-col
			:xs="24"
			:sm="24"
			:md="getSpan()"
			:lg="getSpan()"
			:xl="getSpan()"
			v-if="method === 'quick'"
		>
			<el-card class="box-card" shadow="hover">
				<div slot="header" style="text-align: center">
					<span>函数栈</span>
				</div>
				<div class="consoleDiv">
					<el-row>
						<el-col :span="8">
							<el-tag type="danger">lo</el-tag>
						</el-col>
						<el-col :span="8">
							<el-tag type="danger">j</el-tag>
						</el-col>
						<el-col :span="8">
							<el-tag type="danger">hi</el-tag>
						</el-col>
					</el-row>
					<el-row v-for="(args, index) in stack" :style="getStyle(index)">
						<el-col :span="8">
							<el-tag>{{ args.lo }}</el-tag>
						</el-col>
						<el-col :span="8">
							<el-tag>{{ args.j }}</el-tag>
						</el-col>
						<el-col :span="8">
							<el-tag>{{ args.hi }}</el-tag>
						</el-col>
					</el-row>
				</div>
			</el-card>
		</el-col>
		<el-col
			:xs="24"
			:sm="24"
			:md="getSpan()"
			:lg="getSpan()"
			:xl="getSpan()"
			v-if="method === 'merge'"
		>
			<el-card class="box-card" shadow="hover">
				<div slot="header" style="text-align: center">
					<span>函数栈</span>
				</div>
				<div class="consoleDiv">
					<el-row>
						<el-col :span="8">
							<el-tag type="danger">lo</el-tag>
						</el-col>
						<el-col :span="8">
							<el-tag type="danger">mid</el-tag>
						</el-col>
						<el-col :span="8">
							<el-tag type="danger">hi</el-tag>
						</el-col>
					</el-row>
					<el-row v-for="(args, index) in stack" :style="getStyle(index)">
						<el-col :span="8">
							<el-tag>{{ args.lo }}</el-tag>
						</el-col>
						<el-col :span="8">
							<el-tag>{{ args.mid }}</el-tag>
						</el-col>
						<el-col :span="8">
							<el-tag>{{ args.hi }}</el-tag>
						</el-col>
					</el-row>
				</div>
			</el-card>
		</el-col>
		<el-col
			:xs="24"
			:sm="24"
			:md="getSpan()"
			:lg="getSpan()"
			:xl="getSpan()"
			v-if="method === 'quick3way'"
		>
			<el-card class="box-card" shadow="hover">
				<div slot="header" style="text-align: center">
					<span>函数栈</span>
				</div>
				<div class="consoleDiv">
					<el-row>
						<el-col :span="6">
							<el-tag type="danger">lo</el-tag>
						</el-col>
						<el-col :span="6">
							<el-tag type="danger">lt</el-tag>
						</el-col>
						<el-col :span="6">
							<el-tag type="danger">gt</el-tag>
						</el-col>
						<el-col :span="6">
							<el-tag type="danger">hi</el-tag>
						</el-col>
					</el-row>
					<el-row v-for="(args, index) in stack" :style="getStyle(index)">
						<el-col :span="6">
							<el-tag>{{ args.lo }}</el-tag>
						</el-col>
						<el-col :span="6">
							<el-tag>{{ args.lt }}</el-tag>
						</el-col>
						<el-col :span="6">
							<el-tag>{{ args.gt }}</el-tag>
						</el-col>
						<el-col :span="6">
							<el-tag>{{ args.hi }}</el-tag>
						</el-col>
					</el-row>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/theme/dracula.css";
require("codemirror/mode/clike/clike.js");
require("codemirror/addon/selection/active-line.js");
export default {
	name: "SortFooter",
	props: {
		textArr: Array,
		stack: Array,
		method: String,
		line: Number,
		current: Object,
		codeDataList: Array,
	},
	components: {
		codemirror,
	},
	data() {
		return {
			codeData: "",
			option: {
				mode: "text/x-java",
				styleActiveLine: true,
				lineNumbers: true,
				lineWrapping: true,
				readOnly: true,
				theme: "dracula",
			},
		};
	},
	created() {
		this.codeData = this.codeDataList[0];
	},
	methods: {
		clear() {
			this.$emit("clear");
		},
		getSpan() {
			if (
				this.method === "quick" ||
				this.method === "quick3way" ||
				this.method === "merge"
			) {
				return 8;
			}
			return 12;
		},
		getStyle(index) {
			if (index === 0) {
				return "margin-top: 5px;background-color: lightsteelblue;";
			}
		},
		getType(index) {
			if (index === Math.floor(this.line)) {
				return "primary";
			} else {
				return "";
			}
		},
		getType2(index) {
			if (index === this.line) {
				return "danger";
			} else {
				return "";
			}
		},
		getClass(index) {
			if (index === this.line) {
				return "lineSelected";
			} else {
				return "";
			}
		},
	},
};
</script>

<style lang="less" scoped>
.lineSelected {
	font-size: 16px;
	padding: 5px;
}
.box-card {
	margin: 0 0 10px 0;
	.consoleDiv {
		height: 240px;
		overflow: auto;
		position: relative;
		.codemirror-container {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			overflow-y: scroll;
			height: 240px;
		}
	}
}
</style>
