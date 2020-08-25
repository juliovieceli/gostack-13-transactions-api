import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const { transactions } = this;
    return transactions;
  }

  public getBalance(): Balance {
    const { transactions } = this;
    const initialValue = 0;

    const sumIncome = transactions.reduce(
      (accumulator, currentValue) =>
        currentValue.type === 'income'
          ? accumulator + currentValue.value
          : accumulator + 0,
      initialValue,
    );

    const sumOutcome = transactions.reduce(
      (accumulator, currentValue) =>
        currentValue.type === 'outcome'
          ? accumulator + currentValue.value
          : accumulator + 0,
      initialValue,
    );

    const balance = {
      income: sumIncome,
      outcome: sumOutcome,
      total: sumIncome - sumOutcome,
    };

    return balance;
  }

  public create({ value, title, type }: CreateTransactionDTO): Transaction {
    const newTrasaction = new Transaction({ value, title, type });

    this.transactions.push(newTrasaction);

    return newTrasaction;
  }
}

export default TransactionsRepository;
