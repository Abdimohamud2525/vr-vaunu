import React, { useState } from "react"
import Confirmation from "./components/Confirmation"
import Menu from "./components/Menu"
import Order from "./components/Order"
import PaymentForm from "./components/PaymentForm"

import "./App.css"

const MOCK_MENU = [
  { id: 1, nimi: "Lihapullat", hinta: 8.90, kuvaus: "Perinteiset lihapullat perunamuusilla" },
  { id: 2, nimi: "Kahvi", hinta: 3.50, kuvaus: "Tuore suodatinkahvi" },
  { id: 3, nimi: "Croissant", hinta: 4.50, kuvaus: "Tuore voisarvi" },
  { id: 4, nimi: "Siideri", hinta: 5.90, kuvaus: "Olvi siideri 0,33 l" },
  { id: 5, nimi: "Vesi", hinta: 2.00, kuvaus: "Kivennäisvesi 0,5 l" },
]

const App = () => {
  const [order, setOrder] = useState([])
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false)
  const [selectedSeat, setSelectedSeat] = useState("")
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  const seats = ["Paikka 1", "Paikka 2", "Paikka 3", "Paikka 4", "Paikka 5"]

  const handleAddToOrder = (item) => {
    setOrder([...order, item])
  }

  const handleConfirmOrder = () => {
    if (!selectedSeat) {
      alert("Valitse istumapaikka ennen tilauksen vahvistamista!")
      return
    }
    setShowPaymentForm(true)
  }

  const handlePayment = () => {
    setIsOrderConfirmed(true)
    setShowPaymentForm(false)
  }

  return (
    <div className="container">
      <h1>VR Ravintolavaunun Tilausjärjestelmä</h1>
      {!isOrderConfirmed ? (
        <>
          <div className="seat-selection">
            <h2>Valitse istumapaikka</h2>
            <select
              value={selectedSeat}
              onChange={(e) => setSelectedSeat(e.target.value)}
            >
              <option value="">Valitse paikka</option>
              {seats.map((seat) => (
                <option key={seat} value={seat}>
                  {seat}
                </option>
              ))}
            </select>
          </div>
          <Menu items={MOCK_MENU} onAddToOrder={handleAddToOrder} />
          <Order order={order} onConfirmOrder={handleConfirmOrder} />
          {showPaymentForm && (
            <PaymentForm
              total={order.reduce((sum, item) => sum + item.hinta, 0)}
              onPayment={handlePayment}
            />
          )}
        </>
      ) : (
        <Confirmation order={order} selectedSeat={selectedSeat} />
      )}
    </div>
  )
}

export default App
