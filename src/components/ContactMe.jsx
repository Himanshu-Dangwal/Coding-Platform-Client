import React, { useState } from 'react';
import "../styles/ContactMe.css"

const ContactMe = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulate sending the email
        if (formData.name && formData.email && formData.message) {
            setSuccessMessage('Your message has been sent successfully!');
            setErrorMessage('');
            setFormData({ name: '', email: '', message: '' });
        } else {
            setErrorMessage('Please fill in all fields.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="container my-5" style={{ marginTop: '80px' }}>
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light margin-top" >
                        <h2 className="text-center mb-4 display-4 fw-bold text-success">Get in Touch</h2>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea
                                className="form-control"
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Send Message</button>
                    </form>
                    {successMessage && <p className="text-success mt-3">{successMessage}</p>}
                    {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default ContactMe;
