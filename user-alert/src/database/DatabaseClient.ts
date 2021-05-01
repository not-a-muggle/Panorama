import * as mongodb from "mongodb";

export default class DatabaseClient {

    private static _instance: DatabaseClient;
    client: mongodb.MongoClient;
    dbName: string = "panorama";
    private constructor() {

        this.client = new mongodb.MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });
    }

    public static get Instance(): DatabaseClient {
        if (!this._instance) {
            this._instance = new DatabaseClient();
        }
        return this._instance;
    }


    public async find(collectionName: string, query: object): Promise<object[]> {
        try {
            if (!this.client.isConnected()) {
                await this.client.connect();
            }
        } catch (err) {
            console.log("Error while connecting to the DB");
            throw err;
        }
        console.log(`Find Query ${JSON.stringify(query)}`);
        const database = this.client.db(this.dbName);
        const collection = database.collection(collectionName)
        try {
            const result = await collection.find(query).toArray();
            return result;
        } catch (err) {
            console.log("Error while executing query on collections\n");
            throw err;
        }
    }

    public async insertMany(collectionName: string, insertQuery: object[]): Promise<void> {
        try {
            if (!this.client.isConnected()) {
                await this.client.connect();
            }
        } catch (err) {
            console.log("Error while connecting to the DB");
            throw err;
        }
        const database = this.client.db(this.dbName);
        const collection = database.collection(collectionName)
        try {
            const result = await collection.insertMany(insertQuery);
            console.log(`Inserted ${result.insertedCount} records`);
        } catch (err) {
            console.log("Error while executing query on collections");
            throw err;
        }
    }

    public async remove(collectionName: string, removeQuery: object): Promise<void> {
        try {
            if (!this.client.isConnected()) {
                await this.client.connect();
            }
        } catch (err) {
            console.log("Error while connecting to the DB");
            throw err;
        }
        const database = this.client.db(this.dbName);
        const collection = database.collection(collectionName)
        try {
            const result = await collection.deleteMany({ userId: '345' });

        } catch (err) {
            console.log("Error while executing query on collections");
            throw err;
        }
    }

    public async update(collectionName: string, insertQuery: object, updateQuery: object): Promise<void> {
        try {
            if (!this.client.isConnected()) {
                await this.client.connect();
            }
        } catch (err) {
            console.log("Error while connecting to the DB");
            throw err;
        }

        const database = this.client.db("panorama");
        const collection = database.collection(collectionName)
        try {
            const result = await collection.updateOne(insertQuery, { $set: updateQuery }, { upsert: true });
        } catch (err) {
            console.log("Error while executing query on collections");
            throw err;
        }
    }

}