import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, object as objectAddOn, array as arrayAddOn, select, radios, optionsKnob, files, date, button as buttonAddOn } from '@storybook/addon-knobs';
import { display, height } from '@material-ui/system';

// import { Button } from '@storybook/react/demo';


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
const stories = storiesOf('Action Addons', module);

/** 
 * Stories 
 * @name add 
 * @param {string} storyName - story name which is the name of the tab 
 * @param {Function:JSX.Element} fn - returns the react element 
 */
var groupId = 'groupId';
stories
    .addDecorator(withKnobs) // <--- add knobs 
    .addDecorator(OptionalDecorator) // <--- this is optional 
    .add('Boolean add ons', ()=>{

        const boolName = 'booleanName', 
            boolValue = true;

        const props = boolean(boolName, boolValue, groupId) ? 'Yes': 'No';    

        return (<section>
            <label>
                Boolean: 
            </label>
            <div>
                {props}
            </div>
        </section>)
    })
    .add('text add ons', ()=>{

        const textName = 'textName', 
            textValue = 'Text Value';

        const props = text(textName, textValue, groupId);            

        return (<section>
            <label>
                textName: 
            </label>
            <div>
                {props}
            </div>
        </section>)
    })
    .add('number add on', ()=>{

        const numberName = 'numberName', 
            numberValue = 50;

        const options = {
            range: true,
            min: 0,
            max: 100,
            step: 1,
        };

        const props = number(numberName, numberValue, options, groupId);

        return (<section>
            <label>
                numberName: 
            </label>
            <div>
                {props}
            </div>
        </section>)
    })
    .add('object add on', ()=>{

        const label = 'Styles';
        const defaultValue = {
            backgroundColor: 'red'
        };

        const obj = objectAddOn(label, defaultValue, groupId);

        return (<section>
            <label>
                objectValue: 
            </label>
            <pre>
                {JSON.stringify(obj)}
            </pre>
        </section>)
    })
    .add('array add on', ()=>{

        const label = 'Styles';
        const defaultValue = [
            'Nick',
            'Mitchell'
        ];
        const separator = ',';

        const array = arrayAddOn(label, defaultValue, separator, groupId);

        return (<section>
            <label>
                array value: 
            </label>
            <pre>
                {array}
            </pre>
        </section>)
    })
    .add('select add on', ()=>{

        const label = 'Colors';
        const options = {
            Red: 'red',
            Blue: 'blue',
            Yellow: 'yellow',
            Rainbow: ['red', 'orange', 'etc'],
            None: null,
        };
        const defaultValue = 'red';

        const value = select(label, options, defaultValue, groupId);

        return (<section>
            <label>
                select: 
            </label>
            <pre>
                {value}
            </pre>
        </section>)
    })
    .add('select add on', ()=>{

        const label = 'Colors';
        const options = {
            Red: 'red',
            Blue: 'blue',
            Yellow: 'yellow',
            Rainbow: ['red', 'orange', 'etc'],
            None: null,
        };
        const defaultValue = 'red';

        const value = select(label, options, defaultValue, groupId);

        return (<section>
            <label>
                select: 
            </label>
            <pre>
                {value}
            </pre>
        </section>)
    })
    .add('radio add on', ()=>{

        const label = 'Fruits';
        const options = {
            Kiwi: 'kiwi',
            Guava: 'guava',
            Watermelon: 'watermelon',
        };
        const defaultValue = 'kiwi';
        // const groupId = 'GROUP-ID1';

        const value = radios(label, options, defaultValue, groupId);

        return (<section>
            <label>
                radio: 
            </label>
            <pre>
                {value}
            </pre>
        </section>)
    })
    .add('options add on', ()=>{

        const label = 'Fruits';
        const valuesObj = {
            Kiwi: 'kiwi',
            Guava: 'guava',
            Watermelon: 'watermelon',
        };
        const defaultValue = 'kiwi';
        const optionsObj = {
            display: 'inline-radio' as const
        };

        const value = optionsKnob(label, valuesObj, defaultValue, optionsObj, groupId);

        return (<section>
            <label>
                option knobs: 
            </label>
            <pre>
                {value}
            </pre>
        </section>)
    })
    .add('date add on', ()=>{

        const label = 'Event Date';
        const defaultValue = new Date('Jan 20 2017');
        const groupId = 'GROUP-ID1';

        const value = date(label, defaultValue, groupId);

        return (<section>
            <label>
                Date knob: 
            </label>
            <pre>
                { `Date: ${new Date(value)}` }
            </pre>
        </section>)
    })
    .add('files add on', ()=>{
        
        const label = 'Images';
        const accept = '.png, .jpeg, .jpg';
        const defaultValue = [];
        const groupId = 'GROUP-ID1';
        
        const value = files(label, accept, defaultValue, groupId);
        
        return (<section style={{display: 'block', height: '100vh'}}>
            <h3>
                files knobs: 
            </h3>
            <p style={{fontStyle: 'italic'}}>
                Upload image with filetype of `.png` or `.jpeg`
            </p>

            <h3>Value as image:</h3>
            <img src={`${value}`} />

            <h3>Value as string:</h3>
            <pre>
                {value}
            </pre>
        </section>)
    });

var clicked = 0;    
stories    
    .add('button add on', ()=>{

        const label = 'Button Add On';

        const handler = () => { return ++clicked };
        

        buttonAddOn(label, handler);

        return (<section>
            <label>
                Button knob: 
            </label>
            <pre>
                { handler() }
            </pre>
        </section>)
    })
    