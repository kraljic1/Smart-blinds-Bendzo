import React from 'react';
import ErrorIcon from './ErrorIcon';
import SuggestionIcon from './SuggestionIcon';

interface PhoneValidationFeedbackProps {
 errorMessage?: string | null;
 suggestionMessage?: string | null;
}

const PhoneValidationFeedback: React.FC<PhoneValidationFeedbackProps> = ({
 errorMessage,
 suggestionMessage
}) => {
 return (
 <>
 {errorMessage && (
 <div id="phoneNumber-error"className="field-error"role="alert">
 <ErrorIcon />
 {errorMessage}
 </div>
 )}
 
 {suggestionMessage && !errorMessage && (
 <div className="field-suggestion">
 <SuggestionIcon />
 {suggestionMessage}
 </div>
 )}
 </>
 );
};

export default PhoneValidationFeedback; 