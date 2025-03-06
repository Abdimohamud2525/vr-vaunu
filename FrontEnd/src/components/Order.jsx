import React from "react"

const Order = ({ order, onConfirmOrder }) => {
  const total = order.reduce((sum, item) => sum + item.hinta, 0)

  return (
    <div className="order">
      <h2>Tilaus</h2>
      <ul>
        {order.map((item, index) => (
          <li key={index}>
            {item.nimi} - {item.hinta} €
          </li>
        ))}
      </ul>
      <p>
        <strong>Yhteensä: {total} €</strong>
      </p>
      <button onClick={onConfirmOrder}>Vahvista tilaus</button>
    </div>
  )
}

export default Order
