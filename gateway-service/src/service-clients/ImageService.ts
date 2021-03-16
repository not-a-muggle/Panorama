import { forEach } from "lodash";
import { Duplex } from "node:stream";
import path from "path";
import config from "../config.json";
import { Image, ImageListRequest, ImageLocation, ImageMetadata, StoreResult } from "../definitions/images";

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

export default class ImageService {
    private static _instance: ImageService;
    private client: any;

    private constructor() {
        this.client = this.createClientFromDefn();
    }

    public static get Instance(): ImageService {
        if (!this._instance) {
            this._instance = new ImageService();
        }
        return this._instance;
    }

    private createClientFromDefn(): any {
        const imageServiceConfig = config["image-service"]
        const defnPath = path.join(path.join(__dirname, "../definitions/" + imageServiceConfig["protofile"]));
        const packageDefinition = protoLoader.loadSync(
            defnPath,
            {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            });
        const imgPkg = grpc.loadPackageDefinition(packageDefinition).img;

        return new imgPkg.ImageService(imageServiceConfig["serverIP"] + ":" + imageServiceConfig["servicePort"], grpc.credentials.createInsecure());
    }


    public async getImage(imageLocation: ImageLocation): Promise<Image> {

        return new Promise<any>((resolve, reject) => {
            this.client.getImage(imageLocation, (err: any, response: any) => {
                if (err) {
                    reject(err);
                }
                resolve(response);
            });
        });
    }

    /**
     * tries to store all the images and waits for 4 seconds to retrieve the response frm the server
     * @param images List of Images 
     * @returns 
     */
    public async storeImages(images: Image[]): Promise<StoreResult[]> {

        const responses = [] as StoreResult[];
        const call: Duplex = this.client.storeImages(async (error: any, response: any) => {
            if (error) {
                console.log("Error occured");
                return;
            }
        });

        forEach(images, async (image) => {
            call.write(image);
        });

        call.on('data', (resp: any) => {
            responses.push(resp);
        });

        call.on('error', function (e) {
            console.log("error occured while trying to store images");
        });

        call.on('end', function () {
            call.end()
        })

        while (!call.readableEnded) {
            var length = responses.length;

            if (length > 0) {
                await sleep(3000);
            } else {
                await sleep(4000);
            }

            if (responses.length == length) {
                call.destroy();
                return responses;
            }
        }
        return [];
    }

    public async getImageMetadata(imageListRequest: ImageListRequest): Promise<ImageMetadata[]> {

        const responses = [] as ImageMetadata[];
        const call: Duplex = this.client.getImagesMetadata(imageListRequest);

        console.log("here");

        // call.on('data', (resp: any) => {
        //     responses.push(resp);
        //     console.log(JSON.stringify(resp));
        // });

        call.on('data', function (response) {
            console.log(response);
            responses.push(response);
        });

        // call.on('end', function () {
        //     // return responses;
        // });


        while (!call.readableEnded) {
            var length = responses.length;

            if (length > 0) {
                await sleep(1000);
            } else {
                await sleep(2000);
            }

            if (responses.length == length) {
                call.destroy();
                return responses;
            }
        }
        return responses;
    }
}

const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


// async function test() {
//     const images: Image[] = [{ imageData: '12345', imageName: 'sampole.txt', userId: "vdembla@iu.edu" },
//     { imageData: '12345', imageName: 'sampole.txt', userId: "vdembla@iu.edu" },
//     { imageData: '12345', imageName: 'sampole.txt', userId: "vdembla@iu.edu" },
//     { imageData: '12345', imageName: 'sampole.txt', userId: "vdembla@iu.edu" },
//     { imageData: '12345', imageName: 'sampole.txt', userId: "vdembla@iu.edu" },
//     { imageData: '12345', imageName: 'sampole.txt', userId: "vdembla@iu.edu" }]
//     const imageService: ImageService = ImageService.Instance;
//     const results = await imageService.storeImages(images);
//     return results;
// }

// // test();
// test().then((responses) => {
//     console.log(responses)
// }).catch((e) => {
//     console.log("Error " + e)
// });