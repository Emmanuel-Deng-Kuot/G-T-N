import dummyjson from 'dummy-json';

// Example helper functions for generating dummy data

export const generateDummyUsers = (count = 5) => {
  const template = `
  {{#repeat ${count}}}
  {
    "id": {{@index}},
    "name": "{{firstName}} {{lastName}}",
    "email": "{{email}}",
    "avatar": "https://i.pravatar.cc/150?img={{@index}}",
    "role": "{{random 'admin' 'user' 'moderator'}}",
    "joined": "{{date '2020-01-01' '2024-12-31'}}"
  }
  {{/repeat}}
  `;
  
  return dummyjson.parse(template);
};

export const generateDummyProducts = (count = 10) => {
  const template = `
  {{#repeat ${count}}}
  {
    "id": {{@index}},
    "name": "{{company}} {{product}}",
    "price": {{float 10 500 '2.2'}},
    "category": "{{random 'Electronics' 'Clothing' 'Home' 'Sports'}}",
    "rating": {{float 1 5 '1.1'}},
    "inStock": {{boolean}},
    "description": "{{lorem 3}}"
  }
  {{/repeat}}
  `;
  
  return dummyjson.parse(template);
};

export const generateDummyPosts = (count = 5) => {
  const template = `
  {{#repeat ${count}}}
  {
    "id": {{@index}},
    "title": "{{lorem 1}}",
    "content": "{{lorem 5}}",
    "author": "{{firstName}} {{lastName}}",
    "date": "{{date '2024-01-01' '2024-12-31'}}",
    "likes": {{int 0 1000}},
    "tags": [
      "{{random 'tech' 'lifestyle' 'news' 'tutorial'}}",
      "{{random 'react' 'javascript' 'design' 'web'}}"
    ]
  }
  {{/repeat}}
  `;
  
  return dummyjson.parse(template);
};

// Custom template generator
export const generateFromTemplate = (template) => {
  return dummyjson.parse(template);
};
