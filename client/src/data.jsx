// Description: This file contains all the data that is used in the application.

//brand logo
import logo from './assets/images/logo.gif';

//contact us icons
import {FiMail, FiMapPin } from "react-icons/fi";
import {FaPhoneAlt} from "react-icons/fa";

//footer photos
import charity from './assets/images/footer/registered-charity.png';

//hero photos
import hero1 from './assets/images/hero/hero1.jpg';
import hero2 from './assets/images/hero/hero2.jpg';
import hero3 from './assets/images/hero/hero3.jpg';

//about photos
//import jodi from './assets/images/about/jodi.jpg';
import suyash from './assets/images/about/suyash.jpg';
import yukitoshi from './assets/images/about/Yuki.jpg';

import myer from './assets/images/about/myer_logo.webp';
import nova from './assets/images/about/nova.png';
import nsw from './assets/images/about/nsw-gov.png';
import smh from './assets/images/about/smh.jpg';
import casino from './assets/images/about/star-casino.png';
import coles from './assets/images/about/coles.jpg';
import staff from './assets/images/about/StaffGroup.jpg';


//dogs photos

//cats photos

//birds photos

// hero photos
export const heros = [ hero1, hero2, hero3 ];

export const about = {
  title: 'ABOUT US',
  heading:
    'For the past 60 years pet palace has been embracing a brighter future for animals in need.',
  paragraphs: [
    'Pet Palace is a non-profit organization that is dedicated to creating a brighter future for animals in need. We have been working hard to provide a safe and loving environment for animals for the past 60 years. Our mission is to help animals find their forever homes and to provide them with the care and support they need to thrive.',
    'We believe that every animal deserves a second chance at life, and we are committed to helping them find it. We work with local shelters and rescue groups to find homes for animals in need, and we provide them with the medical care and support they need to recover and thrive.',
    'A key focus of Animal Welfare League Queensland is to raise the value of animals in society so that the intrinsic needs of each species are recognised, respected and met. Just as importantly, we will:',
    'Our team of dedicated volunteers and staff work tirelessly to provide the best possible care for the animals in our care. We are committed to creating a safe and loving environment for all animals, and we are proud to be a part of the Pet Palace family.',
    "To think of animals facing an uncertain future, their loneliness and fear - this is our motivation. Our goals are ambitious - we don't turn away animals who are suffering; we don't euthanise animals because they are old or require treatment. Our model is different and we are incredibly proud of this.",
  ],

  commitments: [
    'Continue to keep our promise to never euthanise a healthy, sociable or treatable animal in our care',
    'Provide stray and homeless animals a second chance at life through innovative rehoming strategies',
    'Prevent the birth of unwanted kittens and puppies through our National Desexing Network',
    'Increase the number of Councils participating in our Cooperative Desexing Programs',
    'Work with Councils to improve the living conditions of animals and introduce our Getting to Zero model',
    'Keep people and their pets together by providing charitable support through our Community Vet Clinics',
    'Through the Golden Hearts™ Program support seniors through every step of pet ownership',
    "Improve the community's attitude toward all animals through education",
    'Find a positive solution for un-owned cats',
  ],
  team: {
    members: [
      {
        name: 'Jodi Lee',
        role: 'CEO',
        pic: 'jodi',
      },
      {
        name: 'Suyash Maharjan',
        role: 'Rescue Manager',
        pic: suyash,
      },
      {
        name: 'Yukitoshi ',
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
  registration: {
    registrationBoard: 'Australian CAN',
    pic: charity,
  },
  copyright: '\u{00A9} 2024 Pet Palace - edX Coding Bootcamp @The University of Sydney',
  slogan: 'A brighter future for animals in need'
};


export const header = {
  //logo
  companyLogo: {
    pic: logo,
    name: 'Pet Palace'
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
    }
  ]
}

export const contact = {
  title: 'CONTACT US',
  subtitle: 'If you have any questions or concerns, please feel free to contact us. We are here to help you and your pet in any way we can. You can reach us by phone, email, or by visiting our office. Our friendly staff are always happy to help and will do their best to answer any questions you may have. We look forward to hearing from you!',
  icon: {
    mail: <FiMail/>,
    phone: <FaPhoneAlt/> ,
    map: <FiMapPin/>,
  },
  location: {
    title: 'Our Locations',
    locations: [
      {
        location: 'Head Office',
        email: 'info@sydney.petpalace.org.au',
        number: '1800 000 000',
        address: '123 Unnamed Road, Sydney, NSW 2000',
      },
      {
        location: 'Melbourne Branch',
        email: 'info@melbourne.petpalace.org.au',
        number: '1800 000 001',
        address: '123 Unnamed Street, North Melbourne, VIC 3051',
      },
      {
        location: 'Brisbane Branch',
        email: 'info@brisbane.petpalace.org.au',
        number: '1800 000 002',
        address: '123 Haven Crescent, Brisbane, QLD 4000',
      }
    ]
  }
  
}