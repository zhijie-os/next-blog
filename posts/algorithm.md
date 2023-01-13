---
title: 'Daily Algorithm: Leetcode in Rust/C++'
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

## 21. Merge Two Sorted Lists

- Difficulty: Easy
- Link: [21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/?envType=study-plan&id=level-1)

### Description

You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

### Solution

The algorithm is also called *Two Finger Algorithm*.

- Runtime: `O(n)`
- Space: `O(1)`

~~~rust
// Definition for singly-linked list.
// #[derive(PartialEq, Eq, Clone, Debug)]
// pub struct ListNode {
//   pub val: i32,
//   pub next: Option<Box<ListNode>>
// }
// 
// impl ListNode {
//   #[inline]
//   fn new(val: i32) -> Self {
//     ListNode {
//       next: None,
//       val
//     }
//   }
// }
impl Solution {
    pub fn merge_two_lists(list1: Option<Box<ListNode>>, list2: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut sentinel = Box::new(ListNode::new(0));
        let mut current = &mut sentinel;
        // redeclaring into mutable
        let mut list1 = list1;
        let mut list2 = list2;

        // while if both linkedlist is not appended
        while list1.is_some() || list2.is_some() {
            if let (Some(ref box1), Some(ref box2)) = (list1.as_ref(), list2.as_ref()) {
                // add the header of list 1
                if box1.val < box2.val {
                    // move to the current, current takes the ownship
                    // note current is the Box type
                    current.next = list1.take();
                    // list1 = list1.next = the following ...
                    list1 = current.next.as_mut().unwrap().next.take();
                } else {
                    current.next = list2.take();
                    list2 = current.next.as_mut().unwrap().next.take();
                }
            }
            else if list1.is_some() {
                current.next = list1.take();
                    // list1 = list1.next = the following ...
                list1 = current.next.as_mut().unwrap().next.take();
            } 
            else {
                current.next = list2.take();
                list2 = current.next.as_mut().unwrap().next.take();
            }

            current = current.next.as_mut().unwrap();
        } 
        sentinel.next
    }
}
~~~


## 206. Reverse Linked List

- Difficulty: Easy
- Link: [206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/?envType=study-plan&id=level-1)


### Description

Given the head of a singly linked list, reverse the list, and return the reversed list.

### Solution

- Runtime: `O(n)`
- Space: `O(1)`

~~~rust
// Definition for singly-linked list.
// #[derive(PartialEq, Eq, Clone, Debug)]
// pub struct ListNode {
//   pub val: i32,
//   pub next: Option<Box<ListNode>>
// }
// 
// impl ListNode {
//   #[inline]
//   fn new(val: i32) -> Self {
//     ListNode {
//       next: None,
//       val
//     }
//   }
// }
use std::mem;
impl Solution {
    pub fn reverse_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut reversed_list: Option<Box<ListNode>> = None;
        let mut current_node = head;

        while let Some(mut node) = current_node {
            // replace next with none, but return the old next
            current_node = mem::replace(&mut node.next, None);
            // attached the reversed_list in the next
            node.next = reversed_list;
            // put node as header of th reversed_list
            reversed_list = Some(node);
        }
        reversed_list
    }
}
~~~

- Runtime: `O(n)`
- Space: `O(1)`

~~~cpp
// /**
//  * Definition for singly-linked list.
//  * struct ListNode {
//  *     int val;
//  *     ListNode *next;
//  *     ListNode() : val(0), next(nullptr) {}
//  *     ListNode(int x) : val(x), next(nullptr) {}
//  *     ListNode(int x, ListNode *next) : val(x), next(next) {}
//  * };
//  */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        if(head==nullptr) {
            return head;
        }

        ListNode* prev = nullptr;
        ListNode* curr = head;
        ListNode* next = head->next;

        while(next) {
            curr->next = prev;
            prev = curr;
            curr = next;
            next = next->next;
        }
        curr->next = prev;
        return curr;
    }
};
~~~

# Switching to C++

I have to admit that Rust is a very difficult language for me and some of the functions in the standard library seem like magic to me. Coding algorithms in Rust has been distracting for me because I have to focus so much on the language itself. Therefore, for the rest of this blog, I will be using C++ instead.


## 876. Middle of the Linked List

- Difficulty: Easy
- Link: [876. Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/?envType=study-plan&id=level-1)

### Description

Given the `head` of a singly linked list, return the middle node of the linked list.

If there are two middle nodes, return *the second middle* node.

### Solution

The easiest way is to count the number of nodes in the linked list and reiterate the linked list from the head. However, this takes two passes through the same linked list. A better solution takes one pass. We need to use two pointers, one is faster, one is slower. When the faster one reaches the end, the slower one reaches the middle of the linked list.

- Runtime: `O(n)`
- Space: `O(1)`


~~~cpp
// /**
//  * Definition for singly-linked list.
//  * struct ListNode {
//  *     int val;
//  *     ListNode *next;
//  *     ListNode() : val(0), next(nullptr) {}
//  *     ListNode(int x) : val(x), next(nullptr) {}
//  *     ListNode(int x, ListNode *next) : val(x), next(next) {}
//  * };
//  */
class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        ListNode *fast, *slow = head;

        while (fast->next!=nullptr) {
            slow = slow->next;
            // if there is even length of nodes
            if (fast->next->next == nullptr) {
                break;
            }
            fast = fast->next->next;
        }
        return slow;
    }
};
~~~

## 142. Linked List Cycle II

- Difficulty: Medium
- Link: [142. Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/?envType=study-plan&id=level-1)

### Description

Given the `head` of a linked list, return the node where the cycle begins. If there is no cycle, return `null`.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, pos is used to denote the index of the node that tail's `next` pointer is connected to (0-indexed). It is `-1` if there is no cycle. Note that `pos` is not passed as a parameter.

*Do not modify the linked list.*

### Solution

Similar idea to the last question - Middle of the linked list, we need a fast pointer and a slow pointer. When the fast pointer catches the slow pointer, there is a cycle. However, finding and returning the exact entry node of the cycle is non-trivial. The algorithm is called `Floyd Algorithm` and it is Okay if one spend one hour just to understand it. Remeber,when you are tackling this problem you are as  creative as Floyd was solving the exact same problem.

- Runtime: `O(n)` <=> algorithm stops when `slow` pointer reaches the entry of the loop
- Space: `O(1)` <=> three pointers

~~~cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        // trivial
        if(!head||!head->next){
            return nullptr;
        }
        ListNode *slow = head;
        ListNode *fast = head;
        ListNode *entry = head;

        // slow is slower than fast, so we break the eloop when fast reaches the end
        while(fast->next&&fast->next->next) {
            slow = slow->next;
            fast = fast->next->next;
            // slow and fast meets => there is a loop 
            if(slow == fast) {
                // need to find the entry point of the loop;
                // distance from head to the node = distance from the meet point to the node(forward direction)
                while(entry!=slow) {
                    entry = entry->next;
                    slow = slow->next;
                }
                return entry;
            }
        }

        // no loop
        return nullptr;
    }
};
~~~

## 121. Best Time to Buy and Sell Stock

- Difficulty: Easy
- Link: [121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/?envType=study-plan&id=level-1)

### Description

You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.


### Solution 

We want to buy low and sell high. We keep two pointers, one is for identify the low, and the other one is to identify the high. Ask ourselves one question "You currently have low and high, how can you improve the profit?" => new low, and new high. 


- Runtime: `O(n)`
- Space: `O(1)`

~~~cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int max = 0;
        int low = prices[0];
        int high = prices[0];
        
        for(int i:prices){
            if(i > high){
                high = i;
                if(high-low > max)
                    max = high - low;
            }
            else if (i<low){
                // need to reset high, since we cannot sell on previous dates
                low = high = i;
            }
        }
        
        return max;
    }
};
~~~


## 409. Longest Palindrome

- Difficulty: Easy
- Link: [409. Longest Palindrome](https://leetcode.com/problems/longest-palindrome/?envType=study-plan&id=level-1)

### Description

Given `a` string s which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.

Letters are case sensitive, for example, `"Aa"` is not considered a palindrome here.

An example is
```
Input: s = "abccccdd"
Output: 7
Explanation: One longest palindrome that can be built is "dccaccd", whose length is 7.
```



### Solution

The order of the characters in the string does not matter, you can construct your own palindrome with existing characters.
Thus, the answer is a simple greedy algorithm. The intuition is 
to add two same character to the palindrome whenever encountered.

- Runtime: `O(n)`
- Space: `O(n)`

~~~cpp
class Solution {
public:
    int longestPalindrome(string s) {
        unordered_set<char> set;
        int result = 0;
        //  add two same character to the palindrome whenever encountered
        for(char i : s){
            if(set.find(i) != set.end()){
                set.erase(i);
                result += 2;
            }
            else{
                set.insert(i);
            }
        }

        // If we have a spare, unique character at our disposal, we can insert it in the middle of our palindrome to create a new one.
        if(!set.empty()){
            result += 1;
        }

        return result;
    }
};
~~~


## 589. N-ary Tree Preorder Traversal

- Difficulty: Easy
- Link: [589. N-ary Tree Preorder Traversal](https://leetcode.com/problems/n-ary-tree-preorder-traversal/?envType=study-plan&id=level-1)

### Description

Given the `root` of an n-ary tree, return the preorder traversal of its nodes' values.

Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value (See examples)


### Solution


- Runtime: `O(n)`
- Space: `O(1)`

~~~cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> children;

    Node() {}

    Node(int _val) {
        val = _val;
    }

    Node(int _val, vector<Node*> _children) {
        val = _val;
        children = _children;
    }
};
*/

class Solution {
public:
    vector<int> preorder(Node* root) {
        vector<int> result;
        preorder_traverse(root, result);
        return result;
    }
    
    void preorder_traverse(Node* node, vector<int> &result){
        if(!node){
            return;
        }
        result.push_back(node->val);
        for(auto child:node->children){
            preorder_traverse(child,result);
        }
    }
};
~~~

An interative solution is
~~~cpp
class Solution {
public:
    vector<int> preorder(Node* root) {
        if(!root){
            return {};
        }
        
        vector<int> result;
        stack<Node *> nodes;
        nodes.push(root);
        
        Node* curr;
        while(!nodes.empty()){
            curr = nodes.top();
            nodes.pop();
            result.push_back(curr->val);
            
            for(int i=curr->children.size()-1 ;i>=0;i--){
                nodes.push(curr->children[i]);
            }
            
        }
        
        return result;
    }

};
~~~




## 102. Binary Tree Level Order Traversal

- Difficulty: Medium
- Link: [102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/?envType=study-plan&id=level-1)

### Description

Given the `root` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

### Solution


- Runtime: `O(n)`
- Space: `O(n)`

~~~cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        if(!root) {
            return {};
        }
        
        vector<vector<int>> result;
        vector<TreeNode *> levelNodes;
        levelNodes.push_back(root);

        while (!levelNodes.empty()) {
            int currentLevelSize = levelNodes.size();
            vector<int> currentLevelVals;
            for(int i=0; i< currentLevelSize; i++){
                // get the val into 
                currentLevelVals.push_back(levelNodes[i]->val);
                // push left to next level
                if(levelNodes[i]->left){
                    levelNodes.push_back(levelNodes[i]->left);
                }
                // push right to next level
                if(levelNodes[i]->right){
                    levelNodes.push_back(levelNodes[i]->right);
                }
            }
            // erase last level nodes
            levelNodes.erase(levelNodes.begin(),levelNodes.begin()+currentLevelSize);
            result.push_back(currentLevelVals);
        }

        return result;
    }
};
~~~



## 102. Binary Tree Level Order Traversal

- Difficulty: Easy
- Link: [704. Binary Search](https://leetcode.com/problems/binary-search/?envType=study-plan&id=level-1)

### Description

Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.

You must write an algorithm with `O(log n)` runtime complexity.

### Solution
 

- Runtime: `O(lgn)`
- Space: `O(1)`

~~~cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size()-1;

        while(left <= right) {
            int mid = (left+right)/2;
            if(nums[mid] == target){
                return mid;
            } 
            else if (nums[mid] > target){ // look at the left side
                right = mid - 1;
            }
            else { // look at right side
                left = mid + 1;
            }
        }

        return -1;
    }
};
~~~



## 278. First Bad Version

- Difficulty: Easy
- Link: [278. First Bad Version](https://leetcode.com/problems/first-bad-version/?envType=study-plan&id=level-1)

### Description

You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have n versions `[1, 2, ..., n]` and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API `bool isBadVersion(version)` which returns whether `version` is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.

### Solution
 

- Runtime: `O(lgn)`
- Space: `O(1)`

~~~cpp
// The API isBadVersion is defined for you.
// bool isBadVersion(int version);

class Solution {
public:
    int firstBadVersion(int n) {
        int left = 1;
        int right = n;

        while(left <= right) {
            // ... this seems awkward, but this is the right way to get mid without overflow
            int mid = (left / 2) + (right / 2) + ((left % 2 + right % 2) / 2);
            if(isBadVersion(mid)){
                if(mid==1 || !isBadVersion(mid-1))
                    return mid;
                else 
                    right = mid - 1;
            } 
            else { // look at right side
                left = mid + 1;
            }
        }

        return -1;
    }
};
~~~


## 98. Validate Binary Search Tree


### Description 

Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).

A *valid BST* is defined as follows:

- The left subtree of a node contains only nodes with keys less than the node's key.
- The right subtree of a node contains only nodes with keys greater than the node's key.
- Both the left and right subtrees must also be binary search trees.

### Solution

This algorithm relies on the fact that inorder traversal of a valid binary search tree is in `increasing`(in some other problems, `non-decreasing`) order

- Runtime: `O(lgn)`
- Space: `O(1)`

~~~cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool isValidBST(TreeNode* root) {
        if(!root)
        {
            return true;
        }
        // DFS - stack, BFS - queue
        std::vector<TreeNode *> stack;
        TreeNode *pre = nullptr;

        while(root||!stack.empty())
        {
            while(root)
            {
                // put all the in-node in the stack
                stack.push_back(root);

                // all the way to the most left
                root = root->left;
            }
            // go up
            root = stack.back();
            stack.pop_back();
            
            // check if bigger than the previous node
            if(pre && root->val <= pre->val)
            {
                return false;
            }
            // update previous
            pre = root;
            // go right branch
            root = root->right;
        }
        return true;
    }
};
~~~


A fancy way to do [inorder traversal](https://leetcode.com/problems/validate-binary-search-tree/discuss/32112/Learn-one-iterative-inorder-traversal-apply-it-to-multiple-tree-questions-(Java-Solution)).

~~~java
public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> list = new ArrayList<>();
    if(root == null) return list;
    Stack<TreeNode> stack = new Stack<>();
    while(root != null || !stack.empty()){
        while(root != null){
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        list.add(root.val);
        root = root.right;
        
    }
    return list;
}
~~~