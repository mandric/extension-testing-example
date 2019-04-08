import browser from './browser.js';
import React from 'react';
import ReactDOM from 'react-dom';

class Popup extends React.Component {
    reloadExtension() {
        browser.runtime.reload();
    }

    openTests() {
        window.open(browser.extension.getURL("test.html"), '_blank');
    }

    render() {
        return <div>
            <button onClick={this.reloadExtension.bind(this)}>
                reload
            </button>
            {DEVELOPMENT ?
	     <button onClick={this.openTests.bind(this)}>
                 tests
             </button> :
             []
            }
        </div>;
    }
}


// render the page

ReactDOM.render(
  <Popup />,
  document.getElementById('popup')
);
