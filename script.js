class Node {
  constructor(root) {
    this.root = root;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }
  buildTree(array) {
    if (array.length === 0) {
      return null;
    }
    array.sort((a, b) => a - b);
    let tab = array.filter(
      (value, index, self) => self.indexOf(value) === index
    );
    const mid = tab[Math.floor(tab.length / 2)];
    const node = new Node(mid);
    node.left = this.buildTree(tab.slice(0, tab.indexOf(mid)));
    node.right = this.buildTree(tab.slice(tab.indexOf(mid) + 1));
    return node;
  }
  insert(value) {
    const newNode = new Node(value);
    let main = this.root;
    while (true) {
      if (newNode.root < main.root) {
        if (main.left === null) {
          main.left = newNode;
          return;
        }
        main = main.left;
      } else {
        if (main.right === null) {
          main.right = newNode;
          return;
        }
        main = main.right;
      }
    }
  }
  deleteItem(value) {
    let main = this.root;
    let previous;
    let side;
    while (true) {
      if (main === null) {
        return;
      }
      if (value === main.root) {
        if (main.left === null && main.right === null) {
          previous[side] = null;
          return;
        } else if ((main.left || main.right) && !(main.left && main.right)) {
          main.left !== null
            ? (previous[side] = main.left)
            : (previous[side] = main.right);
          return;
        } else {
          let previousVal;
          let element = main.right;
          while (element.left) {
            previousVal = element;
            element = element.left;
          }
          main.root = element.root;
          if (!previousVal) {
            main.right = element.right;
          } else {
            previousVal.left = element.right;
          }
        }
        return;
      }
      if (value < main.root) {
        side = "left";
        previous = main;
        main = main.left;
      } else {
        side = "right";
        previous = main;
        main = main.right;
      }
    }
  }
  find(value) {
    let node = this.root;
    while (node !== null) {
      if (value === node.root) {
        return node;
      } else if (value < node.root) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return null;
  }
  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
    let queue = [];
    if (this.root) queue.push(this.root);
    while (queue.length) {
      let element = queue.shift();
      callback(element);
      if (element.left) queue.push(element.left);
      if (element.right) queue.push(element.right);
    }
  }
  levelOrderRecursion(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
    const traverse = (node, level) => {
      if (!node) return null;
      if (!levels[level]) levels[level] = [];
      levels[level].push(node);
      traverse(node.left, level + 1);
      traverse(node.right, level + 1);
    };
    let levels = [];
    traverse(this.root, 0);
    for (let level of levels) {
      for (let node of level) {
        callback(node);
      }
    }
  }
  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
    const traverse = (node) => {
      if (!node) return;
      callback(node);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.root);
  }
  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      callback(node);
      traverse(node.right);
    };
    traverse(this.root);
  }
  postOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      callback(node);
    };
    traverse(this.root);
  }
  height(value) {
    let node = this.root;
    let height = 0;
    while (node) {
      if (value === node.value) {
        while (node) {
          height++;
        }
      } else if (value < node.value) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
  }
  getHeight(value) {
    let node = this.root;
    while (node !== null) {
      if (value < node.value) {
        node = node.left;
      } else if (value > node.value) {
        node = node.right;
      } else {
        break;
      }
    }
    if (!node) return -1;
    const height = (node) => {
      if (!node) return -1;
      const left = height(node.left);
      const right = height(node.right);
      return Math.max(left, right) + 1;
    };

    return height(node);
  }
  depth(value) {
    let node = this.root;
    let depth = 0;
    while (node !== null) {
      if (value < node.root) {
        node = node.left;
        depth++;
      } else if (value > node.root) {
        node = node.right;
        depth++;
      } else {
        return depth;
      }
    }
    if (!node) return -1;
  }
  isBalanced() {
    const height = (node) => {
      if (!node) return 0;
      const leftHeight = height(node.left);
      if (leftHeight === -1) return -1;
      const rightHeight = height(node.right);
      if (rightHeight === -1) return -1;
      if (Math.abs(leftHeight - rightHeight) > 1) return -1;
      return Math.max(leftHeight, rightHeight) + 1;
    };
    return height(this.root) !== -1;
  }
  rebalance() {
    const newTree = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      newTree.push(node.value);
      traverse(node.right);
    };
    traverse(this.root);
    newTree.sort((a, b) => a - b);
    this.root = this.buildTree(newTree);
  }
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.root}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
function generateTab() {
  const tab = [];
  for (let i = 0; i < 100; i++) {
    tab.push(Math.floor(Math.random() * 100) + 1);
  }
  return tab;
}
const tree = new Tree(generateTab());
// tree.insert(10);
// tree.deleteItem(67);
tree.levelOrder((node) => {
  console.log(node.root);
});
tree.levelOrderRecursion((node) => {
  console.log("recursion" + node.root);
});
tree.preOrder((node) => {
  console.log("preOrder" + node.root);
});
tree.inOrder((node) => {
  console.log("inOrder" + node.root);
});
tree.postOrder((node) => {
  console.log("postOrder" + node.root);
});
prettyPrint(tree.root);
console.log("HEIGHT " + tree.getHeight(23));
console.log("DEPTH " + tree.depth(123412312));
console.log("Balanced " + tree.isBalanced());
tree.insert(120);
tree.insert(130);
tree.insert(140);
tree.insert(510);
tree.insert(106);
console.log("Balanced " + tree.isBalanced());
tree.rebalance();
console.log("Balanced " + tree.isBalanced());
