// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {details} = props
  const {id, displayText, amount, image} = details
  console.log(`${id}Amount`)

  return (
    <li className={`money-details ${id}`}>
      <div className="money-details-image-container">
        <img className="money-details-image" src={image} alt={id} />
      </div>
      <div className="money-details-text-container">
        <p className="text-money-details">{displayText}</p>
        <p className="amount-money-details" testid={`${id}Amount`}>
          Rs {amount}
        </p>
      </div>
    </li>
  )
}

export default MoneyDetails
