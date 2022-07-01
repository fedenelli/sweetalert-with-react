import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import transformer, { bindActions } from '@sweetalert/transformer';

/*
 * Convert <Element /> to pure DOM node using ReactDOM
 * (remember that ReactDOM.render() is async!)
 */
const getDOMNodeFromJSX = (Element) => {
  const wrapper = document.createElement('div');
  const root = createRoot(wrapper);

  return new Promise((resolve) => {
    function AppWithCallbackAfterRender() {
      useEffect(() => {
        const el = wrapper.firstChild;

        return resolve(el);
      });
    
      return Element
    }

    root.render(<AppWithCallbackAfterRender />, root);
  });
};

const swal = (...params) => (
  transformer(params, {
    identifier: React.isValidElement,
    transformer: getDOMNodeFromJSX, 
  })
);

bindActions(swal);

export default swal;

