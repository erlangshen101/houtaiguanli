import { log } from "util";

export default {
    //   sku排列算法
    cartesianProductOf() {
        return Array.prototype.reduce.call(arguments,function(a, b) {
            var ret = [];
            a.forEach(function (a) {
                b.forEach(function (b) {
                    ret.push(a.concat([b]))
                });
            });
            return ret;
        },[[]]);
    },
    swapArray(arr, index1, index2) {
        if (index2 == arr.length) {
            arr[index1] = arr.splice(0, 1, arr[index1])[0];
            return arr
        }
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    },
    // 上移 将当前数组index索引与后面一个元素互换位置,向数组后面移动一位
    moveUp(arr,index) {
        this.swapArray(arr, index, index - 1);
    },
    moveDown(arr,index) {
        this.swapArray(arr, index, index + 1);
    }
}