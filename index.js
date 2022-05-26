const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cache = require('memory-cache');

const PORT = process.env.PORT || 3128;
const app = express();


// cache midlleware

// app routes
app.get('/products', (req, res) => {
    setTimeout(() => {
        let db = new sqlite3.Database("./NodeInventory.db");
        let sql = "Select * from products";

        db.all(sql, [], (err, rows) => {
            if (err){
                throw err;
            }
            db.close();
            res.send(rows);
        });
    }, 3000);
})

app.listen(PORT, () => {
    console.log(`Application is running on Port: ${PORT}`);
});
