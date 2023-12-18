/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) {
      return 0; // If the tree is empty, the depth is 0
    }
  
    let depth = 0; // Initialize the depth variable to 0 
    const queue = [this.root]; // Create a queue starting with the root node

    // Perform a level-by-level traversal using BFS
    while (queue.length > 0) {
      depth++; // Increment depth level for each level traversed

      // For each level, iterate through the nodes in the queue:
      const levelSize = queue.length;
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift(); // Shift the first node from the queue.
  
        if (!node.left && !node.right) { // If the node is a leaf node (both left and right children are null), return the current depth.
          return depth; // Return depth when reaching the first leaf node
        }
  
        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
      }
    }
  }
  
  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth(node = this.root) {
    if (!node) {
      return 0; // Base case: If the node is null, return 0
    }
  
    const leftDepth = this.maxDepth(node.left); // Calculate the depth of the left subtree
    const rightDepth = this.maxDepth(node.right); // Calculate the depth of the right subtree
  
    // Return the maximum depth between left and right subtrees plus 1 for the current node
    return Math.max(leftDepth, rightDepth) + 1;
  }
  
  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum(node = this.root, max = { value: -Infinity }) {
    if (!node) {
      return 0; // Base case: If the node is null, return 0
    }
  
    // Recursively calculate the sum of the left and right subtrees
    const leftSum = Math.max(0, this.maxSum(node.left, max)); // Ignore negative sums
    const rightSum = Math.max(0, this.maxSum(node.right, max)); // Ignore negative sums
  
    // Calculate the maximum sum including the current node
    const currentSum = leftSum + rightSum + node.val;
  
    // Update the maximum sum encountered so far
    max.value = Math.max(max.value, currentSum);
  
    // Return the maximum sum starting from this node downwards
    return Math.max(leftSum, rightSum) + node.val;
  }
  

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let result = null; // Initialize the result to null
    
    let currentNode = this.root; // Start from the root of the tree
    
    while (currentNode) {
      if (currentNode.val > lowerBound) {
        // If the current node value is greater than the lowerBound
        // Update the result and move to the left subtree to find a potentially smaller value
        result = currentNode.val;
        currentNode = currentNode.left;
      } else {
        // If the current node value is not greater than the lowerBound
        // Move to the right subtree to potentially find a larger value
        currentNode = currentNode.right;
      }
    }
    
    return result; // Return the smallest value larger than lowerBound, or null if no such value exists
  }
  

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    // Helper function to find the depth and parent of a given node
    function findDepthAndParent(root, target, depth = 0, parent = null) {
      if (!root) {
        return null; // Base case: Return null if the root is null
      }
  
      if (root.val === target) {
        return { depth, parent }; // Return depth and parent if the target node is found
      }
  
      // Recursively search in the left and right subtrees
      const leftResult = findDepthAndParent(root.left, target, depth + 1, root);
      const rightResult = findDepthAndParent(root.right, target, depth + 1, root);
  
      return leftResult || rightResult; // Return the result from either subtree
    }
  
    // Find depth and parent for node1 and node2
    const node1Info = findDepthAndParent(this.root, node1);
    const node2Info = findDepthAndParent(this.root, node2);
  
    // Check if both nodes exist and are at the same depth but have different parents
    return (
      node1Info &&
      node2Info &&
      node1Info.depth === node2Info.depth &&
      node1Info.parent !== node2Info.parent
    );
  }
  

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    if (!tree.root) {
      return '[]'; // Return an empty array representation for an empty tree
    }
  
    const queue = [tree.root]; // Initialize queue with the root node
    const serializedTree = []; // Initialize an array to store serialized tree nodes
  
    while (queue.length) {
      const node = queue.shift(); // Dequeue the first node from the queue
  
      if (node) {
        serializedTree.push(node.val); // Push the node's value to the serialized array
        queue.push(node.left); // Enqueue left child (even if null)
        queue.push(node.right); // Enqueue right child (even if null)
      } else {
        serializedTree.push(null); // Push null for empty nodes
      }
    }
  
    // Remove trailing null values from the serialized array
    while (serializedTree[serializedTree.length - 1] === null) {
      serializedTree.pop();
    }
  
    return JSON.stringify(serializedTree); // Convert the serialized array to a JSON string
  }
  

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    const serializedTree = JSON.parse(stringTree); // Parse the string into an array
    if (!serializedTree.length) {
      return new BinaryTree(); // Return an empty BinaryTree for an empty serialized tree
    }
  
    const root = new BinaryTreeNode(serializedTree.shift()); // Create the root node
    const queue = [root]; // Initialize a queue with the root node
  
    while (serializedTree.length) {
      const currentNode = queue.shift(); // Dequeue the current node from the queue
  
      const leftVal = serializedTree.shift(); // Get the value for the left child
      if (leftVal !== null && leftVal !== undefined) {
        currentNode.left = new BinaryTreeNode(leftVal); // Create and assign the left child node
        queue.push(currentNode.left); // Enqueue the left child
      }
  
      const rightVal = serializedTree.shift(); // Get the value for the right child
      if (rightVal !== null && rightVal !== undefined) {
        currentNode.right = new BinaryTreeNode(rightVal); // Create and assign the right child node
        queue.push(currentNode.right); // Enqueue the right child
      }
    }
  
    return new BinaryTree(root); // Return the deserialized BinaryTree object
  }
  

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    // Helper function to find the lowest common ancestor
    function findLCA(root, p, q) {
      if (!root || root === p || root === q) {
        return root; // Return the root or null if the root is null or matches either node
      }
  
      // Recursively search in the left and right subtrees for the two nodes
      const left = findLCA(root.left, p, q);
      const right = findLCA(root.right, p, q);
  
      // If both left and right are not null, it means the current root is the LCA
      if (left && right) {
        return root;
      }
  
      // If one subtree is null, return the non-null subtree (either left or right)
      return left ? left : right;
    }
  
    return findLCA(this.root, node1, node2); // Start the search from the root node
  }
  
}

module.exports = { BinaryTree, BinaryTreeNode };
