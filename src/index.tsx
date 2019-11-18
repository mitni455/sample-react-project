import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * @import Libraries
 */

/**
 * @import Pages
 */
import HomePage from './pages/HomePage';



const renderApp = () => {

	ReactDOM.render(
		(<div>
            <HomePage />
		</div>), 
		document.getElementById('root')
    );
    
}




const run = async () => {
	
	renderApp();

}

run()
	.catch()
