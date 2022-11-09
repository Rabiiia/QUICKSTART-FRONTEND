import React from 'react';

function Contact({address}) {
    return (
        <div>
            <h1>Contacts</h1>
            <h3>{address.name}</h3>
            <p>{address.street}</p>
            <p>{address.town}</p>
            <p>{address.country}</p>
        </div>
    );
}

export default Contact;
