
'use strict'

 const express = require('express');
const superAgent = require('superagent');
const pg = require('pg');
const cors = require('cors');
const methodOverride = require('method-override');

// setup and configuration
require('dotenv').config();
const app = express();
app.use(cors());
app.use(methodOverride('_method'));
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
let PORT=process.env.PORT;
// const client = new pg.Client(process.env.DATABASE_URL);  

const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }); // for heroku
app.get('/',handelhomebage)
app.post('/search',handeledatatwo)
app.post('/searchone',handlesecallcontries)
app.post("/addtofav",handletofav)
app.get('/allmydata',handeleallDataFromDB)
app.delete('/delete/:id',handleDelete)






function handleDelete(req,res){
let myid=req.params.id;


let myQuery='delet from COONTRY where id=$1'

client.query(myQuery,[myid]).then(()=>{

res.redirect('/')


})


}
function handeleallDataFromDB(req,res){
let myquery='select * from COONTRY'

client.query(myquery).then(data=>{

let mydata=data.rows;

res.render('database',{data:mydata})
})



}
function handletofav(req,res){
let mydata=req.body;
let msafedata=[mydata.cont,mydata.TotalConfirmed,mydata.TotalDeaths,mydata.TotalRecovered,mydata.Date]
    let myquery='insert into COONTRY (cont,TotalConfirmed,TotalDeaths,TotalRecovered,Date) values($1,$2.$2,$3,$4,$5)'

client.query(myquery,msafedata).then(()=>{

res.redirect('/');


})

}



function handlesecallcontries(req,res){
    gitallcontries().then(data=>{

res.render('allcontries',{data:data})

    })


}



let myapithree="https://api.covid19api.com/summary"
function gitallcontries(){
return superAgent(myapithree).then(data=>{
let mydata=data.body.countries;

return mydata.map(data=>{
let cont=data.Country;
let TotalConfirmed=data.TotalConfirmed;
let TotalDeaths=data.TotalDeaths;
let TotalRecovered=data.TotalRecovered;
let Date=data.Date;

return new contri(cont,TotalConfirmed,TotalDeaths,TotalRecovered,Date)
})

})


}


function contri(cont,TotalConfirmed,TotalDeaths,TotalRecovered,Date){


    this.cont=cont;
    this.TotalConfirmed=TotalConfirmed;
    this.TotalDeaths=TotalDeaths;
    this.TotalRecovered=TotalRecovered;
    this.Date=Date;
}
function handeledatatwo(req,res)
{
    getdatafromapitwo(req.body.contry,req.body.start,req.body.end).then(data=>{

        res.render('getCountryResult',{data:data})
        console.log(dataone)
    })

}

function getdatafromapitwo(con,from,to){

    let apitow=`https://api.covid19api.com/country/${con}/status/confirmed`

let query={
from:from,
to:to
}

return superAgent(apitow).query(query).then(data=>{

let mydate=data.Date;

return new Contry(mydate)
})


}

function Contry(one){

    this.one=one;
}
function handelhomebage(req,res){

    gitdatafromapione().then(data=>{

res.render('index',{data:data})

    })

}
var firstUrl="https://api.covid19api.com/world/total"
function gitdatafromapione(){
return superAgent(firstUrl).then(data=>{
let mydata=data.body;
let TotalConfirmed=mydata.TotalConfirmed;
let TotalDeaths=mydata.TotalDeaths;
let TotalRecovered=mydata.TotalRecovered;

return new Total(TotalConfirmed,TotalDeaths,TotalRecovered);
})


}
function Total(con,death,rec){

    this.con=con;
    this.death=death;
    this.rec=rec;
}


client.connect().then(()=>{
    app.listen(PORT, () => {
      console.log('app is working on port ', PORT);
    });
  }).catch(error => {
    console.log('an error occurred while connecting to database ', error);
  });
  