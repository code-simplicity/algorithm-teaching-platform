<!--
 * @Author: bugdr
 * @Date: 2022-04-09 14:01:10
 * @LastEditors: bugdr
 * @LastEditTime: 2022-04-09 15:26:23
 * @FilePath: \algorithm-teaching-platform\public\md\QuickSort.md
 * @Description: 快速排序
-->
# 快速排序

快速排序(Quick Sort)使用分治法算法思想。

## 介绍

`快速排序`的基本思想就是选择一个基准数，通过一趟排序将要排序的数据分割成独立的两个部分，其中一部分的所有数据都比另外一部分的所有数组都要小，然后，再按照此方法对这两部分数据分别进行快速排序，整个排序过程递归进行，以此达到整个数据变成有序序列。

## 实现

- 从数列中挑选出一个基准值，
- 将所有比基准值小的摆放在基准前面，所有比基准大的摆在基本的后面（相同的数可以放到任意一边），这个分区退出之后，该基准值处于数列的中间位置。
- 递归把`基准值`前面的子数列和`基准值`后面的子数列进行排序。
  
下面以数列a={30,40,60,10,20,50}为例，演示它的快速排序过程(如下图)。

![快速排序](https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/algorithm-teaching-platform/sort-quick-1.jpg)

上图只是给出了第1趟快速排序的流程。在第1趟中，设置x=a[i]，即x=30。

- 从"右 --> 左"查找小于x的数: 找到满足条件的数a[j]=20，此时j=4；然后将a[j]赋值a[i]，此时i=0；接着从左往右遍历。
- 从"左 --> 右"查找大于x的数: 找到满足条件的数a[i]=40，此时i=1；然后将a[i]赋值a[j]，此时j=4；接着从右往左遍历。
- 从"右 --> 左"查找小于x的数: 找到满足条件的数a[j]=10，此时j=3；然后将a[j]赋值a[i]，此时i=1；接着从左往右遍历。
- 从"左 --> 右"查找大于x的数: 找到满足条件的数a[i]=60，此时i=2；然后将a[i]赋值a[j]，此时j=3；接着从右往左遍历。
- 从"右 --> 左"查找小于x的数: 没有找到满足条件的数。当i>=j时，停止查找；然后将x赋值给a[i]。此趟遍历结束！

按照同样的方法，对子数列进行递归遍历。最后得到有序数组！

## 时间复杂度和稳定性

### 时间复杂度

`快速排序的时间复杂度在最坏情况下是O(N2)，平均的时间复杂度是O(N*lgN)`

这句话很好理解: 假设被排序的数列中有N个数。遍历一次的时间复杂度是O(N)，需要遍历多少次呢? 至少lg(N+1)次，最多N次。

### 稳定性

快速排序是不稳定的算法，它不满足稳定算法的定义。

## 代码实现

```java
public class QuickSort {
    /*
     * 快速排序
     *
     * 参数说明:
     *     a -- 待排序的数组
     *     l -- 数组的左边界(例如，从起始位置开始排序，则l=0)
     *     r -- 数组的右边界(例如，排序截至到数组末尾，则r=a.length-1)
     */
    public static void quickSort(int[] a, int l, int r) {

        if (l < r) {
            int i, j, x;

            i = l;
            j = r;
            x = a[i];
            while (i < j) {
                while (i < j && a[j] > x)
                    j--; // 从右向左找第一个小于x的数
                if (i < j)
                    a[i++] = a[j];
                while (i < j && a[i] < x)
                    i++; // 从左向右找第一个大于x的数
                if (i < j)
                    a[j--] = a[i];
            }
            a[i] = x;
            quickSort(a, l, i - 1); /* 递归调用 */
            quickSort(a, i + 1, r); /* 递归调用 */
        }
    }

    public static void main(String[] args) {
        int i;
        int a[] = {30, 40, 60, 10, 20, 50};

        System.out.printf("before sort:");
        for (i = 0; i < a.length; i++)
            System.out.printf("%d ", a[i]);
        System.out.printf("\n");

        quickSort(a, 0, a.length - 1);

        System.out.printf("after  sort:");
        for (i = 0; i < a.length; i++)
            System.out.printf("%d ", a[i]);
        System.out.printf("\n");
    }
}
```