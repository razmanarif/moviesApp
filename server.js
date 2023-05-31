const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');


app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

app.get('/', (req, res) => {
  res.render("postsHome", {movie: movieList});
});

const movieList = [
  {
    title: "The Shawshank Redemption",
    director: ["Frank Darabont", "shawshank director 2"],
    featured: true,
    actorsList: ['Tim Robbins', 'Morgan Freeman'],
    description: "A prison movie",
    genre: ["drama", "action"],
    poster: "https://google.com"
  },
  {
    title: "Batman",
    director: ["guy who directed batman", "batman director 2"],
    featured: true,
    actorsList: ['batman actor 1', 'batman actor 2'],
    description: "A movie about Batman",
    genre: ["action", "comedy"],
    poster: "https://google.com"
  },
  {
    title: "Superman",
    director: ["guy who directed superman", "superman director 2"],
    featured: true,
    actorsList: ['superman actor 1', 'superman actor 2'],
    description: "A movie about Superman",
    genre: ["romance", "comedy"],
    poster: "https://google.com"
  }
];

//middleware
app.use(express.json()) // important to receive req.body
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.urlencoded({extended:true})) // get form data

app.get('/movies/genre/:genreName', (req,res) =>{
  // console.log(req.params)
  let genre = req.params.genreName.toLowerCase();
  const moviesFiltered = movieList.filter(movie => movie.genre.includes(genre));
  res.status(200).json(moviesFiltered);
});

// Get all movies by director
app.get('/movies/director/:directorName', (req,res) =>{
  // console.log(req.params)
  let director = req.params.directorName.toLowerCase();
  const directorFiltered = movieList.filter(movie => movie.director.includes(director));
  res.status(200).json(directorFiltered);
});

// Get all movies by actor
app.get('/movies/actor/:actorName', (req,res) =>{

  let actor = req.params.actorName;
  const actorFiltered = movieList.filter(movie => movie.actorsList.includes(actor));
  res.status(200).json(actorFiltered);
});

// get movies by title
app.get('/movies/:title', (req,res) =>{
  // console.log(req.params)
  let title = req.params.title;
  const titleFiltered = movieList.filter(movie => movie.actorsList.includes(title));
  res.status(200).json(titleFiltered);
});


// create new movie
app.get("/new", (req,res) =>{
res.render("newMovie")
})

app.post("/", (req,res) =>{
if(req.body.featured =='on'){
   req.body.featured = true
} else{
  req.body.featured = false
}
movieList.push(req.body)

res.redirect('/')
})

// //  Get all movies
// app.get('/movies', (req,res) =>{
//     res.status(200).json(movieList)
// })

