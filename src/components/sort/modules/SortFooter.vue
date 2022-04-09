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
					<div class="code-mirror-style">
						<codemirror
							ref="codeRef1"
							v-model="codeData"
							:options="option"
						></codemirror>
					</div>

					<!-- <code v-if="method === 'select'">
						<pre>
<el-link :type="getType(1)" :class="getClass(1)" :underline="false">for(<el-link :type="getType2(1.1)" :underline="false">int i = 0;</el-link><el-link :type="getType2(1.2)" :underline="false">i < arr.size();</el-link> <el-link :type="getType2(1.3)" :underline="false">i++</el-link>){</el-link>
  <el-link :type="getType(2)" :class="getClass(2)" :underline="false">int min = i;</el-link>
  <el-link :type="getType(3)" :class="getClass(3)" :underline="false">for(<el-link :type="getType2(3.1)" :underline="false">int j = i + 1;</el-link> <el-link :type="getType2(3.2)" :underline="false">j < arr.size();</el-link> <el-link :type="getType2(3.3)" :underline="false">j++</el-link>){</el-link>
    <el-link :type="getType(4)" :class="getClass(4)" :underline="false">if(less(arr[j],arr[min])</el-link>
      <el-link :type="getType(5)" :class="getClass(5)" :underline="false">min = j;</el-link>
  <el-link :underline="false">}</el-link>
  <el-link :type="getType(6)" :class="getClass(6)" :underline="false">exch(arr,i,min);</el-link>
<el-link :underline="false">}</el-link>
                </pre>
					</code> -->
					<!-- <code v-else-if="method === 'insert'">
						<pre>
<el-link :type="getType(1)" :class="getClass(1)" :underline="false">for(<el-link :type="getType2(1.1)" :underline="false">int i = 1;</el-link> <el-link :type="getType2(1.2)" :underline="false">i < arr.size();</el-link> <el-link :type="getType2(1.3)" :underline="false">i++</el-link>){</el-link>
  <el-link :type="getType(2)" :class="getClass(2)" :underline="false">for(<el-link :type="getType2(2.1)" :underline="false">int j = i;</el-link> <el-link :type="getType2(2.2)" :underline="false">j > 0</el-link> && <el-link :type="getType2(2.3)" :underline="false">less(arr[j],arr[j-1];</el-link> <el-link :type="getType2(2.4)" :underline="false">j--</el-link>)</el-link>
    <el-link :type="getType(3)" :class="getClass(3)" :underline="false">exch(arr,j,j-1);</el-link>
<el-link :underline="false">}</el-link>
                </pre>
					</code>
					<code v-else-if="method === 'shell'">
						<pre>
<el-link :type="getType(1)" :class="getClass(1)" :underline="false">int N = a.length;</el-link>
<el-link :type="getType(2)" :class="getClass(2)" :underline="false">int h = 1;</el-link>
<el-link :type="getType(3)" :class="getClass(3)" :underline="false">while(<el-link :type="getType2(3.1)" :underline="false">h < N/3</el-link>) <el-link :type="getType2(3.2)" :underline="false">h = 3*h + 1;</el-link></el-link>
<el-link :type="getType(4)" :class="getClass(4)" :underline="false">while(h >= 1) {</el-link>
  <el-link :type="getType(5)" :class="getClass(5)" :underline="false">for(<el-link :type="getType2(5.1)" :underline="false">int i = h;</el-link> <el-link :type="getType2(5.2)" :underline="false">i < N;</el-link> <el-link :type="getType2(5.3)" :underline="false">i++</el-link>){</el-link>
    <el-link :type="getType(6)" :class="getClass(6)" :underline="false">for(<el-link :type="getType2(6.1)" :underline="false">int j = i;</el-link> <el-link :type="getType2(6.2)" :underline="false">j >=h</el-link> && <el-link :type="getType2(6.3)" :underline="false">less(a[j-h],a[j]);</el-link> <el-link :type="getType2(6.4)" :underline="false">j-=h</el-link>)</el-link>
      <el-link :type="getType(7)" :class="getClass(7)" :underline="false">exch(arr,j,j-h);</el-link>
  <el-link :underline="false">}</el-link>
  <el-link :type="getType(8)" :class="getClass(8)" :underline="false">h/=3;</el-link>
<el-link :underline="false">}</el-link>
                </pre>
					</code>
					-->
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
		codeDataLsit: Array,
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
		this.codeData = this.codeDataLsit[0];
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
		// .code-mirror-style {
		// 	overflow: auto;
		// }
	}
}
</style>
