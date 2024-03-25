import mongoose from "mongoose"

const SeriesSchema = mongoose.Schema(
    {
      title: {type: String, required: true, unique: true},
      year: {type: String, required: true},
      director: {type: String, required: true},
      rating: {type: String, required: true, unique: true},
      genre: { type: String, required: true},
    }
)
  
export default mongoose.model("Series", SeriesSchema)