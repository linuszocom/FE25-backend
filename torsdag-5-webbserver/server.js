import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

let movies = [
    {
        id: 1, 
        title: "War Machine", 
        director: "Patrick Hughes", 
        year: 2026, 
        rating: 3
    },
   
    {
        id: 2, 
        title: "After Everything", 
        director: "Castille Landon", 
        year: 2023, 
        rating: 2
    },
    
    {
        id: 3, 
        title: "Space Jam: A New Legacy", 
        director: "Malcolm D. Lee", 
        year: 2021, 
        rating: 3
    },

    {
        id: 4, 
        title: "One Battle After Another", 
        director: "Paul Thomas Anderson", 
        year: 2025, 
        rating: 4
    },

    {
        id: 5, 
        title: "Shutter Island", 
        director: "Martin Scorsese", 
        year: 2010, 
        rating: 5
    },

    {
        id:6,
        title: "testing",
        director: "none",
        year: 2021,
        rating: 3
    }
]


app.get('/api/movies', (req, res) => {

    let filteredMovies = movies

    if(req.query.rating) {
        const rating = Number(req.query.rating)
        filteredMovies = filteredMovies.filter(m => m.rating === rating)
    }

    if(req.query.title) {
        const title = req.query.title.toLowerCase()
        filteredMovies = filteredMovies.filter(m => m.title.toLowerCase() === title)
    }

    if(req.query.year) {
        const year = Number(req.query.year)
        filteredMovies = filteredMovies.filter(m => m.year === year)
    }

    res.json(filteredMovies)
})


app.get('/api/movies/:id', (req, res) => {
    const id = Number(req.params.id)
    const movie = movies.find(m => m.id === id)

    if(!movie) {
        return res.status(404).json({ fel: 'Filmen kunde inte hittas' })
    }

    if(req.query.fields) {
        const fields = req.query.fields.split(',')
        const result = {}

        fields.forEach(f => {
            if (movie[f] !== undefined) {
                result[f] = movie[f]
            }
        });

        return res.json(result)
    }

    res.json(movie)
})


app.post('/api/movies', (req, res) => {
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ fel: 'Request body måste vara JSON' })
    }
    const { title, director, year, rating } = req.body

    if(!title || !director || !year || !rating) {
        return res.status(400).json({ fel: 'Måste innehålla title, director, year och rating' })
    }

    if(isNaN(Number(year)) || Number(year) > 2026) {
        return res.status(400).json({ fel: 'year måste bestå av nummer och inte överskrida 2026' })
    }

    if(isNaN(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) {
        return res.status(400).json({ fel: 'rating måste vara en siffra mellan 1-5' })
    }

    const newId = movies.length === 0 ? 1 : Math.max(...movies.map(m => m.id)) + 1
    const newMovie = {
        id: newId,
        title,
        director,
        year: Number(year),
        rating: Number(rating)
    }

    movies.push(newMovie)
    res.status(201).json(newMovie)
})


app.put('/api/movies/:id', (req, res) => {
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ fel: 'Request body måste vara JSON' })
    }
    const id = Number(req.params.id)
    const movie = movies.find(m => m.id === id)
    

    if(!movie) {
       return res.status(404).json({ fel: 'Filmen hittades inte' })
    }

    if (req.body.title !== undefined) {
        movie.title = req.body.title
    }

    if (req.body.director !== undefined) {
        movie.director = req.body.director
    }

    if (req.body.year !== undefined) {
        const year = Number(req.body.year)

        if(isNaN(year) || year > 2026) {
            return res.status(400).json({ fel: 'year måste bestå av nummer och inte överskrida 2026' })
        }

        movie.year = year
    }

    if (req.body.rating !== undefined) {
        const rating = Number(req.body.rating)

        if(isNaN(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({ fel: 'rating måste vara en siffra mellan 1-5' })
        }

        movie.rating = rating
    }

    res.json(movie)
})


app.delete('/api/movies/:id', (req, res) => {
    const id = Number(req.params.id)
    const movie = movies.find(m => m.id === id)

    if(!movie) {
        return res.status(404).json({ fel: 'Filmen hittades inte!' })
    }

    movies = movies.filter(m => m.id !== id)
    
    res.status(204).send()
})


app.listen(PORT, () => {
    console.log(`API:et lyssnar på http://localhost:${PORT}`)
})