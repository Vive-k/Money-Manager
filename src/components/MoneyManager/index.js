import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import TransactionItem from '../TransactionItem'

import MoneyDetails from '../MoneyDetails'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    transactionTitleInput: '',
    transactionAmountInput: '',
    transactionTypeInput: 'INCOME',
    transactions: [],
  }

  titleChangeEvent1 = event => {
    this.setState({transactionTitleInput: event.target.value})
  }

  amountChangeEvent2 = event => {
    this.setState({transactionAmountInput: event.target.value})
  }

  typeChangeEvent3 = event => {
    this.setState({transactionTypeInput: event.target.value})
  }

  addTransactionevent4 = event => {
    event.preventDefault()
    const {
      transactionTitleInput,
      transactionAmountInput,
      transactionTypeInput,
    } = this.state
    if (transactionTitleInput !== '' && transactionAmountInput !== '') {
      const newEntry = {
        id: uuidv4(),
        title: transactionTitleInput,
        amount: parseInt(transactionAmountInput),
        type: transactionTypeInput,
      }

      this.setState(prevState => ({
        transactions: [...prevState.transactions, newEntry],
        transactionTitleInput: '',
        transactionAmountInput: '',
        transactionTypeInput: 'INCOME',
      }))
    }
  }

  deleteTransactionEvent5 = id => {
    this.setState(prevState => ({
      transactions: prevState.transactions.filter(each => each.id !== id),
    }))
  }

  getMoneyDetails = () => {
    const {transactions} = this.state

    console.log(transactions)
    const allIncomes = transactions.map(each =>
      each.type === 'INCOME' ? each.amount : 0,
    )

    const allExpenses = transactions.map(each =>
      each.type === `EXPENSES` ? each.amount : 0,
    )

    console.log(allIncomes, allExpenses)

    const totalIncome =
      allIncomes.length !== 0 ? allIncomes.reduce((acc, each) => acc + each) : 0
    const totalExpenses =
      allExpenses.length !== 0
        ? allExpenses.reduce((acc, each) => acc + each)
        : 0

    return [
      {
        id: 'balance',
        displayText: 'Your Balance',
        amount: totalIncome - totalExpenses,
        image:
          'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
      },
      {
        id: 'income',
        displayText: 'Your Income',
        amount: totalIncome,
        image:
          'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
      },
      {
        id: 'expenses',
        displayText: 'Your Expenses',
        amount: totalExpenses,
        image:
          'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
      },
    ]
  }

  render() {
    const {
      transactionTitleInput,
      transactionAmountInput,
      transactionTypeInput,
      transactions,
    } = this.state
    console.log(`transactionTitleInput : ${transactionTitleInput}`)
    console.log(`transactionAmountInput : ${transactionAmountInput}`)
    console.log(`transactionTypeInput : ${transactionTypeInput}`)
    console.log(`transactions:`)
    console.log(transactions)
    const moneyDetailsAmounts = this.getMoneyDetails()
    console.log(moneyDetailsAmounts)

    return (
      <div className="page">
        <div className="money-manager-bg">
          <h1 className="title">Hi, Richard</h1>
          <p className="Welcome-text">
            Welcome back to your{' '}
            <span className="text-moni-mngr">Money Manager</span>
          </p>
        </div>
        <ul className="money-details-contaier">
          {moneyDetailsAmounts.map(each => (
            <MoneyDetails key={each.id} details={each} />
          ))}
        </ul>
        <div className="form-history-section">
          <form onSubmit={this.addTransactionevent4}>
            <div className="form-contents-container">
              <h1 className="form-title">Add Transaction</h1>
              <div className="label-container">
                <label htmlFor="transactionTitleInput">TITLE</label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  id="transactionTitleInput"
                  className="transactionTitleAmountInput"
                  placeholder="TITLE"
                  onChange={this.titleChangeEvent1}
                  value={transactionTitleInput}
                />
              </div>
              <br />
              <div className="label-container">
                <label htmlFor="transactionAmountInput">AMOUNT</label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  id="transactionAmountInput"
                  placeholder="AMOUNT"
                  className="transactionTitleAmountInput"
                  onChange={this.amountChangeEvent2}
                  value={transactionAmountInput}
                />
              </div>
              <br />
              <div className="label-container">
                <label htmlFor="transactionType">TYPE</label>
              </div>
              <div className="input-container">
                <select
                  id="transactionType"
                  className="transactionTitleAmountInput"
                  onChange={this.typeChangeEvent3}
                  value={transactionTypeInput}
                >
                  {transactionTypeOptions.map(each => (
                    <option key={each.optionId} value={each.optionId}>
                      {each.displayText}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <button className="add-btn" type="submit">
                Add
              </button>
            </div>
          </form>
          <div className="history-container">
            <h1>History</h1>
            <div className="transaction-record-container">
              <div className="history-columns-container">
                <p className="to-make-column">Title</p>
                <p className="to-make-column">Amount</p>
                <p className="to-make-column">Type</p>
              </div>
              <ul className="transactions-in-history-record">
                {transactions.map(each => (
                  <TransactionItem
                    key={each.id}
                    entry={each}
                    deleteFunction={this.deleteTransactionEvent5}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
