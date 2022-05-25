const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const PORT = process.env.PORT || 3128;
const app = express();