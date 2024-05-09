// Description: This file contains all the data that is used in the application.
//donation logo
import { BiSolidDonateHeart } from 'react-icons/bi';

//paw icon
import { MdPets } from "react-icons/md";

//header logos
import { FaUserCheck } from "react-icons/fa6"; 
import { FaUserLock } from "react-icons/fa6";
//brand logo
import logo from './assets/images/logo.gif';

//contact us icons
import { FiMail, FiMapPin } from 'react-icons/fi';
import { FaPhoneAlt } from 'react-icons/fa';
import { BsSendArrowUpFill } from 'react-icons/bs';


//error page photo
import dog from './assets/images/error/adopt-me-pet.png';

//about hero photos
import hero1 from './assets/images/about/hero/hero1.jpg';
import hero2 from './assets/images/about/hero/hero2.jpg';
import hero3 from './assets/images/about/hero/hero3.jpg';
import hero4 from './assets/images/about/hero/hero4.jpg';

//about staff photos
import suyash from './assets/images/about/suyash.jpg';
import yukitoshi from './assets/images/about/Yuki.jpg';
import jodie from './assets/images/about/jodie.jpg';

//about sponsors photos
import myer from './assets/images/about/myer_logo.webp';
import nova from './assets/images/about/nova.png';
import nsw from './assets/images/about/nsw-gov.png';
import smh from './assets/images/about/smh.jpg';
import casino from './assets/images/about/star-casino.png';
import coles from './assets/images/about/coles.jpg';
import staff from './assets/images/about/StaffGroup.jpg';


//home photos
import hero from './assets/images/home/pet-adoption.png';
import rego1 from './assets/images/home/acnc.png';
import rego2 from './assets/images/home/ACNC-1.png';



export const about = {
  heros: [hero1, hero2, hero3, hero4],
  title: 'ABOUT US',
  heading:
    'For the past 60 years pet palace has been embracing a brighter future for animals in need.',
  paragraphs: [
    'Pet Palace is a non-profit organization that is dedicated to creating a brighter future for animals in need. We have been working hard to provide a safe and loving environment for animals for the past 60 years. Our mission is to help animals find their forever homes and to provide them with the care and support they need to thrive.',
    'We believe that every animal deserves a second chance at life, and we are committed to helping them find it. We work with local shelters and rescue groups to find homes for animals in need, and we provide them with the medical care and support they need to recover and thrive.',
    'A key focus of Pet Palace is to raise the value of animals in society so that the intrinsic needs of each species are recognised, respected and met. Just as importantly, we will:',
    'Our team of dedicated volunteers and staff work tirelessly to provide the best possible care for the animals in our care. We are committed to creating a safe and loving environment for all animals, and we are proud to be a part of the Pet Palace family.',
    "To think of animals facing an uncertain future, their loneliness and fear - this is our motivation. Our goals are ambitious - we don't turn away animals who are suffering; we don't euthanise animals because they are old or require treatment. Our model is different and we are incredibly proud of this.",
  ],

  commitments: [
    'Maintain our commitment to never euthanise a healthy, sociable, or treatable animal under our care',
    'Offer a new beginning to stray and homeless animals through creative rehoming efforts',
    'Control the population of unwanted kittens and puppies via our National Desexing Network',
    'Expand the number of Councils engaged in our Cooperative Desexing Programs',
    'Collaborate with Councils to enhance animal living conditions and implement our Getting to Zero model',
    'Help keep families and their pets together by offering charitable assistance at our Community Vet Clinics',
    'Support seniors in every aspect of pet ownership through our Golden Hearts™ Program',
    'Foster better community attitudes toward all animals via educational initiatives',
    'Seek constructive outcomes for un-owned cats',
  ],
  team: {
    members: [
      {
        name: 'Jodie Lee',
        role: 'CEO',
        pic: jodie,
      },
      {
        name: 'Suyash Maharjan',
        role: 'Rescue Manager',
        pic: suyash,
      },
      {
        name: 'Yukitoshi Imaizumi-Zhou',
        role: 'Rehoming Manager',
        pic: yukitoshi,
      },
    ],
    heading: 'Our Team',
    photo: staff,
    description:
      'Our team of dedicated volunteers and staff work tirelessly to provide the best possible care for the animals in our care. We are committed to creating a safe and loving environment for all animals, and we are proud to be a part of the Pet Palace family.',
  },
  rehoming: {
    heading: 'Rehoming program',
    paragraphs: [
      'Pet Palace works with councils and the community to improve the outcomes for abandoned and homeless pets. Pet Palace strives to give every animal in need a second chance at life and promises never to euthanise a healthy, sociable or treatable animal in our care. As a result we have one of the lowest euthanasia rates in Australia for a shelter of our size.',
      "Pet Palace's Rehoming Program is one of the most successful in the country, with an average of 120 animals each week being adopted from our Animal Rehoming Centres. Our team of volunteers and animal-care attendants are dedicated to providing a high quality of care and meeting each animals' unique needs through training and enrichment programs. We have had another exciting and progressive year rehoming 6,115 animals through adoption and rescue groups. In addition 3,791 animals were reunited with their owners.",
      "Our team of volunteers and animal-care attendants are dedicated to providing a high quality of care and meeting each animals' unique needs through training and enrichment programs.",
      'Our team of veterinarians, health check, desex, vaccinate and microchip all our animals before they are placed up for adoption. Further treatment is provided to those animals in need before being placed into foster care until they are ready to be adopted.',
      'No time limit is placed on our animals finding a new home - once they arrive in the rehoming centre they are part of our family until they find a loving permanent home. Pet Palace goes the extra mile to ensure that no animal waits too long for a home and has over the years developed many innovative campaigns and promotions that highlight our animals for adoption.',
      'The rehoming of animals in not limited to our Animal Rehoming Centres. We work alongside our external rehoming partners and rescue groups which helped us to achieve even more positive outcomes for animals in our care.',

      'Pet Palace is a registered Deductible Gift Recipient, (registered charity number 422) and is a Member of Australian Charities Foundation.',
    ],
  },
  sponsors: {
    heading: 'Our Sponsors',
    description:
      'Partnerships with companies such as Myer, Nova Entertainment, NSW Government, etc and smaller independents play a huge role in rehoming our animals that may otherwise be overlooked.',
    sponsors: [
      {
        name: 'Myer',
        pic: myer,
      },
      {
        name: 'Nova',
        pic: nova,
      },
      {
        name: 'NSW Government',
        pic: nsw,
      },
      {
        name: 'Sydney Morning Herald',
        pic: smh,
      },
      {
        name: 'The Star Casino',
        pic: casino,
      },
      {
        name: 'Coles',
        pic: coles,
      },
    ],
  },
};

export const footer = {
  logo: {
    brand: 'Pet Palace',
    pic: logo,
  },
  projectMembers: ['Jodie Lee', 'Suyash Maharjan', 'Yukitoshi Imaizumi-Zhou'], 
  copyright: '\u{00A9} 2024 Pet Palace - edX Coding Bootcamp @The University of Sydney',
  slogan: '\u{201c} A brighter future for animals in need \u{201d}'

};

export const header = {
  //logo
  companyLogo: {
    pic: logo,
    name: 'Pet Palace',
  },
  //navigation
  navigation: [
    {
      name: 'home',
      href: '/',
    },
    {
      name: 'about',
      href: '/about',
    },
    {
      name: 'contact',
      href: '/contact',
    },
  ],
  donationIcon: <BiSolidDonateHeart />,
  adopt:{
    btnTitle: 'Adopt A Pet',
    icon: <MdPets />,
  
  },
  userIconLoggedOut: <FaUserLock style={{ fontSize: '2em',  
  marginRight: 5, color: 'A16207', marginTop:'0.5rem' }}/>,
  userIconLoggedIn: <FaUserCheck style={{ fontSize: '2em',  
  marginRight: 5, color: 'A16207', marginTop:'0.5rem' }}/>,
};

export const contact = {
  title: 'CONTACT US',
  subtitle:
    'If you have any questions or concerns, please feel free to contact us. We are here to help you and your pet in any way we can. You can reach us by phone, email, or by visiting our office. Our friendly staff are always happy to help and will do their best to answer any questions you may have. We look forward to hearing from you!',
  icon: {
    mail: <FiMail />,
    phone: <FaPhoneAlt />,
    map: <FiMapPin />,
    send: <BsSendArrowUpFill />,
  },
  location: {
    title: 'Our Locations',
    locations: [
      {
        location: 'Head Office',
        email: 'info@sydney.petpalace.org.au',
        number: '1800 000 000',
        address: '123 Macquaire Street, Sydney, NSW 2000',
      },
      {
        location: 'Melbourne Branch',
        email: 'info@melbourne.petpalace.org.au',
        number: '1800 000 001',
        address: '7 Howard Street, North Melbourne, VIC 3051',
      },
      {
        location: 'Brisbane Branch',
        email: 'info@brisbane.petpalace.org.au',
        number: '1800 000 002',
        address: '2 Burnett Ln, Brisbane, QLD 4000',

      }
    ]
  },
  successMessage: 'Message received successfully. Thank you for reaching out to us. We will get back to you as soon as possible.',
  errorMessage: 'There was an error sending your message. Please try again.'
  
}

export const home = {
  hero: hero,
  plea: 'More than 500 animals desperately need help at our center. You have the power to change a life. It\'s a gift they\'ll never forget',
  donation: 'Donate Now',
  donationIcon: <BiSolidDonateHeart />,
  about: [
    {
      heading: 'Our Mission',
      paragraph:
        'Pet Palace is a non-profit organization that is dedicated to creating a brighter future for animals in need. We have been working hard to provide a safe and loving environment for animals for the past 60 years. Our mission is to help animals find their forever homes and to provide them with the care and support they need to thrive.',
    },
    {
      heading: 'Our Vision',
      paragraph:
        'Our vision is to create a world where every animal is treated with love and respect. We believe that every animal deserves a second chance at life, and we are committed to helping them find it. We work with local shelters and rescue groups to find homes for animals in need, and we provide them with the medical care and support they need to recover and thrive.',
    },
    {
      heading: 'Our Values',
      paragraph:
        'We are committed to creating a safe and loving environment for all animals. We believe that every animal deserves to be treated with kindness and compassion. We are dedicated to providing the best possible care for the animals in our care, and we are proud to be a part of the Pet Palace family.',
    },
  ],
  registrationHeading: 'We are a registered charity with the Australian Charities and Not-for-profits Commission (ACNC)',
  regos: [rego1, rego2],
  featured: 'See our featured pets',
  featuredPets:{
    heading: 'Featured Pets',
    tag: 'featured',
    btn: 'View All Pets',
    icon: <MdPets />
  }
}

export const donation = {
  btnTitle: 'donate now',
  icon: <BiSolidDonateHeart />,
}

export const error = {
  img: dog,
  heading: 'Oops!',
  paragraphs:[
    'Sorry the page you are looking for is not available.',
    'But I am available for adoption.'
  ],
  btn:{
    text: 'Adopt Me',
    icon: <MdPets />,
  },
  logo: logo,
};

//When guest visit the rescue center, 


