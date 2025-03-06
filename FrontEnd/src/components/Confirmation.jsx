import React from "react"

const Confirmation = ({ order, selectedSeat }) => {
  return (
    <div className="confirmation">
      <h2>Tilaus vahvistettu!</h2>
      <p>Kiitos tilauksestasi. Tilauksesi sisältää:</p>
      <ul>
        {order.map((item, index) => (
          <li key={index}>
            {item.nimi} - {item.hinta} €
          </li>
        ))}
      </ul>
      <p>
        <strong>Istumapaikka: {selectedSeat}</strong>
      </p>
    </div>
  )
}

export default Confirmation
