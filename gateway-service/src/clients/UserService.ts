

// User Service Client
export default class UserService {
    private static _instance: UserService;
    private constructor() { }

    public static get Instance(): UserService {
        if(!this._instance) {
            this._instance = new UserService();
        }
         return this._instance;
    }

    
}