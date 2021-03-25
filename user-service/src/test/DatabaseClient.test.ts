import DatabaseClient from "../DatabaseClient"
import * as chai from "chai";
describe("test cases", ()=> {
    it("Conection to Db", ()=> {
        const db = DatabaseClient.Instance;
        chai.assert.isTrue(!db.client.isConnected());
    })
})