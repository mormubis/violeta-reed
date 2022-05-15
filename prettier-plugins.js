const merge = require('deepmerge');
const tailwindPlugin = require('sort-classes');
const tidyImportsPlugin = require('tidy-imports');

module.exports = merge(tidyImportsPlugin, tailwindPlugin);
