'use strict';

import Replace from '../Replace';
import { assign } from 'min-dash';

var modeling;
var type;
var persistentElement;
var customSVG;

export function setCustomIconParameters(element,typeIn, modelingIn) {
  persistentElement = element;
  type = typeIn;
  modeling=modelingIn;
}

export function setNewSVGAndReplace(svgImport) {
  customSVG = svgImport;

  var replace = new Replace(modeling);
  var replaceElement = replace.replaceElement;
  var newElement = replaceElement(persistentElement, type, modeling);
  assign(newElement.businessObject, {
    svg: customSVG
  });
}

export function getCustomSVG() {
  return customSVG;
}