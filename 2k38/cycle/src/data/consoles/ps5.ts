export const ps5 = {
  launchDate: '2020-11-12',
  Argentina: {
    'March 2025': [
      { edition: 'PS5 Digital', price: 1999999, currency: 'ARS' },
      { edition: 'PS5 Digital', price: 1799999, currency: 'ARS', discount: 10 },
    ],
    'November 2024': [
      { edition: 'PS5 Pro', price: 2499999, currency: 'ARS' },
    ],
    'Converted 2024 Prices': [
      { edition: 'PS5 Standard[old]', price: 1150000, currency: 'ARS' },
      { edition: 'PS5 Standard[old]', price: 999999, currency: 'ARS' },
    ],
    'November 2020': [
      { edition: 'PS5 Digital[old]', price: 75900, currency: 'ARS' },
      { edition: 'PS5 Standard[old]', price: 99999, currency: 'ARS' },
    ],
  },
  Brazil: {
    'June 2025': [
      { edition: 'PS5 Digital', price: 2826, currency: 'R$', discount: 25.6 },
      { edition: 'PS5 Digital', price: 2920.29, currency: 'R$', discount: 23.1 },
    ],
    'May 2025': [
      { edition: 'PS5 Digital', price: 2928, currency: 'R$', discount: 23 },
    ],
    'April 2025': [
      { edition: 'PS5 Pro', price: 5493, currency: 'R$', discount: 21.5 },
    ],
    'March 2025': [
      { edition: 'PS5 Pro', price: 5519.08, currency: 'R$', discount: 21 },
      { edition: 'PS5 Pro', price: 5858.91, currency: 'R$', discount: 16.5 },
      { edition: 'PS5 Standard[old]', price: 3899.9, currency: 'R$', discount: 22 },
      { edition: 'PS5 Digital', price: 3074, currency: 'R$', discount: 20 },
      { edition: 'PS5 Digital', price: 3082.15, currency: 'R$', discount: 20 },
      { edition: 'PS5 Digital', price: 3224.91, currency: 'R$', discount: 15 },
    ],
    'February 2025': [
      { edition: 'PS5 Pro', price: 6209.91, currency: 'R$', discount: 11 },
      { edition: 'PS5 Pro', price: 5775.22, currency: 'R$', discount: 17.5 },
    ],
    'November 2024': [
      { edition: 'PS5 Pro', price: 6509.91, currency: 'R$', discount: 7 },
      { edition: 'PS5 Pro', price: 6999.90, currency: 'R$', 
        basePrice2: 699, exchangeTax2: 10,
        realPrice: 4054.20, exchangeTax3: 5.80},
    ],
    'November 2023': [
      { edition: 'PS5 Digital', price: 3799, currency: 'R$', 
        basePrice2: 399, exchangeTax2: 9.52,
        realPrice: 1955.10, exchangeTax3: 4.90},
      { edition: 'PS5 Digital[old]', price: 4499, currency: 'R$' },
      { edition: 'PS5 Standard[old]', price: 4999, currency: 'R$' },
    ],
    'November 2020': [
      { edition: 'PS5 Digital[old]', price: 4499, currency: 'R$',
         basePrice2: 399, exchangeTax2: 11.27,
         realPrice: 2138.64, exchangeTax3: 5.36 },
      { edition: 'PS5 Standard[old]', price: 4999, currency: 'R$',
         basePrice2: 499, exchangeTax2: 10, 
         realPrice: 2674.64, exchangeTax3: 5.36},
    ],
  },
  Europe: {
    'May 2025': [
      { edition: 'PS5 Pro', price: 749, currency: '€', discount: 6 },
      { edition: 'PS5 Standard[old]', price: 449, currency: '€', discount: 10 },
      { edition: 'PS5 Digital', price: 399, currency: '€', discount: 20 },
    ],
    'April 2025': [
      { edition: 'PS5 Digital', price: 499, currency: '€', increase: 11.1 },
    ],
    'November 2024': [
      { edition: 'PS5 Pro', price: 799, currency: '€' },
    ],
    'November 2023': [
      { edition: 'PS5 Digital', price: 449, currency: '€' },
    ],
    'August 2022': [
      { edition: 'PS5 Digital[old]', price: 449, currency: '€', increase: 12.5 },
    ],
    'November 2020': [
      { edition: 'PS5 Standard[old]', price: 499, currency: '€' },
      { edition: 'PS5 Digital[old]', price: 399, currency: '€' },
    ],
  },

  UnitedKingdom: {
    'May 2025': [
      { edition: 'PS5 Pro', price: 649, currency: '£', discount: 7 },
      { edition: 'PS5 Digital', price: 339, currency: '£', discount: 21 },
    ],
    'April 2025': [
      { edition: 'PS5 Digital', price: 429, currency: '£' },
    ],
    'November 2024': [
      { edition: 'PS5 Pro', price: 699, currency: '£' },
    ],
    'November 2023': [
      { edition: 'PS5 Digital', price: 429, currency: '£', increase: 10.5 },
    ],
    'August 2022': [
      { edition: 'PS5 Standard[old]', price: 479, currency: '£' },
      { edition: 'PS5 Digital[old]', price: 389, currency: '£', increase: 8.5 },
    ],
    'November 2020': [
      { edition: 'PS5 Standard[old]', price: 449, currency: '£' },
      { edition: 'PS5 Digital[old]', price: 359, currency: '£' },
    ],
  },
  UnitedStates: {
    'May 2025': [
      { edition: 'PS5 Digital', price: 379, currency: '$', discount: 15.5 },
    ],
    'November 2024': [
      { edition: 'PS5 Pro', price: 699, currency: '$' },
    ],
    'November 2023': [
      { edition: 'PS5 Digital', price: 449, currency: '$', increase: 12.5 },
      { edition: 'PS5 Digital[old]', price: 449, currency: '$' },
      { edition: 'PS5 Standard[old]', price: 499, currency: '$' },
    ],
    'November 2020': [
      { edition: 'PS5 Digital[old]', price: 399, currency: '$' },
      { edition: 'PS5 Standard[old]', price: 499, currency: '$' },
    ],
  },
};
