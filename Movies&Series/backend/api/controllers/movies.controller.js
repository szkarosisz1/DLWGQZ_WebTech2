import Movies from "../models/Movies.js"

export const createMovies = async (req, res, next) => {
    try {
        const newMovies = new Movies({
            title: req.body.title,
            year: req.body.year,
            director: req.body.director,
            rating: req.body.rating,
            genre: req.body.genre
        });
        await newMovies.save()
        return res.json({ success: true, message: "Film létrehozva!" })
    } catch (err) {
        return res.status(500).json({ success: false, error: "Szerverhiba!" })
    }
}

export const updateMovie = async (req, res, next)=>{
    try {
        const movie = await Movies.findById({_id: req.params.id})
        if (movie) {
            const newData = await Movies.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            )     
            return res.json({ success: true, message: "Film módosítva" })
        }else{   
            return res.status(404).json({ success: false, error: "Film nem található!" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: "Szerverhiba!" })
    }
}

export const getAllMovies = async (req, res, next) => {
    try {
        const movies = await Movies.find()
        return res.status(200).json({ success: true, status: 200, message: 'Összes film kilistázva', data: movies })
    } catch (error) {
        return res.status(500).json({ success: false, error: "Szerverhiba!" })
    }
}

export const deleteMovie = async (req, res, next) => {
    try {
       const movieId = req.params.id
       const movie = await Movies.findById({_id: movieId})
       if (movie) {
            await Movies.findByIdAndDelete(movieId)
            return res.json({ success: true, message: "Film törölve!"})
       } else {
            return res.status(404).json({ success: false, error: "Film nem található!" })
       }
    } catch (error) {
        return res.status(500).json({ success: false, error: "Szerverhiba!" })
    }
}