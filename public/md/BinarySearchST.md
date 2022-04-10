# 链表二分查找

二分查找，即我们先将需要被查找的键与子数组的的中间键进行比较，如果被查找的键小于中间键，我们就在左子数组中继续查找，如果被查找的键大于中间键，我们就在右子数组中继续查找，如果此中间键就是我们需要查找的值，则返回它。如果没有找到（ 即lo >hi时）则会返回最接近被查找键的子数组中间键。

## 说明

- 二分查找依赖数组结构

二分查找需要利用下标随机访问元素，如果我们想使用链表等其他数据结构则无法实现二分查找。

- 二分查找针对的是有序数据

二分查找需要的数据必须是有序的。如果数据没有序，我们需要先排序，排序的时间复杂度最低是 O(nlogn)。( 本文实现里使用了put方法来实现数组初始化即有序，且是遍历实现的，复杂度明显高于普通的排序算法 )所以，如果我们针对的是一组静态的数据，没有频繁地插入、删除，我们可以进行一次排序，多次二分查找。这样排序的成本可被均摊，二分查找的边际成本就会比较低。

但是，如果我们的数据集合有频繁的插入和删除操作，要想用二分查找，要么每次插入、删除操作之后保证数据仍然有序，要么在每次二分查找之前都先进行排序。针对这种动态数据集合，无论哪种方法，维护有序的成本都是很高的。

所以，二分查找只能用在插入、删除操作不频繁，一次排序多次查找的场景中。针对动态变化的数据集合，二分查找将不再适用。

- 数据量太小不适合二分查找

如果要处理的数据量很小，完全没有必要用二分查找，顺序遍历就足够了。比如我们在一个大小为 10 的数组中查找一个元素，不管用二分查找还是顺序遍历，查找速度都差不多，只有数据量比较大的时候，二分查找的优势才会比较明显。

- 数据量太大不适合二分查找

二分查找底层依赖的是数组，数组需要的是一段连续的存储空间，所以我们的数据比较大时，比如1GB，这时候可能不太适合使用二分查找，因为我们的内存都是离散的，可能电脑没有这么多的内存。

## 实现思路

### put()方法

![二分查找](https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/algorithm-teaching-platform/Sequential-Search2.png)

### get的方法

![二分查找](https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/algorithm-teaching-platform/Sequential-Search3.png)

## 复杂度

### 时间复杂度

时间复杂度：O(lgN)级别。

### 空间复杂度

空间复杂度：O(N)级别。

## 代码实现

```java
public class BinarySearchST<Key extends Comparable<Key>, Value> {

    private Key[] keys;
    private Value[] vals;
    private int N;

    public BinarySearchST(int capacity) {
        keys = (Key[]) new Comparable[capacity];
        vals = (Value[]) new Object[capacity];
    }

    public int size() {
        return N;
    }

    public Value get(Key key) {
        if (isEmpty()) {
            return null;
        }
        int i = rank(key);
        if (i < N && keys[i].compareTo(key) == 0) {
            return vals[i];
        } else {
            return null;
        }
    }

    public boolean isEmpty() {
        return N == 0;
    }

    public int rank(Key key) {
        //这里我们可以看到在循环结束时，lo的值总是等于表中小于被查找的键的数量
        int lo = 0, hi = N - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            int cmp = key.compareTo(keys[mid]);
            if (cmp < 0) {
                hi = mid - 1;
            } else if (cmp > 0) {
                lo = mid + 1;
            } else {
                return mid;
            }
        }
        return lo;
    }

    public void put(Key key, Value val) {
        //此put方法使数组初始化完毕后是以key值为依据有序的
        //这里rank()返回的是小于key键的数量
        int i = rank(key);
        if (i < N && keys[i].compareTo(key) == 0) {
            vals[i] = val;
            return;
        }
        for (int j = N; j > i; j--) {
            //在这里把比key大的键都向后移动一位
            keys[j] = keys[j - 1];
            vals[j] = vals[j - 1];
        }
        //插入key键
        keys[i] = key;
        vals[i] = val;
        N++;
        assert check();
    }

    /**
     * Exercise 3.1.16
     *
     * @param key
     */
    public void delete(Key key) {
        if (isEmpty()) {
            return;
        }
        int i = rank(key);
        if (i < N && keys[i].compareTo(key) == 0) {
            for (int j = i; j < N - 1; j++) {
                keys[j] = keys[j + 1];
                vals[j] = vals[j + 1];
            }
            N--;
            keys[N] = null;
            vals[N] = null;
        }
        assert check();
    }

    public Key min() {
        return keys[0];
    }

    public Key max() {
        return keys[N - 1];
    }

    public Key select(int k) {
        return keys[k];
    }

    public Key ceiling(Key key) {
        int i = rank(key);
        return keys[i];
    }

    /**
     * Exercise 3.1.17
     *
     * @param key
     * @return
     */
    public Key floor(Key key) {
        int i = rank(key);
        if (i < N) {
            if (keys[i].compareTo(key) == 0) {
                return key;
            } else if (i > 0) {
                return keys[i - 1];
            }
        }
        return null;
    }

    public Iterable<Key> keys(Key lo, Key hi) {
        Queue<Key> q = new Queue<Key>();
        for (int i = rank(lo); i < rank(hi); i++) {
            q.enqueue(keys[i]);
        }
        if (contains(hi)) {
            q.enqueue(keys[rank(hi)]);
        }
        return (Iterable<Key>) q;
    }

    public boolean contains(Key key) {
        return get(key) != null;
    }

    // Add for Exercise 3.1.29
    public Iterable<Key> keys() {
        return keys(min(), max());
    }

    public void deleteMin() {
        delete(min());
    }

    public void deleteMax() {
        delete(max());
    }

    // Exercise 3.1.30
    private boolean check() {
        return isSorted() && rankCheck();
    }

    private boolean isSorted() {
        for (int i = 1; i < size(); i++) {
            if (keys[i].compareTo(keys[i - 1]) < 0) {
                return false;
            }
        }
        return true;
    }

    private boolean rankCheck() {
        for (int i = 0; i < size(); i++) {
            if (i != rank(select(i))) {
                return false;
            }
        }
        for (int i = 0; i < size(); i++) {
            if (keys[i].compareTo(select(rank(keys[i]))) != 0) {
                return false;
            }
        }
        return true;
    }
}
```