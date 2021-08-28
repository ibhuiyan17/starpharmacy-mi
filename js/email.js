const formFields = ['fullname', 'email', 'subject', 'message'];
const baseUrl = 'https://us-central1-starpharmacy-mi.cloudfunctions.net/api';
const sendEmailEndpoint = '/sendemail';

const emailFeatureEnabled = false; // temporary feature flag

sendEmail = () => {
    if (!emailFeatureEnabled) {
        alert('Email feature is not yet enabled :(.');
        return;
    }

    console.log('send clicked');

    if (!formValid()) {
        console.log('invalid form');
        return;
    }
    
    fetch(baseUrl + sendEmailEndpoint, {
        method: 'POST',
        body: JSON.stringify(getFormInputs())
    })
    .then(response => alert(response.status === 200 ? 
        'Inquiry sent to Star Pharmacy. Hang on tight and we will get back to you via email :).' : 
        'Failure to send inquiry :(. Please email directly or give us a call.'));
};

formValid = () => {
    for (const input of formFields) {
        if (!document.getElementById(input).checkValidity()) {
            return false;
        }
    }
    return true;
};

getFormInputs = () => {
    let inputs = {};
    formFields.forEach(input => {
        inputs[input] = document.getElementById(input).value;
    });
    return inputs;
}