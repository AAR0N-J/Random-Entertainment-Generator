const express = require('express');
const app = express();
const fetch = require('node-fetch');
var oneLinerJoke = require('one-liner-joke');

app.set("view engine", "ejs");
app.use(express.static("public"));

let genres = ["Alternative", "Anime", "Blues", "Children's Music", "Classical", "Comedy", "Comercial", "Country", "Dance", "Disney", "Easy Listening", "Electronic", "Enka","Pop", "Folk", "Hip-Hop", "Rap", "Holiday", "Industrial", "Christian", "Instrumental", "Jazz", "Latin", "Metal", "New Age", "Opera", "R&B", "Soul", "Reggae", "Rock", "Soundtrack", "Spoken Word", "World"]

let bookGenres = ["Fiction", "Classics", "Drama", "Poetry", "Fantasy", "Sci-fi", "Kids", "Mystery", "Thriller", "Non-Fiction", "Art", "Entertainment", "Biography", "Memoir", "Comedy", "Humor", "History", "Religion", "Science", "Self Help", "Speakers", "Sports", "Technology", "Travel"]

app.get('/', async (req, res) => {
  var Joke = oneLinerJoke.getRandomJoke();
  let randomTerm = genres[Math.floor(Math.random() * genres.length)];
  let url = `https://itunes.apple.com/search?term=${randomTerm}`;
  let response = await fetch(url);
  let data = await response.json();
  let songTile = "no results";
  let artist = "no results";
  let mp4 = "undefined";
  while(true) {
    let randomNumber = Math.floor(Math.random() * data.resultCount)
    if (data.results[randomNumber].wrapperType == "track"){
      songTitle = data.results[randomNumber].trackName;
      artist = data.results[randomNumber].artistName;
      mp4 = data.results[randomNumber].previewUrl;
      break;
    }
  }
   let randomTermBook = bookGenres[Math.floor(Math.random() * genres.length)];
  let urlbook = `https://itunes.apple.com/search?term=${randomTermBook} audiobook`;
  
  let responsebook = await fetch(urlbook);
  let dataBook = await responsebook.json();
  let bookTile = "no results";
  let author = "no results";
  let mp4book = "undefined";
  randomNumber = Math.floor(Math.random() * dataBook.resultCount);
  let description = "no results";
  for (let i=0;i < dataBook.resultCount; i++) {
    if (dataBook.results[randomNumber].wrapperType == "audiobook"){
      bookTitle = dataBook.results[randomNumber].collectionName;
      author = dataBook.results[randomNumber].artistName;
      mp4book = dataBook.results[randomNumber].previewUrl;
      description = dataBook.results[randomNumber].description;
      break;
    }
  }
  res.render('home', {"joke": Joke, "song": songTitle, "artist": artist, "preview": mp4, "book": bookTitle, "author": author, "previewbook": mp4book, "description": description})
});



app.get('/songs', async (req, res) => {
  let randomTerm = genres[Math.floor(Math.random() * genres.length)];
  let url = `https://itunes.apple.com/search?term=${randomTerm}`;
  let term = req.query.term;
  if (term) {
    url = `https://itunes.apple.com/search?term=${term}`;
  }
  let response = await fetch(url);
  let data = await response.json();
  let songTile = "no results";
  let artist = "no results";
  let randomNumber = Math.floor(Math.random() * data.resultCount)
  for (let i=0;i < data.resultCount; i++) {
    if (data.results[randomNumber].wrapperType == "track"){
      songTitle = data.results[randomNumber].trackName;
      artist = data.results[randomNumber].artistName;
       mp4 = data.results[randomNumber].previewUrl;
      break;
    }
  }
  res.render('songs', {"song": songTitle, "artist": artist, "preview": mp4})
});



app.get('/audiobooks', async (req, res) => {
  let randomTerm = bookGenres[Math.floor(Math.random() * genres.length)];
  let url = `https://itunes.apple.com/search?term=${randomTerm} audiobook`;
  let term = req.query.term;
  if (term) {
    url = `https://itunes.apple.com/search?term=${term} audiobook`;
  }
  
  let response = await fetch(url);
  let data = await response.json();
  let bookTile = "no results";
  let artist = "no results";
  let randomNumber = Math.floor(Math.random() * data.resultCount);
  let description = "no results";
  for (let i=0;i < data.resultCount; i++) {
    if (data.results[randomNumber].wrapperType == "audiobook"){
      bookTitle = data.results[randomNumber].collectionName;
      artist = data.results[randomNumber].artistName;
      mp4book = data.results[randomNumber].previewUrl;
      description = data.results[randomNumber].description;
      break;
    }
  }
  res.render('audiobooks', {"book": bookTitle, "author": artist, "preview": mp4book, "description": description});
});



app.get('/jokes', (req, res) => {
  Joke = oneLinerJoke.getRandomJoke();
  res.render('jokes', {"joke": Joke})
});



app.listen(3000, () => {
  console.log('server started');
});