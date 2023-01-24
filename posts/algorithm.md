---
title: 'Daily Algorithm: Leetcode in Rust/C++'
date: '2023-01-13'
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

- Difficulty: Medium
- Link: [98. Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/?envType=study-plan&id=level-1)

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


## 235. Lowest Common Ancestor of a Binary Search Tree

- Difficulty: Medium
- Link: [235. Lowest Common Ancestor of a Binary Search Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

### Description

Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself).”



### Solution 

- Runtime: `O(lgn)`
- Space: `O(1)`

~~~cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */

class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if(q->val<p->val){
            swap(q,p);
        }
        
        if(root==p||root==q||(root->val < q->val&&root->val > p->val)){
            return root;
        }
        else if(root->val > q->val && root->val > p->val){
            return lowestCommonAncestor(root->left, p, q);
        }
        else{
            return lowestCommonAncestor(root->right, p, q);
        }
    }
};
~~~


## 733. Flood Fill

- Difficulty: Easy
- Link: [733. Flood Fill](https://leetcode.com/problems/flood-fill/?envType=study-plan&id=level-1)

### Description

An image is represented by an `m x n` integer grid `image` where image[i][j] represents the pixel value of the image.

You are also given three integers sr, sc, and color. You should perform a flood fill on the image starting from the pixel image[sr][sc].

To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with color.

Return the modified image after performing the flood fill.

### Solution

- Runtime: `O(mn)`
- Space: `O(1)`

This algorithm also teaches how to traverse a 2d array with DFS.

~~~cpp
class Solution {
public:
    void dfs(vector<vector<int>> &image, int i, int j, int val, int newColor){
        // 1.check if the [i][j] is inside the 2d array
        // 2. check if already the color
        // 3. check if the old color is same
        if(i<0 || i>=image.size() || j<0 || j>= image[0].size() || image[i][j] == newColor || image[i][j] != val)
        {
            return;
        }
        // populated adjacent water
        image[i][j] = newColor;
        // populate/flood four directions
        dfs(image, i-1, j, val, newColor);
        dfs(image, i+1, j, val, newColor);
        dfs(image, i, j-1, val, newColor);
        dfs(image, i, j+1, val, newColor);
    }
    
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
        dfs(image, sr, sc, image[sr][sc], color);
        return image;
    }
};
~~~


## 200. Number of Islands

- Difficulty: Medium
- Link: [200. Number of Islands](https://leetcode.com/problems/number-of-islands/?envType=study-plan&id=level-1)


### Description 

Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.

An island is *surrounded* by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.


### Solution

- Runtime: `O(mn)`
- Space: `O(1)`

This algorithm also teaches how to traverse a 2d array with DFS.

~~~cpp
class Solution {
public:
    void dfs(vector<vector<char>>&grid, int i, int j){
        // outbound
        if(i < 0 || i>= grid.size() || j < 0 || j>=grid[0].size()){ // note, it is grid[0].size() for the number of columns
            return;
        }
        // the cell is already counted(#) or it is water (0)
        if(grid[i][j]!='1'){
            return;
        }
        
        // mark the island as counted
        grid[i][j]='#';
        
        dfs(grid, i-1, j);
        dfs(grid, i+1, j);
        dfs(grid, i, j-1);
        dfs(grid, i, j+1);
    }
    
    int numIslands(vector<vector<char>>& grid) {
        int islands = 0;
        
        for(int i=0; i<grid.size(); i++){
            for(int j=0; j<grid[0].size(); j++){
                // when find a island
                if(grid[i][j]=='1'){
                    islands++;
                    // use dfs to mark the entire island as counted.
                    dfs(grid, i, j);
                }
            }
        }
        
        return islands;
    }
};
~~~

## 509. Fibonacci Number

- Difficulty: Easy
- Link: [509. Fibonacci Number](https://leetcode.com/problems/fibonacci-number/?envType=study-plan&id=level-1)


### Description 

The *Fibonacci numbers*, commonly denoted `F(n)` form a sequence, called the *Fibonacci sequence*, such that each number is the sum of the two preceding ones, starting from `0` and `1`.

### Solution

- Runtime: `O(n)`
- Space: `O(n)`

~~~cpp
// a dynamic programming solution
class Solution {
public:
    int fib(int n) {
        if( n<=1 ){
            return n;
        }
        
        vector<int> table(n+1);
        table[0] = 0;
        table[1] = 1;
        for(int i=2; i<table.size(); i++){
            // fib(n) = fib(n-1) + fib(n-2)
            table[i] = table[i-1] + table[i-2];
        }
        
        return table[n];
    }
};
~~~

## 70. Climbing Stairs

- Difficulty: Easy
- Link: [70. Climbing Stairs](https://leetcode.com/problems/climbing-stairs/?envType=study-plan&id=level-1)

### Description 

You are climbing a staircase. It takes `n` steps to reach the top.

Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?

### Solution

- Runtime: `O(n)`
- Space: `O(n)`

~~~cpp
class Solution {
public:
    int climbStairs(int n) {
        if (n<2){
            return 1;
        }else if(n==2){
            return 2;
        }
        // subproblem <=> how many ways to reach top from top-i
        vector<int> table(n+1);
        // ahh.. table[0] is a dummy
        table[0] = table[1] = 1;
        table[2] = 2;
        for(int i=3; i<table.size(); i++){
            // either make 1 step or 2 steps
            table[i] = table[i-1] + table[i-2]; 
        }
        // top-n is the starting
        return table[n];
    }
};
~~~

## 746. Min Cost Climbing Stairs

- Difficulty: Easy
- Link: [746. Min Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/?envType=study-plan&id=level-1)

### Description

You are given an integer array `cost` where `cost[i]` is the cost of `ith` step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index `0`, or the step with index `1`.

Return the minimum cost to reach the top of the floor.

### Solution

- Runtime: `O(n)`
- Space: `O(n)`

~~~cpp
class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {

        int n = cost.size();
        
        // think backwards, table[i] = the cost of climbing to top from top-i-1... stair
        vector<int> table(n);
        // reaches the top from top-1
        table[0] = cost[cost.size()-1];
        // reaches the top from top-2
        table[1] = cost[cost.size()-2];
        
        for(int i=2; i<table.size(); i++)
        {
            // either make 1 step or 2 steps
            int oneStep = cost[cost.size()-i-1]+table[i-1];
            int twoStep = cost[cost.size()-i-1]+table[i-2];
            // plus current stair's cost
            table[i] = min(oneStep,twoStep);
        }

        // the first step is either 1st stair, or 2nd stair
        return min(table[n-1],table[n-2]);
    }
};
~~~


## 62. Unique Paths

- Difficulty: Medium
- Link: [62. Unique Paths](https://leetcode.com/problems/unique-paths/)

### Description

There is a robot on an `m x n` grid. The robot is initially located at the top-left corner (i.e., `grid[0][0]`). The robot tries to move to the bottom-right corner (i.e., `grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time.

Given the two integers `m` and `n`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

### Solution

- Runtime: `O(mn)`
- Space: `O(mn)`

~~~cpp
class Solution {
public:

    
    int uniquePaths(int m, int n) {
        vector<vector<int>> table(m, vector<int>(n));
        // base cases
        // can only go down
        for(int i=0; i< m; i++){
            table[i][n-1] = 1;
        }
        // can only go right
        for(int i=0; i<n; i++){
            table[m-1][i] = 1;
        }
        
        for(int i=m-2; i>=0 ; i--){
            for(int j=n-2; j>=0; j--){
                // either go down or right
                table[i][j] = table[i+1][j] + table[i][j+1];
            }
        }
        
        return table[0][0];
    }
};
~~~


## 438. Find All Anagrams in a String

- Difficulty: Medium
- Link: [438. Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/?envType=study-plan&id=level-1)


### Description 

Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`. You may return the answer in *any order*.

An *Anagram* is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.



### Solution 



- Runtime: `O(n)`: Note `n` is the size of `s`.
- Space: `O(1)`: `pChars` and `wChars` are only 26-ints constant size. 

~~~cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        if(p.size()>s.size()){
            return {};
        }
        
        vector<int> pChars(26, 0);
        vector<int> wChars(26, 0);
        vector<int> result;
        
        for(int i=0; i<p.size(); i++)
        {
            pChars[p[i]-'a']++;
            wChars[s[i]-'a']++;
        }
        
        if(pChars==wChars){
                result.push_back(0);
        }
        
        for(int i=p.size(); i<s.size(); i++){
            // add new char into window 
            wChars[s[i]-'a']++;
            // delete last char on the left side of the window
            wChars[s[i-p.size()]-'a']--;
            if(pChars==wChars){
                result.push_back(i-p.size()+1);
            }
        }
        return result;
    }
};
~~~



## 424. Longest Repeating Character Replacement

- Difficulty: Medium
- Link: [424. Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/)


### Description 

You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.


### Solution 

Keep a window squeezed by `left` and `right`. For each window instance, find the most frequent char and its frequency. Check if the window size(number of character in the substring) can be filled by the most frequent char with k replacement. If so, enlarge `right`
and update the maximum length; otherwise, shift left and seek new window instances starting from `left+1`.

- Runtime: `O(n)`
- Space: `O(1)`

~~~cpp
class Solution {
public:
    int characterReplacement(string s, int k) {
        vector<int> count(26,0);
        
        int left = 0;
        int mostFrequentCount = 0;
        int maxLength = 0;
        
        for(int right = 0; right < s.length(); right ++ ){
           // new char in the window
           count[s[right]-'A']++;
           // update the most frequent count if necessary
           mostFrequentCount = max(mostFrequentCount, count[s[right]-'A']);
           if(right - left + 1 - mostFrequentCount - k <= 0) {
               maxLength = right - left + 1;
           }
           else {
               // not enough replacement, shift the window to right
               count[s[left]-'A']--;
               left ++;
           }
           
        }

        return maxLength;
        
    }
};
~~~



## 1. Two Sum

- Difficulty: Easy
- Link: [1. Two Sum](https://leetcode.com/problems/two-sum/?envType=study-plan&id=level-1)


### Description 

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have *exactly one solution*, and you may not use the same element twice.

You can return the answer in any order.

### Solution

This question can also be solved by two pointers if the `nums` are ordered.

- Runtime: `O(n)`
- Space: `O(n)`

~~~cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> occurrence;

        for(int i=0 ; i< nums.size(); i++){
            if(occurrence.find(target - nums[i])!=occurrence.end()){
                return {occurrence[target - nums[i]], i};
            }
            else {
                occurrence[nums[i]] = i;
            }
        }

        return {};
    }
};
~~~


## 299. Bulls and Cows

- Difficulty: Medium
- Link: [299. Bulls and Cows](https://leetcode.com/problems/bulls-and-cows/?envType=study-plan&id=level-1)

### Description 

You are playing the *Bulls and Cows* game with your friend.

You write down a secret number and ask your friend to guess what the number is. When your friend makes a guess, you provide a hint with the following info:

The number of "bulls", which are digits in the guess that are in the correct position.
The number of "cows", which are digits in the guess that are in your secret number but are located in the wrong position. Specifically, the non-bull digits in the guess that could be rearranged such that they become bulls.

Given the secret number `secret` and your friend's guess `guess`, return the hint for your friend's guess.

The hint should be formatted as `"xAyB"`, where `x` is the number of bulls and `y` is the number of cows. Note that both `secret` and `guess` may contain duplicate digits.


### Solution


- Runtime: `O(n)`
- Space: `O(n)`

~~~cpp
class Solution {
public:
    string getHint(string secret, string guess) {
        unordered_map<char, int> occurrence;
        
        // count the characters in the hashmap
        for(char &c : guess){
            occurrence[c]++;
        }
        
        // count the number of bulls, priv(bull) > priv(cow)
        int bull = 0;
        for(int i=0; i<secret.size(); i++){
            if (secret[i]==guess[i]){
                bull ++;
                occurrence[guess[i]]--;
            }
        }
        
        // count the number of cow
        int cow = 0;
        for(int i=0; i<secret.size(); i++){
            if (secret[i]!=guess[i]){
                if (occurrence[secret[i]]>0){
                    occurrence[secret[i]]--;
                    cow++;
                }
            }
        }
        return to_string(bull)+"A"+to_string(cow)+"B";
    }
};
~~~


## 844. Backspace String Compare

- Difficulty: Easy
- Link: [844. Backspace String Compare](https://leetcode.com/problems/backspace-string-compare/)


### Description 

Given two strings `s` and `t`, return `true` if they are equal when both are typed into empty text editors. `'#'` means a backspace character.

Note that after backspacing an empty text, the text will continue empty.



### Solution 

The challenge point of this problem is to only use `O(1)` space in `O(n)` time. Intuition is the backspace character never void character after it. That is `#a` never voids `a`. Thus, if we walk the strings in reverse order, we do not need to revisiting some of the previous characters.

- Runtime: `O(n)`
- Space: `O(1)`

~~~cpp
class Solution {
public:
    bool backspaceCompare(string s, string t) {
        // prepare to traverse in the reversed order
        int i=s.size()-1, j=t.size()-1;
        
        // remeber how many characters to erase
        int skip_s = 0;
        int skip_t = 0;

        // need to finish the list
        while(i>=0 || j>=0) {
            // walk until the next non-erased character
            while(i>=0) {
                if(s[i]=='#') {
                    skip_s++;
                    i--;
                }
                else if(skip_s>0){
                    // erase a character
                    skip_s--;
                    i--;
                }
                // at the next consumable character
                else {
                    break;
                }
            }
            // walk until the next non-erased character
            while(j>=0 ) {
                if(t[j]=='#') {
                    skip_t++;
                    j--;
                }
                else if(skip_t>0){
                    // erase a character
                    skip_t--;
                    j--;
                }
                // consume another character
                else {
                    break;
                }
            }
            // compare those two characters
            if( i>=0 && j>=0 && s[i]!=t[j]){
                return false;
            }
            if ((i >= 0) != (j >= 0))
                    return false;
            // so far so good, keep traversing
            i--;
            j--;
        }
        return true;
    }
};
~~~



## 394. Decode String

- Difficulty: Medium
- Link: [394. Decode String](https://leetcode.com/problems/decode-string/)

### Description

Given an encoded string, return its decoded string.

The encoding rule is: `k[encoded_string]`, where the `encoded_string` inside the square brackets is being repeated exactly `k` times. Note that `k` is guaranteed to be a positive integer.

You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, `k`. For example, there will not be input like `3a` or `2[4]`.

The test cases are generated so that the length of the output will never exceed `10^5`.

### Solution 

When dealing with nested structured, e.g. brackets, stack is a natural way to solve the problems. The key is to start to pop whenever encounter a closing bracket until reaches the 
opening bracket.


- Runtime: `O(n)`
- Space: `O(n)`

~~~cpp
class Solution {
public:
    string repeat(int n, string s){
        string result;
        for (int i=0; i<n ;i++){
            result += s ; 
        }
        return result;
    }
    
    string decodeString(string s) {
        stack<string> stack;
        
        for(char &c : s) {
            if(c!=']'){
                stack.push(string(1,c));
            }
            else { // start to pop when closing 
                string temp;
                // accumulate inner chars
                while(stack.top()!="["){
                    temp = stack.top() + temp;
                    stack.pop();
                }
                // pop '['
                stack.pop();
                
                string repeation;
                // get the number of repeating
                while(!stack.empty() && (stack.top()[0]>='0' && stack.top()[0]<='9')){
                    repeation = stack.top() + repeation;
                    stack.pop();
                }
                // apply the repeation and push back to the stack
                stack.push(repeat(stoi(repeation), temp));
            }
        }
        
        // concate all the stack strings to get result
        string result;
        while(!stack.empty()){
            result = stack.top() + result;
            stack.pop();
        }
        return result;
    }
};
~~~


## 1046. Last Stone Weight

- Difficulty: Easy
- Link: [1046. Last Stone Weight](https://leetcode.com/problems/last-stone-weight/)

### Description 

You are given an array of integers `stones` where `stones[i]` is the weight of the `i`th stone.

We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights `x` and `y` with `x <= y`. The result of this smash is:

If `x == y`, both stones are destroyed, and
If `x != y`, the stone of weight `x` is destroyed, and the stone of weight `y` has new weight `y - x`.

At the end of the game, there is at most one stone left.

Return the weight of the last remaining stone. If there are no stones left, return `0`.

### Solution

Use a priority queue (max-heap) to finding the heaviest stones (stones with max weights) in `O(lgn)` time. Insert back the remaining in another `O(lgn)` time.

- Runtime: `O(nlgn)`
- Space: `O(1)` - no extra space consumption; simply operate on the given vector


~~~cpp
class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        // by default, it is max-heap
        priority_queue<int> maxq(stones.begin(), stones.end());

        while(maxq.size()>1){
            int stone1 = maxq.top();
            maxq.pop();

            int stone2 = maxq.top();
            maxq.pop();

            int theRest = stone1 - stone2;
            if (theRest > 0) {
                maxq.push(theRest);
            }
        }

        return maxq.empty()? 0:maxq.top();
    }
};
~~~


## 692. Top K Frequent Words

- Difficulty: Medium
- Link: [692. Top K Frequent Words](https://leetcode.com/problems/top-k-frequent-words/)


### Description 

Given an array of strings `words` and an integer `k`, return the `k` most frequent strings.

Return the answer *sorted* by *the frequency* from highest to lowest. Sort the words with the same frequency by their *lexicographical order*.

### Solution 

- Runtime: `O(nlgn)`
- Space: `O(n)`

~~~cpp
// implementation of less comparator
class cComparator {
public:
    bool operator()(pair<string, int> word1, pair<string, int> word2){
        if(word1.second == word2.second) {
            return word1.first > word2.first;
        }
        else {
            return word1.second < word2.second;
        }
    }
};

class Solution {
public:
    vector<string> topKFrequent(vector<string>& words, int k) {
        unordered_map<string, int> occurrence;
        // count the occurrence
        for(string &word: words) {
            occurrence[word]++;
        }

        // create a less comparator
        priority_queue<pair<string,int>, vector<pair<string,int>>, cComparator> maxq;
        
        for(auto &it: occurrence) {
                maxq.push({it.first, it.second});
        }

        vector<string> result;

        while(!maxq.empty()) {
            // only want to the k-biggest 
            if(k==0){
                break;
            }
            result.push_back(maxq.top().first);
            maxq.pop();
            k--;
        }

        return result;
    }
};
~~~