# 顺序查找

顺序查找，就是从第一个元素开始，按索引顺序遍历待查找序列，直到找出给定目标或者查找失败。

## 介绍

链表中的每个结点存储一个键值对，get()的实现即为遍历链表，equals()方法比较需要被查找的键和每个结点中的键，如果匹配成功就返回相应的值，否则返回null。put()的实现也是遍历链表，用equals()方法比较需要被查找的键和每个结点中的值，如果匹配成功就用第二个参数指定的值更新和该键相关联的值，否则我们就用给定的键值对创建一个新的结点并将其插入到链表的开头。

## 实现

### put()的过程图

![链表的put过程](https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/algorithm-teaching-platform/Sequential-Search1.png)

## 复杂度

### 时间复杂度

- 查找成功时的平均查找长度为：（假设每个数据元素的概率相等） ASL = 1/n(1+2+3+…+n) = (n+1)/2;
- 当查找不成功时，需要n+1次比较，时间复杂度为O(n);

所以，`顺序查找`的时间复杂度为`O(n)`。

### 空间复杂度

空间复杂度： O(n)，1个待查序列+1个目标元素。

## 代码实现

```java
public class SequelSearch<Key, Value> {
    private Node first;

    private class Node {
        Key key;
        Value val;
        Node next;

        public Node(Key key, Value val, Node next) {
            this.key = key;
            this.val = val;
            this.next = next;
        }
    }

    /**
     * 获取链表
     *
     * @param key
     * @return
     */
    public Value get(Key key) {
        for (Node x = first; x != null; x = x.next) {
            if (key.equals(first.key)) {
                return x.val;
            }
        }
        return null;
    }

    /**
     * 添加链表的key和value
     *
     * @param key
     * @param val
     */
    public void put(Key key, Value val) {
        for (Node x = first; x != null; x = x.next) {
            if (key.equals(x.key)) {
                x.val = val;
                return;
            }
        }
        first = new Node(key, val, first);
    }
}
```