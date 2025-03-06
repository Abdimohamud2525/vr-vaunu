import React, { useState, useEffect } from "react"
import Confirmation from "./components/Confirmation"
import Menu from "./components/Menu"
import Order from "./components/Order"
import StaffView from "./components/StaffView"
import PaymentForm from "./components/PaymentForm"

import "./App.css"

const App = () => {
  const [order, setOrder] = useState([])
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false)
  const [selectedSeat, setSelectedSeat] = useState("")
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [menuItems, setMenuItems] = useState([])

  // Hae tuotteet tietokannasta
  useEffect(() => {
    fetch("http://localhost:5000/api/tuotteet") // Tarkista osoite
      .then((response) => response.json())
      .then((data) => {
        console.log("Haetut tuotteet:", data) // Lisää tämä debuggausta varten
        setMenuItems(data)
      })
      .catch((error) => console.error("Virhe tuotteiden haussa:", error))
  }, [])

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

  const handlePayment = (paymentData) => {
    const tilaus = {
      asiakas_id: 1, // Oletetaan, että asiakas on kirjautunut
      istumapaikka: selectedSeat,
      tuotteet: order.map((item) => ({ id: item.id, määrä: 1 })), // Oletetaan, että määrä on aina 1
    }

    fetch("http://localhost:5000/api/tilaukset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tilaus),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Tilaus vastaus:", data)
        setIsOrderConfirmed(true)
        setShowPaymentForm(false)
      })
      .catch((error) => console.error("Virhe tilauksen luonnissa:", error))
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
              {seats.map((seat, index) => (
                <option key={index} value={seat}>
                  {seat}
                </option>
              ))}
            </select>
          </div>
          <Menu items={menuItems} onAddToOrder={handleAddToOrder} />
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
