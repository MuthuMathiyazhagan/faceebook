class collection {
    constructor (db) {
      this.db = db;
      this.projection = {_id: 0, createdAt: 0, modifiedAt: 0};
      this.options = {returnOriginal: false};
    }
    insertOne = (collection, payload) => {
        payload.createdAt = Date.now();
        payload.modifiedAt = Date.now();
        return this.db.collection(collection).insertOne(payload).then(data => console.log(data,"data added"));
    }
}
module.exports = collection;