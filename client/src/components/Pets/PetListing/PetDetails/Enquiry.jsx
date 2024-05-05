import { useRef, useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { contact } from '../../../../data';
import Footer from '../../../../components/Footer';
import Alert from '../../../../components/Alert';

const Enquiry = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [previousPets, setPreviousPets] = useState('');
  const [numberOfPets, setNumberOfPets] = useState(0);
  const [location, setLocation] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [donateToday, setDonateToday] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const form = useRef();

  const handleInputBlur = (e) => {
    switch (e.target.name) {
      case 'phoneNumber':
        if (!phoneNumber) {
          setErrorMessage('Phone number is required');
        } else {
          setErrorMessage('');
        }
        break;
      // Add additional cases for other input fields if needed
      default:
        break;
    }
  };

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case 'phoneNumber':
        setPhoneNumber(e.target.value);
        break;
      case 'previousPets':
        setPreviousPets(e.target.value);
        break;
      case 'numberOfPets':
        setNumberOfPets(parseInt(e.target.value));
        break;
      case 'location':
        setLocation(e.target.value);
        break;
      // Add additional cases for other input fields if needed
      default:
        break;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <section className="section flex-col justify-between" id="enquiry">
      <Alert message={contact.successMessage} type="success" show={showSuccess} />
      <Alert message={contact.errorMessage} type="error" show={showError} />
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <h2 className="section-title before:content-enquiry relative before:absolute before:opacity-25 before:-top-7 before:-left-40 before:hidden before:lg:block">
            Enquiry Form
          </h2>
        </div>
        <div className="flex flex-col lg:gap-x-8 lg:flex-row ">
          <div className="flex flex-1 flex-col items-start space-y-8 mb-12 lg:mb-0 lg:pt-2">
            <div className="divide-y-2">
              <div className="flex flex-col gap-2 p-3">
                <h5 className="text-xl m-0">{contact.location.title}</h5>
                {contact.location.locations.map((location, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="text-lg m-0 flex items-center gap-2">
                      {contact.icon.mail}
                      <a href={`mailto:${location.email}`}>{location.email}</a>
                    </div>
                    <div className="text-lg m-0 flex items-center gap-2">
                      {contact.icon.phone}
                      <a href={`tel:${location.number}`}>{location.number}</a>
                    </div>
                    <div className="text-lg m-0 flex items-center gap-2 italic">
                      <a href={`http://maps.google.com/?q=${location.address}`} target='_blank'>{location.address}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <form ref={form} className="space-y-8 w-full max-w-[780px]">
            <span className="italic text-sm">
              Fields marked with * are required
            </span>
            <div className="flex gap-8">
              <input
                type="tel"
                className="input"
                placeholder="Phone Number *"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                ref={inputRef}
              />
              <input
                type="text"
                className="input"
                placeholder="Did you have any pets before?"
                name="previousPets"
                value={previousPets}
                onChange={handleInputChange}
              />
            </div>
            <input
              type="number"
              className="input"
              placeholder="How many pets do you have in your house?"
              name="numberOfPets"
              value={numberOfPets}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="input"
              placeholder="Where do you live?"
              name="location"
              value={location}
              onChange={handleInputChange}
            />
            <div className="mb-4">
              <label className="block font-semibold">Please book an appointment to visit our centre:</label>
              <input
               type='date'
              />
            </div>
            <div className="mb-4">
              <label htmlFor="donateToday" className="block font-semibold">Would you like to donate today?</label>
              <input
                type="checkbox"
                id="donateToday"
                checked={donateToday}
                onChange={(e) => setDonateToday(e.target.checked)}
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-md italic">{errorMessage}</p>
            )}
            <button
              type="button"
              className="btn btn-lg btn-accent"
              onClick={handleFormSubmit}
            >
              Send Enquiry
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Enquiry;
