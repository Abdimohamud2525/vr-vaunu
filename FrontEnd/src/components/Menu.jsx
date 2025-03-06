const Menu = ({ items, onAddToOrder }) => (
  <div>
    <h2>Ruokalista</h2>
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.nimi} - {item.hinta} €
          <button onClick={() => onAddToOrder(item)}>Lisää tilaukseen</button>
        </li>
      ))}
    </ul>
  </div>
)

export default Menu
