package edu;

import javax.xml.crypto.Data;

public class LogServiceServer extends LogServiceGrpc.LogServiceImplBase {
    @Override
    public void logActivity(SessionLog.Activity request,
                            io.grpc.stub.StreamObserver<SessionLog.LogResult> responseObserver) {
        String userId = request.getUserId();
        String sessionId = request.getSessionId();
        String activityDesc = request.getActivityDesc();
        String time = request.getTime();
        // log result to mongoDB
        DatabaseClient databaseClient = DatabaseClient.getInstance();

        databaseClient.insertActivity(userId, sessionId, activityDesc, time);
        SessionLog.LogResult logResult = SessionLog.LogResult.newBuilder().setLogged(true).build();
        System.out.println("Logged activity for user " + userId + " corresponding to session " + sessionId);
        responseObserver.onNext(logResult);
        responseObserver.onCompleted();
    }

    @Override
    public void fetchActivites(SessionLog.SessionInfo request,
                               io.grpc.stub.StreamObserver<SessionLog.Activity> responseObserver) {
        String userId = request.getUserId();
        String sessionId = request.getSessionId();

        DatabaseClient databaseClient = DatabaseClient.getInstance();
        SessionLog.Activity[] result = databaseClient.fetchActivities(userId, sessionId);
        if (result == null) {
            return;
        }
        for (SessionLog.Activity activity : result) {
            responseObserver.onNext(activity);
        }
        responseObserver.onCompleted();
    }

}
