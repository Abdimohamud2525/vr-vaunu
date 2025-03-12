const express = require("express")
const mysql = require("mysql")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
const port = 5000

// Luo MySQL-yhteysc
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", 
  database: "ravintolavaunu",
})

// Yhdistä tietokantaan
db.connect((err) => {
  if (err) {
    console.error("Virhe yhteyden muodostamisessa tietokantaan:", err)
  } else {
    console.log("Yhdistetty MySQL-tietokantaan")
  }
})

// Middleware
app.use(cors())
app.use(bodyParser.json())

// REST-rajapinta

// Hae kaikki tuotteet
app.get("/api/tuotteet", (req, res) => {
  db.query("SELECT * FROM Tuotteet", (err, results) => {
    if (err) {
      res.status(500).send(err.message)
    } else {
      res.json(results)
    }
  })
})

// Luo uusi tilaus
app.post("/api/tilaukset", (req, res) => {
  const { asiakas_id, istumapaikka, tuotteet } = req.body

  db.query(
    "INSERT INTO Tilaukset (asiakas_id, istumapaikka) VALUES (?, ?)",
    [asiakas_id, istumapaikka],
    (err, results) => {
      if (err) {
        res.status(500).send(err.message)
      } else {
        const tilaus_id = results.insertId
        const rivit = tuotteet.map((tuote) => [
          tilaus_id,
          tuote.id,
          tuote.määrä,
        ])

        db.query(
          "INSERT INTO Tilausrivit (tilaus_id, tuote_id, määrä) VALUES ?",
          [rivit],
          (err) => {
            if (err) {
              res.status(500).send(err.message)
            } else {
              res.json({ tilaus_id, viesti: "Tilaus luotu onnistuneesti!" })
            }
          }
        )
      }
    }
  )
})

// Käynnistä palvelin
app.listen(port, () => {
  console.log(`Palvelin käynnissä portissa ${port}`)
})
