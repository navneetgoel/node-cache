const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cache = require('memory-cache');
const flatCache = require('flat-cache');

const PORT = process.env.PORT || 3128;
const app = express();

let cache = flatCache.load('productCache');


// cache midlleware

let memCache = new cache.Cache();
let cacheMiddleware = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url;
        let cacheContent = memCache.get(key);
        if (cacheContent){
            res.send(cacheContent);
            return;
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                memCache.put(key, body, duration * 1000);
                res.sendResponse(body);
            }
            next();
        }
    }
}

// app routes
app.get('/products', cacheMiddleware(30), (req, res) => {
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
