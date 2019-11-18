import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from '@storybook/react/demo';


/**
 * @optional Decorator
 * @param {String} categoryName - the tab name 
 * @param {Function:JSX.Element} storyFn - story function that returns JSX Element 
 */
const OptionalDecorator = (storyFn) => {
    return (<section>
        {storyFn()}
    </section>)
}

/**
 * Story Category
 * @param {String} categoryName - the tab name 
 * @param {NodeModule} module - no diea what this does? 
 */
const stories = storiesOf('Category', module);

/** 
 * Stories 
 * @name add 
 * @param {string} storyName - story name which is the name of the tab 
 * @param {Function:JSX.Element} fn - returns the react element 
 */
stories
    .addDecorator(OptionalDecorator) // <--- this is optional 
    .add('Actions addon', ()=>{
        return (<Button onClick={action('on click')}> 
            <span>
                Cool
            </span>
        </Button>)
    })
