/** TreeNode: node for a general tree. */

class TreeNode { // Represents a single node in the tree
  constructor(val, children = []) { // It has 2 properties
    this.val = val; //  'val' this property stores the value contained in the node
    this.children = children; // 'children' this propety is an array containing child nodes. It defaults to an empty array []
  }
}

class Tree { //  Represents the entire tree structure.
  constructor(root = null) { // This property refers to the root node of the tree. It's an instance of the TreeNode class.
    this.root = root; // It can be initialized with a root node (or left empty to represent an empty tree).
  }

  // // Creating nodes example
// const node1 = new TreeNode(1);
// const node2 = new TreeNode(2);
// const node3 = new TreeNode(3);
// const node4 = new TreeNode(4);

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    // Helper function to traverse the tree and calculate the sum
    function calculateSum(node) {
      if (!node) { // If the node is null, return 0 to add to the sum
        return 0;
      }
      let sum = node.val; // Add the value of the current node to the sum

      // Recursively calculate the sum for each child node
      for (let child of node.children) {
        sum += calculateSum(child);
      }
      return sum; // Return the total sum for this node and its children
    }

    // Start calculating the sum from the root node of the tree
    if (!this.root) {
      return 0; // If the tree is empty
    }

    return calculateSum(this.root); // Return the total sum of all node values in the tree
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    function countEvenNodes() {
      if (!node) {
        return 0;
      }
      
      let count = node.val % 2 === 0 ? 1 : 0; //Check if the nodes value is even

      // Recursively count even nodes in each child node
      for (let child of node.children){
        count += countEvenNodes(child);
      }

      return count; // Return the count of even nodes for this node and its children
    }

    // Start counting even nodes from the root node of the tree
    if (!this.root) {
      return 0; //If the tree is empty, return 0
    }

    return countEvenNodes(this.root); //Return the total count of nodes
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    // Helper function to traverse the tree and count nodes with values greater than lowerBound
    function countNodesGreaterThan(node, lowerBound) {
      if (!node) {
        return 0; // If the node is null, return 0
      }
  
      let count = node.val > lowerBound ? 1 : 0; // Check if the node's value is greater than lowerBound
  
      // Recursively count nodes with values greater than lowerBound in each child node
      for (let child of node.children) {
        count += countNodesGreaterThan(child, lowerBound);
      }
  
      return count; // Return the count of nodes with values greater than lowerBound for this node and its children
    }
  
    // Start counting nodes with values greater than lowerBound from the root node of the tree
    if (!this.root) {
      return 0; // If the tree is empty, return 0
    }
  
    return countNodesGreaterThan(this.root, lowerBound); // Return the total count of nodes with values greater than lowerBound in the tree
  }
  
}

module.exports = { Tree, TreeNode };
