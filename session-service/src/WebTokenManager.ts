import jsonwebtoken from "jsonwebtoken";
import config from "./config.json";

interface UserDetails {
    username: string;
}

export default class WebTokenManager {
    private static _instance: WebTokenManager;

    private constructor() {

    }

    public static get Instance(): WebTokenManager {
        if (!this._instance) {
            this._instance = new WebTokenManager();
        }
        return this._instance;
    }


    public getToken(username: string): string {

        // read from the environment variable
        const secret = process.env.SECRET || config.secret;

        // read from configuration
        const expiration = config.expiration;
        const issuer = config.issuer;
        console.log("Issued new token for " + username);
        return jsonwebtoken.sign({ username: username }, secret, { expiresIn: expiration, issuer: issuer });
    }

    public verifyToken(username: string, token: string): boolean {
        const secret = process.env.SECRET || config.secret;
        console.log("Verifying token for " + username);
        
        try {
            const decrypted: UserDetails = jsonwebtoken.verify(token, secret) as UserDetails;
            console.log("DECRYPTED:" + JSON.stringify(decrypted.username));
            console.log("USERNAME:" + JSON.stringify(username));
            
            return decrypted.username == username;
        } catch (ex) {
            console.log(ex);
            return false;
        }


    }
}