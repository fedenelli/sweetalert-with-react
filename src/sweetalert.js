import React, { useEffect } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

import transformer, { bindActions } from '@sweetalert/transformer';

/*
 * Convert <Element /> to pure DOM node using ReactDOM
 * (remember that ReactDOM.render() is async!)
 */
const getDOMNodeFromJSX = async (Element) => {
  const wrapper = document.createElement('div');
  const root = createRoot(wrapper);

  flushSync(root.render(Element));
  
  const el = wrapper.firstChild;
  return el;
};

const swal = (...params) => (
  transformer(params, {
    identifier: React.isValidElement,
    transformer: getDOMNodeFromJSX, 
  })
);

bindActions(swal);

export default swal;

