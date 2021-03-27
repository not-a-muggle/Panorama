import AuthService from "../service-clients/AuthService";
import ImageService from "../service-clients/ImageService";
import SessionLogService from "../service-clients/SessionLogService";
import SessionService from "../service-clients/SessionService";
import UserService from "../service-clients/UserService";

describe("Client test cases -- reading proto file and creating stubs", ()=> {
    it("Auth Service Client", ()=> {
        const authServiceClient  = AuthService.Instance;
    });
    it("Image Service Client", ()=> {
        const imageServiceClient  = ImageService.Instance;
    });
    it("Session Log Service Client", ()=> {
        const sessionLogServiceClient = SessionLogService.Instance;
    });
    it("Session Service Client", ()=> {
        const sessionServiceClient  = SessionService.Instance;
    });
    it("User Service Client", ()=> {
        const UserServiceClient  = UserService.Instance;
    });
})