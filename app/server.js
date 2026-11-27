const http = require('node:http');
const { Pool } = require('pg');

// Connection settings come from PGHOST, PGPORT, PGUSER, PGPASSWORD and PGDATABASE.
const db = new Pool({ connectionTimeoutMillis: 3000 });
const where = `${process.env.PGHOST}:${process.env.PGPORT || 5432}`;

http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200).end('ok');
    return;
  }
  if (req.method !== 'GET' || req.url !== '/api/menu') {
    res.writeHead(404).end();
    return;
  }
  res.setHeader('Content-Type', 'application/json');
  try {
    const { rows } = await db.query('SELECT item, price FROM menu ORDER BY item');
    console.log('GET /api/menu status=200');
    res.writeHead(200).end(JSON.stringify(rows));
  } catch (err) {
    // Log the error code and database address, never the password.
    console.error(`GET /api/menu status=500 db=${where} db_code=${err.code || 'unknown'}`);
    res.writeHead(500).end(JSON.stringify({ error: 'Menu unavailable' }));
  }
}).listen(3000, '0.0.0.0', () => console.log(`Menu API listening on 3000, database ${where}`));
