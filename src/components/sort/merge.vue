<template>
	<div class="select-box">
		<div class="select-info">
			<Markdown
				:markdownTitle="markdownTitle"
				:markdownUrl="markdownUrl"
			></Markdown>
		</div>
		<div class="el-main-box">
			<SortHeader
				:current="current"
				:items="items"
				:interval-i-d="intervalID"
				:interval-time="intervalTime"
				:old-arr="oldArr"
				:sort-state="sortState"
				:text-arr="textArr"
				@step="step"
				@stop="stop"
				@refresh="refresh"
				@create="create"
				@changeInterval="changeInterval"
				@finished="finished"
				@sort="sort"
			></SortHeader>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-card class="box-card" shadow="hover">
						<div slot="header">
							<span>左侧数组</span>
						</div>
						<div>
							<el-tag
								class="tagClass"
								v-for="(item, index) in aux"
								v-if="index >= current.i && index <= now.mid"
								>{{ item }}</el-tag
							>
						</div>
					</el-card>
				</el-col>
				<el-col :span="12">
					<el-card class="box-card" shadow="hover">
						<div slot="header">
							<span>右侧数组</span>
						</div>
						<div>
							<el-tag
								class="tagClass"
								v-for="(item, index) in aux"
								v-if="index >= current.j && index <= now.hi"
								:key="index"
								>{{ item }}</el-tag
							>
						</div>
					</el-card>
				</el-col>
			</el-row>
			<el-row class="sort-style">
				<el-col :span="24">
					<SortMain
						:key="menuKey"
						:current="current"
						:items="items"
						method="merge"
						:demo-tag="demoTag"
						:sort-state="sortState"
						:now="now"
					/>
				</el-col>
			</el-row>
		</div>
		<div class="el-footer-box">
			<SortFooter
				:text-arr="textArr"
				method="merge"
				:stack="stack"
				:codeDataLsit="codeDataLsit"
				@clear="clear"
			/>
		</div>
	</div>
</template>

<script>
import { less, createArr } from "../../util/util";
import SortHeader from "./modules/SortHeader";
import SortMain from "./modules/SortMain";
import SortFooter from "./modules/SortFooter";
import Markdown from "../markdown.vue";

export default {
	name: "merge",
	components: {
		SortHeader,
		SortMain,
		SortFooter,
		Markdown,
	},
	data() {
		return {
			// markdownTitle
			markdownTitle: "归并排序",
			markdownUrl: "./md/MergeSort.md",
			demoTag: [
				{ text: "未排序元素", type: "info", effect: "plain" },
				{ text: "当前归并的元素范围", type: "warning", effect: "plain" },
				{ text: "当前归并的元素", type: "danger", effect: "plain" },
			],
			menuKey: 1,
			//当前值
			current: {
				//左侧下标
				i: "",
				//右侧下标
				j: "",
				//当前下标
				k: "",
			},
			/**
			 * 排序状态
			 * 0:未排序
			 * 1:开始排序
			 * 2:排序中
			 * 3:排序完成
			 */
			sortState: 0,
			//待排序数组
			items: [],
			//辅助数组
			aux: [],
			//未排序数组
			oldArr: [],
			//函数栈
			stack: [],
			//控制台数组
			textArr: [],
			//定时器编号
			intervalID: -1,
			//定时器速度
			intervalTime: 50,
			// 代码
			codeDataLsit: [
				`// 归并排序
				    /*
     * 将一个数组中的两个相邻有序区间合并成一个
     *
     * 参数说明:
     *     a -- 包含两个有序区间的数组
     *     start -- 第1个有序区间的起始地址。
     *     mid   -- 第1个有序区间的结束地址。也是第2个有序区间的起始地址。
     *     end   -- 第2个有序区间的结束地址。
     */
    public static void merge(int[] a, int start, int mid, int end) {
        int[] tmp = new int[end - start + 1];    // tmp是汇总2个有序区的临时区域
        int i = start;            // 第1个有序区的索引
        int j = mid + 1;        // 第2个有序区的索引
        int k = 0;                // 临时区域的索引

        while (i <= mid && j <= end) {
            if (a[i] <= a[j])
                tmp[k++] = a[i++];
            else
                tmp[k++] = a[j++];
        }

        while (i <= mid)
            tmp[k++] = a[i++];

        while (j <= end)
            tmp[k++] = a[j++];

        // 将排序后的元素，全部都整合到数组a中。
        for (i = 0; i < k; i++)
            a[start + i] = tmp[i];

        tmp = null;
    }
	
    /*
     * 对数组a做若干次合并: 数组a的总长度为len，将它分为若干个长度为gap的子数组；
     *             将"每2个相邻的子数组" 进行合并排序。
     *
     * 参数说明:
     *     a -- 待排序的数组
     *     len -- 数组的长度
     *     gap -- 子数组的长度
     */
    public static void mergeGroups(int[] a, int len, int gap) {
        int i;
        int twolen = 2 * gap;    // 两个相邻的子数组的长度

        // 将"每2个相邻的子数组" 进行合并排序。
        for (i = 0; i + 2 * gap - 1 < len; i += (2 * gap))
            merge(a, i, i + gap - 1, i + 2 * gap - 1);

        // 若 i+gap-1 < len-1，则剩余一个子数组没有配对。
        // 将该子数组合并到已排序的数组中。
        if (i + gap - 1 < len - 1)
            merge(a, i, i + gap - 1, len - 1);
    }

    /*
     * 归并排序(从下往上)
     *
     * 参数说明:
     *     a -- 待排序的数组
     */
    public static void mergeSortDown2Up(int[] a) {
        if (a == null)
            return;

        for (int n = 1; n < a.length; n *= 2)
            mergeGroups(a, a.length, n);
    }`,
			],
		};
	},
	methods: {
		sort() {
			this.intervalID = setInterval(this.step, 1000 - this.intervalTime * 10);
		},
		step: function () {
			let current = this.current;
			const length = this.items.length;
			if (length <= 0) {
				this.$message({
					message: "数组为空",
					type: "warning",
				});
				this.stop();
				return;
			}
			//判断排序状态
			if (this.sortState === 0) {
				//未排序状态
				//设置排序状态为开始排序
				this.sortState = 1;
				this.textArr.unshift("开始排序");
				this.step();
			} else if (this.sortState === 1) {
				//开始排序状态
				//获取函数栈
				this.getStack();
				//设置当前值
				this.changeCurrent();
				//设置排序状态为排序中
				this.sortState = 2;
			} else if (this.sortState === 2) {
				//排序中
				//归并当前函数栈中
				if (current.i > this.now.mid) {
					this.textArr.unshift("左侧数组用完 放右侧元素");
					this.$set(this.items, current.k++, this.aux[current.j++]);
				} else if (current.j > this.now.hi) {
					this.textArr.unshift("右侧数组用完 放左侧元素");
					this.$set(this.items, current.k++, this.aux[current.i++]);
				} else if (less(this.aux[current.i], this.aux[current.j])) {
					this.textArr.unshift("左侧元素比右侧元素小 放左侧元素");
					this.$set(this.items, current.k++, this.aux[current.i++]);
				} else {
					this.textArr.unshift("左侧元素不比右侧元素小 放右侧元素");
					this.$set(this.items, current.k++, this.aux[current.j++]);
				}
				//设置当前值
				this.changeCurrent();
			} else if (this.sortState === 3) {
				//已排序
				this.$message({
					message: "排序已经完成",
					type: "warning",
				});
				this.stop();
			}
		},
		getStack() {
			this.merge(0, this.items.length - 1);
		},
		merge(lo, hi) {
			if (lo >= hi) {
				return;
			}
			const mid = lo + Math.floor((hi - lo) / 2);
			this.stack.unshift({ lo, hi, mid });
			this.merge(mid + 1, hi);
			this.merge(lo, mid);
		},
		getStyle(index) {
			if (index === 0) {
				return "margin-top: 5px;background-color: lightsteelblue;";
			}
		},
		changeAux() {
			for (let k = this.now.lo; k <= this.now.hi; k++) {
				this.$set(this.aux, k, this.items[k]);
			}
		},
		/**
		 * 改变当前值
		 * @param flag 是否结束当前循环
		 */
		changeCurrent(flag) {
			let current = this.current;
			if (this.sortState === 1) {
				current.i = this.now.lo;
				current.j = this.now.mid + 1;
				current.k = this.now.lo;
				this.changeAux();
				//复制数组
				this.items.forEach((value, index) =>
					this.$set(this.oldArr, index, value)
				);
			} else {
				if (current.k > this.now.hi) {
					//结束当前归并
					this.stack.shift();
					if (this.stack.length > 0) {
						this.changeAux();
						current.i = this.now.lo;
						current.j = this.now.mid + 1;
						current.k = this.now.lo;
					} else {
						//排序完成
						this.textArr.unshift("排序完成");
						this.sortState = 3;
						this.current = {};
						this.stop();
					}
				}
			}
			this.menuKey++;
		},
		//创建数组
		create(imput) {
			this.refresh();
			createArr(imput, this.items);
		},
		clear() {
			this.textArr = [];
		},
		//跳过按钮点击事件
		finished() {
			this.stop();
			while (this.items.length > 0 && !this.isSort) {
				this.step();
			}
		},
		//暂停按钮
		stop() {
			clearInterval(this.intervalID);
			this.intervalID = -1;
		},
		changeInterval() {
			this.stop();
			this.sort();
		},
		refresh() {
			this.stop();
			this.clear();
			if (this.oldArr.length > 0) {
				this.oldArr.forEach((value, index) =>
					this.$set(this.items, index, value)
				);
			}
			this.current = {};
			this.sortState = 0;
			this.stack.length = 0;
			++this.menuKey;
		},
	},
	computed: {
		//是否排序完成
		isSort() {
			return this.sortState === 3;
		},
		now() {
			return this.stack[0];
		},
	},
};
</script>

<style lang="less" scoped>
.tagClass {
	margin: 10px;
}
.select-box {
	.select-info {
		/deep/.el-collapse-item__header {
			padding: 0 10px;
			font-size: 14px;
		}
		/deep/.el-collapse-item__content {
			padding: 0 16px;
		}
	}
	.el-main-box {
		margin-top: 16px;
	}
	.el-footer-box {
		// margin-top: 16px;
	}
}
</style>
