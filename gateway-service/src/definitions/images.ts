export interface ImageLocation {
    userId: string;
    imageId: string;
}

export interface Image {
    imageData: string;
    imageName: string;
    userId: string;
}

export interface ImageStoreRequest {
    imageData: string;
    imageName: string;
}

export interface ImageMetadata {
    imageName: string;
    imageCreationDate: string;
    imageId: string;
}

export interface ImageListRequest {
    userId: string;
    startIdx: number;
    endIdx: number;
}

export interface StoreResult {
    stored: boolean;
}