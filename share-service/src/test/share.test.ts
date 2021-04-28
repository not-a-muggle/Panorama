import ShareServiceCore from "../core/Share";

describe('Share Unshare ', async () => {
    it("share", async () => {
        const share: ShareServiceCore = new ShareServiceCore();
        await share.shareImages('123', '345', ['123', '124', '125']);

    });
    it("unshare", async () => {
        const share: ShareServiceCore = new ShareServiceCore();
        await share.unshareImages('123', '345', ['123', '124', '125']);
    })
})
