---
title: 'Daily Algorithm: Leetcode in Rust'
date: '2023-01-02'
---
# Introduction

In the past, I have tried to improve my algorithm skills but I didn't stick with it. To motivate myself and stay on track, I plan to solve at least one algorithm per day and document my progress in this post. Additionally, I want to practice my favorite programming language, Rust, by writing the code for these algorithms in it. This will help me become more familiar with Rust.


# Leetcode
## 1480. Running sum of 1d Array

- Difficulty: Easy
- Link: [1480. Running Sum of 1d Array](https://leetcode.com/problems/running-sum-of-1d-array/description/?envType=study-plan&id=level-1)

### Description

Given an array `nums`. We define a running sum of an array as `runningSum[i] = sum(nums[0]…nums[i])`.

Return the running sum of `nums`.

### Solution

- Runtime: `O(n)`
- Space: `O(n)`

~~~rust
impl Solution {
    pub fn running_sum(nums: Vec<i32>) -> Vec<i32> {
        let mut sum: i32 = 0;
        let mut results: Vec<i32> = vec![0; nums.len()];
        for i in 0..nums.len() {
            sum += nums[i];
            results[i] = sum;
        }

        results
    }
}
~~~


## 724. Find Pivot Index

- Difficulty: Easy
- Link: [724. Find Pivot Index](https://leetcode.com/problems/find-pivot-index/?envType=study-plan&id=level-1)

### Description

Given an array of integers `nums`, calculate the pivot index of this array.

The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.

If the index is on the left edge of the array, then the left sum is `0` because there are no elements to the left. This also applies to the right edge of the array.

Return the leftmost pivot index. If no such index exists, return `-1`.

### Solution

- Runtime: `O(n)`
- Space: `O(1)`


~~~rust
impl Solution {
    pub fn pivot_index(nums: Vec<i32>) -> i32 {
        // right = the total sum of the array at the beginning
        let mut right:i32 = nums.iter().sum();
        let mut left:i32 = 0;

        // find the pivot by deciding if current is the pivot
        for (i, x) in nums.iter().enumerate() {
            right -= x;
            if left == right {
                return i as i32;
            }
            left += x;
        }
        // return -1 if no pivot
        -1
    }
}
~~~