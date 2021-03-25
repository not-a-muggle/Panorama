import WebTokenManager from "../WebTokenManager";
import * as chai from "chai";
describe("Session Service", ()=> {
    it("Get token & verify token", ()=> {
        const webToken = WebTokenManager.Instance;
        const username = "vishesh";
        const token = webToken.getToken(username);
        chai.assert.isTrue(webToken.verifyToken(username, token));
    });
})