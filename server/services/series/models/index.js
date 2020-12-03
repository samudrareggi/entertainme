const db = require('../configs')
const Series = db.collection('series')
const { ObjectID } = require('mongodb')

class Seri {
  static find() {
    return Series.find().toArray()
  }
  static findById(id) {
    return Series.findOne({ _id: ObjectID(id) })
  }
  static create(newSeries) {
    return Series.insertOne(newSeries)
  }
  static update(id, newSeries) {
    return Series.findOneAndUpdate({ _id: ObjectID(id) }, {
      $set: newSeries
    })
  }
  static delete(id) {
    return Series.findOneAndDelete({ _id: ObjectID(id) })
  }
}

module.exports = Seri