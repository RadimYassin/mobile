
interface Internship {
  id: string;
  title: string;
  company: {
    name: string;
    logo: string;
  };
  location: {
    city: string;
    country: string;
  };
  salary: {
    min: number;
    max: number;
  };
  type: string;
  postedTime: string;
  description: string;
}

export const internships: Internship[] = [
  {
    id: '1',
    title: 'Graphic Designer',
    company: {
      name: 'Microsoft Corporation',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
    },
    location: {
      city: 'Marrakech',
      country: 'Morocco',
    },
    salary: {
      min: 900,
      max: 1000,
    },
    type: 'In-office',
    postedTime: '1 month ago',
    description: 'We are looking for a talented Graphic Designer to create engaging and on-brand graphics for a variety of digital and print media.',
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: {
      name: 'Apple Inc.',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png',
    },
    location: {
      city: 'Rabat',
      country: 'Morocco',
    },
    salary: {
      min: 1200,
      max: 1500,
    },
    type: 'Remote',
    postedTime: '2 weeks ago',
    description: 'Join our team to build and maintain user interfaces for our web applications using React and TypeScript.',
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: {
      name: 'Google LLC',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png',
    },
    location: {
      city: 'Casablanca',
      country: 'Morocco',
    },
    salary: {
      min: 1000,
      max: 1300,
    },
    type: 'Hybrid',
    postedTime: '3 days ago',
    description: 'Design user-centered interfaces and experiences for our products, focusing on usability and accessibility.',
  },
  {
    id: '4',
    title: 'Backend Developer',
    company: {
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
    },
    location: {
      city: 'Tangier',
      country: 'Morocco',
    },
    salary: {
      min: 1100,
      max: 1400,
    },
    type: 'In-office',
    postedTime: '1 week ago',
    description: 'Develop server-side logic, APIs, and database integrations for our e-commerce platform.',
  },
  {
    id: '5',
    title: 'Marketing Intern',
    company: {
      name: 'Meta',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1280px-Meta_Platforms_Inc._logo.svg.png',
    },
    location: {
      city: 'Agadir',
      country: 'Morocco',
    },
    salary: {
      min: 800,
      max: 950,
    },
    type: 'Remote',
    postedTime: '5 days ago',
    description: 'Support our marketing team in creating and executing digital marketing campaigns across various platforms.',
  },
];