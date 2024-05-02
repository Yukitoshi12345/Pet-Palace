import { useRef, useState } from 'react';
import { contact } from '../data';
import { validateEmail } from '../utils/helpers';
import emailjs from '@emailjs/browser';
// Use "dotenv" to access environment variables from a `.env` file
//import 'dotenv/config';

const Contact = () => {
  // Create state variables for the fields in the form
  // We are also setting their initial values to an empty string
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const form = useRef();
  const SERVICE_ID = '';
  const TEMPLATE_ID = '';
  const USER_ID = '';

  //handle input blur
  const handleInputBlur = (e) => {
    switch (e.target.name) {
      case 'email':
        if (!email) {
          setErrorMessage('Email is required');
        } else if (!validateEmail(email)) {
          setErrorMessage('Invalid email');
        } else {
          setErrorMessage('');
        }
        break;
      case 'name':
        if (!name) {
          setErrorMessage('Name is required');
        } else {
          setErrorMessage('');
        }
        break;
      case 'message':
        if (!message) {
          setErrorMessage('Message is required');
        } else {
          setErrorMessage('');
        }
        break;
      default:
        break;
    }
  };
  //based on the name of the input field, update the corresponding state variable
  const handleInputChange = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'name':
        setName(e.target.value);
        break;
      case 'subject':
        setSubject(e.target.value);
        break;
      case 'message':
        setMessage(e.target.value);
        break;
      default:
        break;
    }
  };

  // Handle the form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        form.current,
        USER_ID,
      );
      if (result.text === 'OK') {
        alert(
          'Message received successfully!\nThank you for reaching out to us. We will get back to you as soon as possible.📧🙏',
        );
        setEmail('');
        setName('');
        setSubject('');
        setMessage('');
      }
    } catch (err) {
      console.log(err.text);
      alert('An error occurred, Please try again later');
    }
  };

  return (
    <section className="section bg-leather" id="contact">
      {/* section title  */}
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <h2 className=" section-title before:content-contact relative before:absolute before:opacity-25 before:-top-7 before:-left-40 before:hidden before:lg:block">
            {contact.title}
          </h2>
          <p className="subtitle">{contact.subtitle}</p>
        </div>
        <div className="flex flex-col lg:gap-x-8 lg:flex-row ">
          {/* contact info */}
          <div className="flex flex-1 flex-col items-start space-y-8 mb-12 lg:mb-0 lg:pt-2">
            <div className=" flex items-center justify-center gap-4">
              <span className='text-accent text-4xl'>{contact.icon.map}</span>
              <h4 className=" text-2xl m-0">{contact.location.title}</h4>
            </div>
            <div className='divide-y-2'>
              {
                contact.location.locations.map((location, index) => (
                  <div key={index} className="flex flex-col gap-2 p-3">
                    <h5 className="text-xl m-0">{location.location}</h5>
                    <div className="text-lg m-0 flex items-center gap-2">
                      {contact.icon.mail}
                      <a href="{location.email}">{location.email}</a>
                    </div>
                    <div className="text-lg m-0 flex items-center gap-2">
                      {contact.icon.phone}
                      <a href="tel:{location.number}">{location.number}</a>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          {/* contact form */}
          <form ref={form} className="space-y-8 w-full max-w-[780px]">
            <span className="italic text-sm">
              Fields marked with * are required
            </span>
            <div className="flex gap-8">
              <input
                type="text"
                className="input "
                placeholder="Your name *"
                name="name"
                value={name}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              <input
                type="email"
                className="input"
                placeholder="Your email *"
                name="email"
                value={email}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </div>
            <input
              type="text"
              className="input"
              placeholder="Subject"
              name="subject"
              value={subject}
              onChange={handleInputChange}
            />
            <textarea
              className="textarea"
              placeholder="Your message *"
              name="message"
              value={message}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            ></textarea>
            {errorMessage && (
              <p className="text-red-500 text-md italic">{errorMessage}</p>
            )}
            <button
              type="button"
              className="btn btn-lg bg-accent"
              onClick={handleFormSubmit}
              disabled={!email || !name || !message || !validateEmail(email)}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
