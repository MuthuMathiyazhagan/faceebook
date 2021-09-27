'use strict';
const mongodb = require('mongodb');
const CONFIG = require('./dbConfig.json');

//V1
const collection = require('./collection');

//Variables declaration
const MongoClient = mongodb.MongoClient;
const DB_NAME = process.env.DB_NAME || CONFIG.DB_NAME;

class DBConnector {
  constructor() {
    if (DBConnector.instance) {
      throw new Error("Mongo instance already exists...");
    }
    this.mongoClient = null;
    this.mongoDB = null;
  }

  static getInstance() {
    if (!DBConnector.instance) {
      DBConnector.instance = new DBConnector();
    }
    return DBConnector.instance;
  }

  connect() {
    if (this.mongoDB) {
      return Promise.resolve(this.mongoDB);
    }
    return MongoClient.connect(CONFIG.URL, CONFIG.options).then(mongoClient => {
      this.mongoClient = mongoClient;
      this.mongoDB = this.mongoClient.db(DB_NAME);
      console.log(`Connected to DB --> ${DB_NAME}`);
      return this.mongoDB;
    }).then(mongoDB => {
      //V1
      this.collection = new collection(mongoDB);
    }).catch(e => {
      console.log(e)
      return Promise.reject(`Error at connection \n ${e}`)
    });
  }

  // disconnect() {
  //   this.mongoClient.close();
  //   this.mongoClient = undefined;
  //   this.mongoDB = undefined;
  //   DBConnector.instance = null;
  // }

  // getDB() {
  //   return this.mongoDB;
  // }
}

module.exports = DBConnector;
