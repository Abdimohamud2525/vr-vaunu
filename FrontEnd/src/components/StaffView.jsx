import React from "react"

const StaffView = ({ orders }) => {
  return (
    <div className="mt-4 p-4 border rounded-lg">
      <h2 className="text-xl font-semibold">Henkilökunnan näkymä</h2>
      {orders.length === 0 ? (
        <p>Ei tilauksia käsiteltävänä.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index} className="border-b py-2">
              {order.nimi} - {order.hinta.toFixed(2)} €
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default StaffView
