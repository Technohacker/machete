module.exports = function createStyleSheet(blocks) {
  var style = document.createElement('style');
  var text = Object.keys(blocks).map(function (selector) {
    return processRuleSet(selector, blocks[selector]);
  }).join('\n');
  
  style.setAttribute('type', 'text/css');
  style.appendChild(document.createTextNode(text));

  return style;
}

function processRuleSet(selector, block) {
  return selector + ' {\n' + processDeclarationBlock(block) + '\n}';
}

function processDeclarationBlock(block) {
  return Object.keys(block).map(function (prop) {
    return processDeclaration(prop, block[prop]);
  }).join('\n');
}

function processDeclaration(prop, value) {
  if (!isNaN(value) && value != 0) {
    value = value + 'px';
  }

  return hyphenate(prop) + ': ' + value + ';';
}

function hyphenate(prop) {
  return prop.replace(/[A-Z]/g, function (match) {
    return '-' + match.toLowerCase();
  });
}
