


const express = require('express')
const bodyParser = require('body-parser');
const converter = require('json-2-csv');

fs = require('fs');

const app = express()
const port = 3000
app.use(bodyParser.json());

app.post("/getall" , (req,res)=>{

    console.log(req.body.length)
    console.log(req.body)
    converter.json2csv(req.body, (err, csv) => {
      if (err) {
          throw err;
      }
  
      // print CSV string
     var date= new Date().toISOString() + '.csv';
      console.log(date);
      fs.writeFileSync(date, csv);
  });
    res.send("ok")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

