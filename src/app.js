const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utilis/geocode')
const forecast = require('./utilis/forecast')


const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//set up handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialsPath)


//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
res.render('index', {
    title: 'weather',
    name: 'Chika'
})
})


app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Created by Onyema Chika'
    })
})






app.get('/help', (req,res) => {
   res.render('help', {
       title: 'help',
       name: 'Onyema chika'
   })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
       return res.send({
            error:'you are stupid, you must provide a location'
        })
    }  
       geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
           if (error) {
               return res.send({error})
           }
       
       
       forecast( latitude, longitude, (error, forecastData) => {
           if (error) {
            return res.send({error})
           }
             res.send({
                 forecast: forecastData,
                 location,
                 address: req.query.address
             })
        })
    });  
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
    return res.send({
        error:'you must provide a search term'
    })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*' , (req, res) => {
   res.render('404' , {
       title: '404',
       name: 'Onyema Chika',
       errorMessage: 'Help page not found'
   })
})

app.get('*', (req, res) => {
    res.render('404' , {
       title: '404',
       name: 'Chika Onyema',
       errorMessage:'Page not found'
    })
})

app.listen(3000, () => {
   console.log('server is up to port 3000.')
})