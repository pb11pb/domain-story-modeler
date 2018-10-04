'use strict';

import Replace from '../Replace';
import { assign } from 'min-dash';

var modeling;
var type;
var persistentElement;

export function setCustomIconParameters(element,typeIn, modelingIn) {
  persistentElement = element;
  type = typeIn;
  modeling=modelingIn;
}

export function setNewSVGAndReplace(svgImport) {
  var svgUpload = svgImport;

  var replace = new Replace(modeling);
  var replaceElement = replace.replaceElement;
  var newElement = replaceElement(persistentElement, type, modeling);
  assign(newElement.businessObject, {
    svg: svgUpload
  });
}