import FormHeader from '../FormHeader';
import { ConditionalSections } from './ConditionalSections';
import { BaseFormProps } from './types';

export function FormContent(props: BaseFormProps) {
 return (
 <>
 <FormHeader 
 product={props.product}
 isAccessoryProduct={props.isAccessoryProduct}
 />
 <ConditionalSections {...props} />
 </>
 );
} 