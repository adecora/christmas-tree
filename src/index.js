import './tree.js';
import './lights.js';

// Parent-accepted modules, the changed module should have and update handler
// in every branch of its dependency graph.
// tree.js module is actually imported in lights.js and in index.js
if (module.hot) {
  module.hot.accept(['./tree.js']);
}