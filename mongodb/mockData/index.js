const uuidv4 = require('uuid/v4');
const customerId = uuidv4();
const mock = {
  data: {
    customers: {
      list: [
        {
          id: customerId,
          firstName: 'Tom',
          lastName: 'Liao',
          birthday: '1987-01-01',
          country: 'China',
          accountNumber: '123-456-789',
          amount: 1000,
          currency: 'CNY'
        }
      ]
    },
    transactions: {
      list: [{
        id: uuidv4(),
        customerId: customerId,
        tranDay: new Date(),
        tranAmount: 200,
        tranCurrency: 'CNY',
        fromAccount: '123-456-789',
        toAccount: '125-325-755'
      }]
    }
  }
};
module.exports = mock;
