'use strict';

import Replace from '../Replace';

var svgUpload;
var modeling;
var type;
var persistentElement;

export function setCustomIconParameters(element,typeIn, modelingIn) {
  persistentElement = element;
  type = typeIn;
  modeling=modelingIn;
}

export function setNewSVGAndReplace(svgImport) {
  svgUpload = svgImport;

  var replace = new Replace(modeling);
  var replaceElement = replace.replaceElement;
  replaceElement(persistentElement, type, modeling);
}

export function getNewSVG() {
  return svgUpload;
}