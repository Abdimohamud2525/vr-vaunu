import React, { useState } from "react"

const PaymentForm = ({ total, onPayment }) => {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!cardNumber || !expiryDate || !cvv) {
      alert("Täytä kaikki korttitiedot!")
      return
    }
    onPayment({ cardNumber, expiryDate, cvv })
  }

  return (
    <div className="payment-form">
      <h2>Maksutiedot</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Korttinumero:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div>
          <label>Voimassaolo päiväys:</label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
          />
        </div>
        <div>
          <label>CVV:</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
          />
        </div>
        <p>
          <strong>Maksettava summa: {total} €</strong>
        </p>
        <button type="submit">Maksa</button>
      </form>
    </div>
  )
}

export default PaymentForm
