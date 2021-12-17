// Write your code here
import './index.css'

const TransactionItem = props => {
  console.log(`props:`)
  console.log(props)
  const {entry, deleteFunction} = props
  const {id, title, amount, type} = entry

  const typelower = type === 'INCOME' ? 'Income' : 'Expenses'

  const transactionDeletion = () => {
    deleteFunction(id)
  }
  return (
    <li>
      <hr className="line-row" />
      <div className="transaction-history-container">
        <p className="to-make-column-transaction record-columns">{title}</p>
        <p className="to-make-column-transaction record-columns">Rs {amount}</p>
        <p className="to-make-column-transaction record-columns">{typelower}</p>
        <div>
          <button
            className="delete-button"
            testid="delete"
            type="button"
            onClick={transactionDeletion}
          >
            <img
              className="delete-image"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
              alt="delete"
            />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TransactionItem
