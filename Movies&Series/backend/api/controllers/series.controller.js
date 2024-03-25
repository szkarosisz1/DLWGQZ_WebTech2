import Series from "../models/Series.js"

export const createSeries = async (req, res, next) => {
    try {
        const newSeries = new Series({
            title: req.body.title,
            year: req.body.year,
            director: req.body.director,
            rating: req.body.rating,
            genre: req.body.genre
        });
        await newSeries.save()
        return res.json({ success: true, message: "Sorozat létrehozva!" })
    } catch (err) {
        return res.status(500).json({ success: false, error: "Szerverhiba!" })
    }
}

export const updateSeries = async (req, res, next)=>{
    try {
        const series = await Series.findById({_id: req.params.id})
        if (series) {
            const newData = await Series.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            )     
            return res.json({ success: true, message: "Sorozat módosítva!" })
        }else{   
            return res.status(404).json({ success: false, error: "Sorozat nem található!" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: "Szerverhiba!" })
    }
}

export const getAllSeries = async (req, res, next) => {
    try {
        const series = await Series.find()
        return res.status(200).json({ success: true, status: 200, message: 'Összes sorozat kilistázva!', data: series })
    } catch (error) {
        return res.status(500).json({ success: false, error: "Szerverhiba!" })
    }
}

export const deleteSeries = async (req, res, next) => {
    try {
       const seriesId = req.params.id
       const series = await Series.findById({_id: seriesId})
       if (series) {
            await Series.findByIdAndDelete(seriesId)
            return res.json({ success: true, message: "Sorozat törölve!"})
       } else {
            return res.status(404).json({ success: false, error: "Sorozat nem található!" })
       }
    } catch (error) {
        return res.status(500).json({ success: false, error: "Szerverhiba!" })
    }
}