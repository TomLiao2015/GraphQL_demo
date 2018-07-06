const uuidv4 = require('uuid/v4');
const customerId = uuidv4();

function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
const firstName = ['Tom', 'Alex', 'Peter', 'Susun', 'Tonny'];
const lastName = ['Liao', 'Chen', 'Huang', 'Zhang', 'Li'];
const countries = ['China', 'England', 'America' ];
const currency = ['CNY', 'USD', 'GBP'];
const customers = [];
const transactions = [];
function createCustomers () {
  for (let i = 0; i < 10; i++) {
    const customer = {
      id: uuidv4(),
      firstName: firstName[getRandomInt(0, 5)],
      lastName: lastName[getRandomInt(0, 5)],
      birthday: '1987-01-01',
      country: countries[getRandomInt(0, 3)],
      accountNumber: `${getRandomInt(0, 100)}-${getRandomInt(0, 100)}-${getRandomInt(0, 100)}`,
      amount: getRandomInt(0, 5000),
      currency: currency[getRandomInt(0, 3)]
    };
    customers.push(customer);
  }

}
function createTransactions () {
  let cunstomerRandom;
  for (let j = 0; j < 10; j++) {
    cunstomerRandom = getRandomInt(0, 10);
    const transaction = {
      id: uuidv4(),
      customerId: customers[cunstomerRandom].id,
      tranDay: new Date(),
      tranAmount: getRandomInt(0, 2000),
      tranCurrency: currency[getRandomInt(0, 3)],
      fromAccount: customers[cunstomerRandom].accountNumber,
      toAccount: customers[getRandomInt(0, 10)].accountNumber
    };
    transactions.push(transaction);
  }

}
createCustomers();
createTransactions();
const mock = {
  data: {
    customers: {
      list: customers
    },
    transactions: {
      list: transactions
    }
  }
};
module.exports = mock;
