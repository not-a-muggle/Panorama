export interface SessionInfo {
    userId: string;
    sessionId: string;
}

export interface ActivityInfo {
    activityDesc: string;
    time: string;
}


export interface Activity {
    userId: string;
    sessionId: string;
    activityDesc: string;
    time: string;
}

export interface LogResult {
    logged: boolean;
}