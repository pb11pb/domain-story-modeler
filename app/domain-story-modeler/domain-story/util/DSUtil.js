'use strict';

import { is } from 'bpmn-js/lib/util/ModelUtil';

import { getAllObjectsFromCanvas } from './AppUtil';

var activityDictionary = [];

// creates a SVG path that describes a rectangle which encloses the given shape.
export function getRectPath(shape) {
  var offset = 5;
  var x = shape.x,
      y = shape.y,
      width = (shape.width / 2) + offset,
      height = (shape.height / 2) + offset;

  var rectPath = [
    ['M', x, y],
    ['l', width, 0],
    ['l', width, height],
    ['l', -width, height],
    ['l', -width, 0],
    ['z']
  ];
  return rectPath;
}

// type-checking functions
// check element type
export function isDomainStory(element) {
  return element && /domainStory:/.test(element.type);
}

// check if element is of type domainStory:group
export function isDomainStoryGroup(element) {
  return element && /domainStory:group/.test(element.type);
}

// check if element parent is of type domainStory:group
export function isInDomainStoryGroup(element) {
  return isDomainStoryGroup(element.parent);
}

export function ifDomainStoryElement(fn) {
  return function(event) {
    var context = event.context,
        element = context.shape || context.connection;

    if (isDomainStory(element)) {
      fn(event);
    }
  };
}

export function isDomainStoryElement(element) {
  return is(element, 'domainStory:actorPerson') ||
    is(element, 'domainStory:actorGroup') ||
    is(element, 'domainStory:actorSystem') ||
    is(element, 'domainStory:workObject') ||
    is(element, 'domainStory:workObjectFolder') ||
    is(element, 'domainStory:workObjectCall') ||
    is(element, 'domainStory:workObjectEmail') ||
    is(element, 'domainStory:workObjectBubble') ||
    is(element, 'domainStory:activity') ||
    is(element, 'domainStory:connection') ||
    is(element, 'domainStory:group') ||
    is(element, 'domainStory:workObjectInfo');
}

// dictionary Getter & Setter
export function getActivityDictionary() {
  return activityDictionary.slice();
}

export function setActivityDictionary(stash) {
  activityDictionary = stash;
  activityDictionary.sort(function(a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });
}

export function cleanActicityDictionary(canvas) {
  activityDictionary=[];
  var allObjects = getAllObjectsFromCanvas(canvas);
  allObjects.forEach(element => {
    var name=element.businessObject.name;
    if (name.length > 0 && element.type.includes('domainStory:activity') && !activityDictionary.includes(name)) {
      activityDictionary.push(name);
    }
  });
  activityDictionary.sort(function(a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });
}

// Math fucntions
// calculate the angle between two points in 2D
export function calculateDeg(startPoint, endPoint) {
  var quadrant = 0;

  // determine in which quadrant we are
  if (startPoint.x <= endPoint.x) {
    if (startPoint.y >= endPoint.y)
      quadrant = 0; // upper right quadrant
    else quadrant = 3; // lower right quadrant
  }
  else {
    if (startPoint.y >= endPoint.y)
      quadrant = 1; // upper left uadrant
    else quadrant = 2; // lower left quadrant
  }

  var adjacenten = Math.abs(startPoint.y - endPoint.y);
  var opposite = Math.abs(startPoint.x - endPoint.x);

  // since the arcus-tangens only gives values between 0 and 90, we have to adjust for the quadrant we are in

  if (quadrant == 0) {
    return 90 - Math.degrees(Math.atan2(opposite, adjacenten));
  }
  if (quadrant == 1) {
    return 90 + Math.degrees(Math.atan2(opposite, adjacenten));
  }
  if (quadrant == 2) {
    return 270 - Math.degrees(Math.atan2(opposite, adjacenten));
  }
  if (quadrant == 3) {
    return 270 + Math.degrees(Math.atan2(opposite, adjacenten));
  }
}

// convert rad to deg
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

// approximate the width of the label text, standard fontsize: 11
export function calculateTextWidth(text) {
  var fontsize = text.length * 5.1;
  fontsize = fontsize / 2;
  // add an initial offset, since the calculateXY Position gives the absolute middle of the activity and we want the start directly under the number
  fontsize += 20;
  return fontsize;
}

// -- helpers --//

export function copyWaypoints(connection) {
  return connection.waypoints.map(function(p) {
    if (p.original) {
      return {
        original: {
          x: p.original.x,
          y: p.original.y
        },
        x: p.x,
        y: p.y
      };
    } else {
      return {
        x: p.x,
        y: p.y
      };
    }
  });
}

/**
 * copied from https://www.w3schools.com/howto/howto_js_autocomplete.asp on 18.09.2018
 */
export function autocomplete(inp, arr, element) {
  closeAllLists();

  /* the autocomplete function takes three arguments,
  the text field element and an array of possible autocompleted values and an optional element to which it is appended:*/
  var currentFocus;
  /* execute a function when someone writes in the text field:*/
  inp.addEventListener('input', function(e) {
    /* the direct editing field of actors and workobjects is a recycled html-element and has old values that need to be overridden*/
    if (element.type.includes('domainStory:workObject')) {
      this.value = this.innerHTML;
    }
    var autocompleteList, autocompleteItem, val = this.value;
    /* close any already open lists of autocompleted values*/
    closeAllLists();
    currentFocus = -1;
    /* create a DIV element that will contain the items (values):*/
    autocompleteList = document.createElement('DIV');
    autocompleteList.setAttribute('id', 'autocomplete-list');
    autocompleteList.setAttribute('class', 'autocomplete-items');
    /* append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(autocompleteList);
    /* for each item in the array...*/
    for (const name of arr) {
      /* check if the item starts with the same letters as the text field value:*/
      if (name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /* create a DIV element for each matching element:*/
        autocompleteItem = document.createElement('DIV');
        /* make the matching letters bold:*/
        autocompleteItem.innerHTML = '<strong>' + name.substr(0, val.length) + '</strong>' + name.substr(val.length);
        /* insert an input field that will hold the current name:*/
        autocompleteItem.innerHTML += '<input type=\'hidden\' value=\'' + name + '\'>';
        /* execute a function when someone clicks on the item (DIV element):*/
        autocompleteItem.addEventListener('click', function(e) {
          /* insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName('input')[0].value;
          inp.innerHTML = this.getElementsByTagName('input')[0].value;
          /* close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        autocompleteList.appendChild(autocompleteItem);
      }
    }
    // if we edit an actor, we do not want auto-complete, since actors generally are unique
    if (element.type.includes('domainStory:actor')) {
      autocompleteList.style.visibility = 'hidden';
    }
  });

  /* execute a function presses a key on the keyboard:*/
  inp.addEventListener('keydown', function(e) {
    var autocompleteList = document.getElementById('autocomplete-list');
    if (e.keyCode == 40) {
      /* If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /* and and make the current item more visible:*/
      addActive(autocompleteList);
    } else if (e.keyCode == 38) { // up
      /* If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /* and and make the current item more visible:*/
      addActive(autocompleteList);
    } else if (e.keyCode == 13) {
      /* If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /* and simulate a click on the "active" item:*/
        if (autocompleteList) autocompleteList[currentFocus].click();
      }
    }
  });

  function addActive(autocompleteList) {
    /* a function to classify an item as "active":*/
    if (!autocompleteList) return false;
    /* start by removing the "active" class on all items:*/
    removeActive(autocompleteList);
    if (currentFocus >= autocompleteList.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (autocompleteList.length - 1);
    /* add class "autocomplete-active":*/
    autocompleteList[currentFocus].classList.add('autocomplete-active');
  }

  function removeActive(autocompleteList) {
    /* a function to remove the "active" class from all autocomplete items:*/
    for (const item of autocompleteList) {
      item.classList.remove('autocomplete-active');
    }
  }

  function closeAllLists(survivor) {
    /* close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var autocompleteList = document.getElementsByClassName('autocomplete-items');
    for (const item of autocompleteList) {
      if (survivor != item && survivor != inp) {
        item.parentNode.removeChild(item);
      }
    }
  }

  /* execute a function when someone clicks in the document:*/
  document.addEventListener('click', function(e) {
    closeAllLists(e.target);
  });
}