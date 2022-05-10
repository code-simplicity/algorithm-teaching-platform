# 二叉搜索树

## 说明

二叉搜索树，是指一棵空树或者具有下列性质的二叉树：

- 若任意节点的左子树不空，则左子树上所有节点的值均小于它的根节点的值；
- 若任意节点的右子树不空，则右子树上所有节点的值均大于它的根节点的值；
- 任意节点的左，右子树也分别为二叉搜索树；
- 没有键值相等的节点。

## 创建二叉搜索树

现有序列：A = {61, 87, 59, 47, 35, 73, 51, 98, 37, 93}。根据此序列构造二叉搜索树过程如下：

- i = 0，A[0] = 61，节点61作为根节点；
- i = 1，A[1] = 87，87 > 61，且节点61右孩子为空，故81为61节点的右孩子；
- i = 2，A[2] = 59，59 < 61，且节点61左孩子为空，故59为61节点的左孩子；
- i = 3，A[3] = 47，47 < 59，且节点59左孩子为空，故47为59节点的左孩子；
- i = 4，A[4] = 35，35 < 47，且节点47左孩子为空，故35为47节点的左孩子；
- i = 5，A[5] = 73，73 < 87，且节点87左孩子为空，故73为87节点的左孩子；
- i = 6，A[6] = 51，47 < 51，且节点47右孩子为空，故51为47节点的右孩子；
- i = 7，A[7] = 98，98 < 87，且节点87右孩子为空，故98为87节点的右孩子；
- i = 8，A[8] = 93，93 < 98，且节点98左孩子为空，故93为98节点的左孩子；

创建完毕后如下图中的二叉搜索树：

![二叉搜索树](https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/algorithm-teaching-platform/BST-1.png)

## 构造复杂度

二叉搜索树的构造过程，也就是将节点不断插入到树中适当位置的过程。该操作过程，与查询节点元素的操作基本相同，不同之处在于：

- 查询节点过程是，比较元素值是否相等，相等则返回，不相等则判断大小情况，迭代查询左、右子树，直到找到相等的元素，或子节点为空，返回节点不存在
- 插入节点的过程是，比较元素值是否相等，相等则返回，表示已存在，不相等则判断大小情况，迭代查询左、右子树，直到找到相等的元素，或子节点为空，则将节点插入该空节点位置。
- 
由此可知，单个节点的构造复杂度和查询复杂度相同。

使用二叉搜索树可以提高查找效率，其平均时间复杂度为O(log2n)。

## 方法

### 插入

#### 插入流程

- 先检测该元素是否在树中已经存在。如果已经存在，则不进行插入；
- 若元素不存在，则进行查找过程，并将元素插入在查找结束的位置。

![二叉搜索树](https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/algorithm-teaching-platform/BST-2.png)

### 删除

二叉搜索树的节点删除包括两个过程，查找和删除。查询的过程和查询复杂度已知， 这里说明一下删除节点的过程。

## 总结

二叉搜索树的节点查询、构造和删除性能，与树的高度相关，如果二叉搜索树能够更“平衡”一些，避免了树结构向线性结构的倾斜，则能够显著降低时间复杂度。二叉搜索树的存储方面，相对于线性结构只需要保存元素值，树中节点需要额外的空间保存节点之间的父子关系，所以在存储消耗上要高于线性结构。

## 代码实现

```java
public class BinarySearchTree {
    static class TreeNode {
        int val;
        TreeNode left, right;

        public TreeNode(int val) {
            this.val = val;
        }
    }

    public TreeNode root;

    public BinarySearchTree(int val) {
        root = new TreeNode(val);
    }

    public static void main(String[] args) {
        int[] arr = new int[10];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = (int) (Math.random() * 100);
        }
        BinarySearchTree bst = new BinarySearchTree(arr[0]);
        for (int i = 1; i < arr.length; i++) {
            bst.insert(arr[i]);
        }
        System.out.println("原始数组：\n" + Arrays.toString(arr));
        System.out.println("BST的中序遍历：");
        BinarySearchTree.inner(bst.root);
        bst.delete(arr[0]);
        System.out.println();
        System.out.println("删除节点" + arr[0] + "后BST的中序遍历：");
        BinarySearchTree.inner(bst.root);
    }

    /**
     * 二叉树的中序遍历
     *
     * @param root 根节点
     */
    public static void inner(TreeNode root) {
        if (root != null) {
            inner(root.left);
            System.out.print(root.val + " ");
            inner(root.right);
        }
    }

    /**
     * 查找
     *
     * @param key 关键字
     * @return
     */
    public boolean find(int key) {
        for (TreeNode node = root;
             node != null;
             node = node.val > key ? node.left : node.right) {
            if (node.val == key) {
                return true;
            }
        }
        return false;
    }

    /**
     * 插入
     *
     * @param val 要插入的节点值
     */
    public void insert(int val) {
        for (TreeNode node = root; ; ) {
            if (node.val > val) {
                if (node.left == null) {
                    node.left = new TreeNode(val);
                    return;
                }
                node = node.left;
            } else {
                if (node.right == null) {
                    node.right = new TreeNode(val);
                    return;
                }
                node = node.right;
            }
        }
    }

    /**
     * 删除
     *
     * @param key 关键字
     */
    public void delete(int key) {
        for (TreeNode node = root, pa = null;
             node != null;
             pa = node, node = node.val > key ? node.left : node.right) {
            if (node.val == key) { // 找到要删除的节点
                if (node.left == null) {
                    if (node.right == null) { // 无孩子节点
                        if (pa == null) { //BST只有一个节点根节点
                            root = null;
                        } else if (pa.left == node) {
                            pa.left = null;
                        } else {
                            pa.right = null;
                        }
                    } else { // 有右子节点
                        if (pa == null) { // 根节点
                            root = root.right;
                        } else if (pa.left == node) {
                            pa.left = node.right;
                        } else {
                            pa.right = node.right;
                        }
                    }
                } else {
                    if (node.right == null) { // 有左子节点
                        if (pa == null) {
                            root = root.left;
                        } else if (pa.left == node) {
                            pa.left = node.left;
                        } else {
                            pa.right = node.left;
                        }
                    } else { // 左右子节点都有
                        // 找前驱
                        TreeNode pre, p1;
                        for (pre = node.left, p1 = null;
                             pre.right != null;
                             p1 = pre, pre = pre.right)
                            ;
                        node.val = pre.val;
                        if (p1 != null) {
                            p1.right = pre.left;
                        } else {
                            node.left = pre.left;
                        }
                        // 找后继
                        /*TreeNode next, p2;
                        for (next = node.right, p2 = null;
                             next.left != null;
                             p2 = next,next = next.left);
                        node.val = next.val;
                        if (p2 != null) {
                            p2.left = next.right;
                        }else {
                            node.right = next.right;
                        }*/
                    }
                }
                return;
            }
        }
    }
}
```