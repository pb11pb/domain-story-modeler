'use strict';

import Replace from '../Replace';
import { assign } from 'min-dash';

var modeling;
var type;
var persistentElement;
var customSVG;
var customImg;

export function setCustomIconParameters(element,typeIn, modelingIn) {
  persistentElement = element;
  type = typeIn;
  modeling=modelingIn;
}



export function setNewImgAndReplace(imgImport) {
  customImg='<svg viewBox="0 0 24 24" width="48" height="48" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'+
  '<image width="24" height="24" xlink:href="'+ imgImport+ '"/></svg>';

  var replace = new Replace(modeling);
  var replaceElement = replace.replaceElement;
  var newElement = replaceElement(persistentElement, type, modeling);
  assign(newElement.businessObject, {
    img: customImg
  });
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

export function getCustonImg() {
  return customImg;
}

export function getCustomSVG() {
  return customSVG;
}