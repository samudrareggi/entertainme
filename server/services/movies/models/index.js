const db = require('../configs')
const Movies = db.collection('movies')
const { ObjectID } = require ('mongodb')

class Movie {
  static find() {
    return Movies.find().toArray()
  }
  static findById(id) {
    return Movies.findOne({ _id: ObjectID(id) })
  }
  static create(newMovie) {
    return Movies.insertOne(newMovie)
  }
  static update(id, newMovie) {
    return Movies.findOneAndUpdate({ _id: ObjectID(id) }, {
      $set: newMovie
    }, {
      returnOriginal: false
    })
  }
  static delete(id) {
    return Movies.findOneAndDelete({ _id: ObjectID(id) })
  }
}

module.exports = Movie