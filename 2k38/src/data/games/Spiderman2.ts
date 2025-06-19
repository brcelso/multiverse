export const spiderman2 = {
  launchDate: '2023-10-12', // coloquei a data aproximada de lançamento em outubro 2023

  Brazil: {
    'March 2025': [
      {
        edition: 'Standard Edition',
        price: 199.44,
        discount: 43,
        currency: 'R$',
        basePrice: 349.9, // base estimada a partir do desconto e preço atual
        exchangeTax: 4.99, // mantive o mesmo padrão do outro objeto
      },
    ],
    'February 2025': [
      {
        edition: 'Deluxe Edition',
        price: 247.69,
        discount: 38,
        currency: 'R$',
        basePrice: 399.5,
        exchangeTax: 4.99,
      },
    ],
    'October 2023': [
      {
        edition: 'Deluxe Edition',
        price: 399.5,
        currency: 'R$',
        exchangeTax: 4.99,
      },
      {
        edition: 'Standard Edition',
        price: 349.9,
        currency: 'R$',
        exchangeTax: 4.99,
      },
    ],
  },

  UnitedStates: {
    'February 2025': [
      {
        edition: 'Deluxe Edition',
        price: 49.59,
        discount: 38,
        currency: '$',
      },
    ],
    'October 2023': [
      {
        edition: 'Deluxe Edition',
        price: 79.99,
        currency: '$',
      },
      {
        edition: 'Standard Edition',
        price: 69.99,
        currency: '$',
      },
    ],
  },

  Europe: {
    'February 2025': [
      {
        edition: 'Deluxe Edition',
        price: 59.39,
        discount: 34,
        currency: '€',
      },
    ],
    'October 2023': [
      {
        edition: 'Deluxe Edition',
        price: 89.99,
        currency: '€',
      },
      {
        edition: 'Standard Edition',
        price: 79.99,
        currency: '€',
      },
    ],
  },
};
