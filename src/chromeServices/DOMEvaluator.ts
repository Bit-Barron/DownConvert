import { DOMMessage, DOMMessageResponse } from '../types';

window.onload = function () {
  const getImage = document.querySelector('img');
  console.log(`content loaded`);
  console.log(getImage)
  if (getImage === null) console.log('dont find any images on this side');
  
};
