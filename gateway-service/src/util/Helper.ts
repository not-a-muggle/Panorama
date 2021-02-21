export default class Helper {
    /**
     * Encode String to base64
     * @param payload Payload for the Encoding 
     */
    public static encodeB64(payload: string): string {
        if(!payload) {
            return payload;
        } 

        const encoded = Buffer.from(payload).toString('base64');
        return encoded;
    }

    /**
     * Decode String from base64
     * @param payload Payload to be decoded
     */
    public static decodeB64(payload:  string): string {
        if(!payload) {
            return payload;
        }
        const decoded = Buffer.from(payload, 'base64').toString('ascii');
        return decoded;
    }
}