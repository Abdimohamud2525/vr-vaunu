const express = require("express")
const mysql = require("mysql2/promise")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())

const dbConfig = {
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "",
  database: process.env.MYSQLDATABASE || "ravintolavaunu",
  port: Number(process.env.MYSQLPORT) || 3306,
}

async function getDb() {
  return mysql.createConnection(dbConfig)
}

app.get("/api/tuotteet", async (req, res) => {
  let conn
  try {
    conn = await getDb()
    const [rows] = await conn.query("SELECT * FROM Tuotteet")
    res.json(rows)
  } catch (err) {
    console.error("Virhe tuotteiden haussa:", err.message)
    res.status(500).json({ error: err.message })
  } finally {
    if (conn) await conn.end()
  }
})

app.post("/api/tilaukset", async (req, res) => {
  const { asiakas_id, istumapaikka, tuotteet } = req.body
  let conn
  try {
    conn = await getDb()
    const [result] = await conn.query(
      "INSERT INTO Tilaukset (asiakas_id, istumapaikka) VALUES (?, ?)",
      [asiakas_id, istumapaikka]
    )
    const tilaus_id = result.insertId
    const rivit = tuotteet.map((t) => [tilaus_id, t.id, t.määrä])
    await conn.query(
      "INSERT INTO Tilausrivit (tilaus_id, tuote_id, maara) VALUES ?",
      [rivit]
    )
    res.json({ tilaus_id, viesti: "Tilaus luotu onnistuneesti!" })
  } catch (err) {
    console.error("Virhe tilauksen luonnissa:", err.message)
    res.status(500).json({ error: err.message })
  } finally {
    if (conn) await conn.end()
  }
})

app.listen(port, () => {
  console.log(`Palvelin käynnissä portissa ${port}`)
})
