const bodyParser = require('body-parser');
const express = require('express');
const { WebhookClient } = require('dialogflow-fulfillment');
const mysql = require('mysql');

const app = express().use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'test',
  password: '1234',
  database: 'bookdb',
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});
function query(sql) {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

app.post('/webhook', (request, response) => {
  let intentMap = new Map();
  const agent = new WebhookClient({ request, response });
  
  function welcome() {
    agent.add('Welcome to abdalelah agent!');
  }
async function product_category(){
  try {
    const rows = await query('SELECT * FROM mainapp_category');
    const listofCategory = rows.map(row => row.Category_name);
    agent.add(`We have these categories: ${listofCategory.join(', ')}`);
  } catch (err) {
    console.log(err);
    agent.add('Sorry, I could not retrieve the list of product categories.');
  }
}
  try {
    console.log('try')
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('product-info', product_category);
    agent.handleRequest(intentMap);
    
  } catch (error) {
    console.log(error)
  }
  
  
});

app.get('/', (req, res) => {
  res.send('hi')
}),

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}/`);
});
