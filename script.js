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
    while (true) {
      if (value < node.root) {
        node = node.left;
      } else if (value > node.root) {
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
    return height(node, 0);
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
    const check = (node) => {
      let next = null;
      if (node.left && node.right) return true;
      if (!node.left && node.right) {
        next = node.right;
        if (next.left || node.right) return false;
      } else if (node.left && !node.right) {
        next = node.left;
        if (next.left || node.right) return false;
      } else {
        return true;
      }
    };
    const traverse = (node) => {
      if (!node) return;
      if (!check(node)) return false;
      if (!traverse(node.left)) return false;
      if (!traverse(node.right)) return false;
      return true;
    };
    return traverse(this.root);
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

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
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
console.log("depth " + tree.depth(123412312));
console.log(tree.isBalanced());
