package edu;

//
//import io.grpc.ManagedChannel;
//import io.grpc.ManagedChannelBuilder;
//
//import java.util.Iterator;
//
public class Stub {
//    public static void main(String[] args) {
//        ManagedChannel managedChannel = ManagedChannelBuilder.forAddress("localhost", 50055).usePlaintext().build();
//        LogServiceGrpc.LogServiceBlockingStub stub = LogServiceGrpc.newBlockingStub(managedChannel);
//        SessionLog.LogResult logResult = stub.logActivity(SessionLog.Activity.newBuilder().setSessionId("a").setActivityDesc("hello world").setUserId("vdembla@iu.edu").build());
////        Iterator<SessionLog.Activity> iterator = stub.fetchActivites(SessionLog.SessionInfo.newBuilder().setSessionId("a").setUserId("vdembla@iu.edu").build());
////        while(iterator.hasNext()) {
////            System.out.println(iterator.next().toString());
////        }
////        managedChannel.shutdown();
//    }
}
