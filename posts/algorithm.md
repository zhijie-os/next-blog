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

## 205. Isomorphic Strings

- Difficulty: Easy
- Link: [205. Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/?envType=study-plan&id=level-1)

### Description

Given two strings `s` and `t`, determine if they are isomorphic.

Two strings `s` and `t` are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

### Solution

- Runtime: `O(n)`
- Space: `O(n)`


~~~rust
use std::collections::HashMap;

impl Solution {
    pub fn is_isomorphic(s: String, t: String) -> bool {
        if s.len() != t.len() {
            return false;
        }
        let mut s_map = HashMap::new();
        let mut t_map = HashMap::new();
        
        for (i, (sc,tc)) in s.chars().zip(t.chars()).enumerate() {
            // get the mapped char in t, or insert the associated char tc
            let s_entry = s_map.entry(sc).or_insert(tc);
            // get the mapped char in s, or insert the associated char sc
            let t_entry = t_map.entry(tc).or_insert(sc);

            // key point is that
            //  no two chars mapped to same char, for both chars in s and t
            // *s_entry != tc <=> sc is already mapped to another char that is not tc
            // *t_entry != sc <=> tc is already mapped to another char that is not sc
            if  *s_entry != tc || *t_entry != sc {
                return false;
            }
        }
        true
    }
}
~~~


## 392. Is Subsequence


- Difficulty: Easy
- Link: [392. Is Subsequence](https://leetcode.com/problems/is-subsequence/description/?envType=study-plan&id=level-1)


### Description

Given two strings `s` and `t`, return `true` if `s` is a subsequence of `t`, or `false` otherwise.

A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., `"ace"` is a subsequence of `"abcde"` while `"aec"` is not).

### Solution

- Runtime: `O(n)`
- Space: `O(1)`

~~~rust
use std::collections::HashMap;
impl Solution {
    pub fn is_subsequence(s: String, t: String) -> bool {
        let mut s_iter = s.chars().peekable();
        for c in t.chars() {
            // early stop if s reaches the end before t is finished
            if s_iter.peek().is_none() {
                return true;
            }
            else if Some(c) == s_iter.peek().map(|x| *x) {
                // advance s iterator
                print!("{:?}",s_iter.peek().map(|x| *x));
                s_iter.next();
            }
        }
        
        // check if s iterator reaches the end
        if s_iter.peek().is_none() {
            return true;
        }

        return false;
    }
}
~~~