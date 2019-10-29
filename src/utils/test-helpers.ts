import checkPropTypes from 'check-prop-types';

export const checkProps = (component: any, props: any) => {

    if (!component.propTypes)
    {
        throw new Error("static property 'propTypes' is missing from component '" + component.name + "'");
    }
    const propErrors = checkPropTypes(component.propTypes, props, 'props', component.name);
    return propErrors;
}