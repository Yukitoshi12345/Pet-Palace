import { useRef, useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { contact } from '../data';
import Footer from '../components/Footer';
import Alert from '../components/Alert';

const Enquiry = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [previousPets, setPreviousPets] = useState('');
  const [numberOfPets, setNumberOfPets] = useState(1);
  const [location, setLocation] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [donateToday, setDonateToday] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const form = useRef();

  const [address, setAddress] = useState({
    streetAddress: '',
    city: '',
    stateProvince: '',
    postalCode: '',
  });

  const australiaStates = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'];

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevAddress => ({
      ...prevAddress,
      [name]: value
    }));
  };

  // Function to generate time options
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(<option key={time} value={time}>{time}</option>);
      }
    }
    return options;
  };

  const handleInputBlur = (e) => {
    switch (e.target.name) {
      case 'phoneNumber':
        if (!phoneNumber) {
          setErrorMessage('Phone number is required');
        } else {
          setErrorMessage('');
        }
        break;
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
        setNumberOfPets(Math.max(1, parseInt(e.target.value)));
        break;
      case 'location':
        setLocation(e.target.value);
        break;
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
          <h3 className="text-lg text-gray-600 mb-4">Please provide additional details in the form below.</h3>
        </div>
        <div className="flex flex-col lg:gap-x-8 lg:flex-row ">
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
              <select
                className="input"
                value={previousPets}
                onChange={handleInputChange}
                name="previousPets"
              >
                <option value="">Did you have any pets before?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              {previousPets === 'yes' && (
              <input
                type="number"
                className="input"
                placeholder="How many pets do you have in your house?"
                name="numberOfPets"
                value={numberOfPets}
                onChange={handleInputChange}
              />
              )}
            </div>
           
            <div className="flex flex-col lg:gap-x-4 lg:flex-row">
              <div className="flex flex-col space-y-2">
                <label className="block font-semibold">Address *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={address.streetAddress}
                  onChange={handleAddressChange}
                  
                />
                <input
                  type="text"
                  className="input"
                  placeholder="City"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="block font-semibold">&nbsp;</label> {/* Placeholder for alignment */}
                <select
                  className="input"
                  name="stateProvince"
                  value={address.stateProvince}
                  onChange={handleAddressChange}
                >
                  <option value="">Select State/Province *</option>
                  {australiaStates.map((state, index) => (
                    <option key={index} value={state}>{state}</option>
                  ))}
                </select>
                <input
                  type="text"
                  className="input"
                  placeholder="Postal Code"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleAddressChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Please select a branch and book an appointment:</label>
              <select
                className="input"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option value="">Select Branch *</option>
                {contact.location.locations.map((location, index) => (
                  <option key={index} value={location.email}>{location.address}</option>
                ))}
              </select>
            </div>

            <div className="mb-4 flex flex-col lg:flex-row gap-4">
              <div>
                <label className="block font-semibold">Select Appointment Date:</label>
                <input
                  type="date"
                  className="input"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-semibold">Select Appointment Time:</label>
                <select
                  className="input"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">Select Time *</option>
                  {generateTimeOptions()}
                </select>
              </div>
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
