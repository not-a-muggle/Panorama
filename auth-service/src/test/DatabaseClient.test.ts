import DatabaseClient from "../DatabaseClient";
import * as chai from "chai";
describe('Database Client', async () => {

    
    
    it('Connect to DB', async () => {
      const dbClient = DatabaseClient.Instance;

      chai.assert.isTrue(!dbClient.client.isConnected());
    });
    
  })