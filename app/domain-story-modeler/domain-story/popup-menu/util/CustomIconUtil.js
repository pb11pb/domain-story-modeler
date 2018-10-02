'use strict';

import Replace from '../Replace';

var svgUpload;
var modeling;
var type;
var persistentElement;

export function setPrivateParameters(element,typeIn, modelingIn) {
  persistentElement = element;
  type = typeIn;
  modeling=modelingIn;
}

export function setNewSVGAndReplace(svgImport) {
  svgUpload = svgImport;

  var replace = new Replace(modeling);
  var replaceElement = replace.replaceElement;
  var ret = replaceElement(persistentElement, type, modeling);
  console.log(ret);
}

export function getNewSVG() {
  return svgUpload;
}