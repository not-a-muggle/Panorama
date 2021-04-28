import ShareServiceCore from "../core/Share";

const share: ShareServiceCore = new ShareServiceCore();
// share.shareImages('123','345',['123','124','125']);
share.unshareImages('123','345', ['123','124','125']);