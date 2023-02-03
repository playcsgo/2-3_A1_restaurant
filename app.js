// #1 require express
const express = require('express')
const app = express()

// #2 server variable
const port = 3000

// #5 requre express-handlebars
const exphbs = require('express-handlebars')
// #6 set defaultLayout = main
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))

// #7 set handlebars as the view engine
app.set('view engine', 'handlebars')

// #8 use static files "public"
app.use(express.static('public'))

// #9 require exteral or API data
const restaurants = require('./restaurant.json')

// #3 set rout feedback
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurants.results })
})

// #10 show by params
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurants.results.find(restaurant =>
    restaurant.id === Number(req.params.restaurant_id)
    )
  res.render('show', { restaurant })
})

// #11 search by query string
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const filteredRestaurants = restaurants.results.filter(restaurant =>
    restaurant.name.toLowerCase().includes(keyword)
    ||
    restaurant.name_en.toLowerCase().includes(keyword)
    ||
    restaurant.category.toLowerCase().includes(keyword)
    )
    res.render('index', { restaurants: filteredRestaurants })
})

// #4 start server
app.listen(port, () => {
  console.log(`express is running on http://localhost:${port}`);
})  