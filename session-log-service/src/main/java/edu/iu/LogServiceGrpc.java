package edu.iu;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
        value = "by gRPC proto compiler (version 1.36.0)",
        comments = "Source: session-log.proto")
public final class LogServiceGrpc {

  private LogServiceGrpc() {}

  public static final String SERVICE_NAME = "LogService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<SessionLog.Activity,
          SessionLog.LogResult> getLogActivityMethod;

  @io.grpc.stub.annotations.RpcMethod(
          fullMethodName = SERVICE_NAME + '/' + "logActivity",
          requestType = SessionLog.Activity.class,
          responseType = SessionLog.LogResult.class,
          methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<SessionLog.Activity,
          SessionLog.LogResult> getLogActivityMethod() {
    io.grpc.MethodDescriptor<SessionLog.Activity, SessionLog.LogResult> getLogActivityMethod;
    if ((getLogActivityMethod = LogServiceGrpc.getLogActivityMethod) == null) {
      synchronized (LogServiceGrpc.class) {
        if ((getLogActivityMethod = LogServiceGrpc.getLogActivityMethod) == null) {
          LogServiceGrpc.getLogActivityMethod = getLogActivityMethod =
                  io.grpc.MethodDescriptor.<SessionLog.Activity, SessionLog.LogResult>newBuilder()
                          .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
                          .setFullMethodName(generateFullMethodName(SERVICE_NAME, "logActivity"))
                          .setSampledToLocalTracing(true)
                          .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                                  SessionLog.Activity.getDefaultInstance()))
                          .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                                  SessionLog.LogResult.getDefaultInstance()))
                          .setSchemaDescriptor(new LogServiceMethodDescriptorSupplier("logActivity"))
                          .build();
        }
      }
    }
    return getLogActivityMethod;
  }

  private static volatile io.grpc.MethodDescriptor<SessionLog.SessionInfo,
          SessionLog.Activity> getFetchActivitesMethod;

  @io.grpc.stub.annotations.RpcMethod(
          fullMethodName = SERVICE_NAME + '/' + "fetchActivites",
          requestType = SessionLog.SessionInfo.class,
          responseType = SessionLog.Activity.class,
          methodType = io.grpc.MethodDescriptor.MethodType.SERVER_STREAMING)
  public static io.grpc.MethodDescriptor<SessionLog.SessionInfo,
          SessionLog.Activity> getFetchActivitesMethod() {
    io.grpc.MethodDescriptor<SessionLog.SessionInfo, SessionLog.Activity> getFetchActivitesMethod;
    if ((getFetchActivitesMethod = LogServiceGrpc.getFetchActivitesMethod) == null) {
      synchronized (LogServiceGrpc.class) {
        if ((getFetchActivitesMethod = LogServiceGrpc.getFetchActivitesMethod) == null) {
          LogServiceGrpc.getFetchActivitesMethod = getFetchActivitesMethod =
                  io.grpc.MethodDescriptor.<SessionLog.SessionInfo, SessionLog.Activity>newBuilder()
                          .setType(io.grpc.MethodDescriptor.MethodType.SERVER_STREAMING)
                          .setFullMethodName(generateFullMethodName(SERVICE_NAME, "fetchActivites"))
                          .setSampledToLocalTracing(true)
                          .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                                  SessionLog.SessionInfo.getDefaultInstance()))
                          .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                                  SessionLog.Activity.getDefaultInstance()))
                          .setSchemaDescriptor(new LogServiceMethodDescriptorSupplier("fetchActivites"))
                          .build();
        }
      }
    }
    return getFetchActivitesMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static LogServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<LogServiceStub> factory =
            new io.grpc.stub.AbstractStub.StubFactory<LogServiceStub>() {
              @java.lang.Override
              public LogServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
                return new LogServiceStub(channel, callOptions);
              }
            };
    return LogServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static LogServiceBlockingStub newBlockingStub(
          io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<LogServiceBlockingStub> factory =
            new io.grpc.stub.AbstractStub.StubFactory<LogServiceBlockingStub>() {
              @java.lang.Override
              public LogServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
                return new LogServiceBlockingStub(channel, callOptions);
              }
            };
    return LogServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static LogServiceFutureStub newFutureStub(
          io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<LogServiceFutureStub> factory =
            new io.grpc.stub.AbstractStub.StubFactory<LogServiceFutureStub>() {
              @java.lang.Override
              public LogServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
                return new LogServiceFutureStub(channel, callOptions);
              }
            };
    return LogServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public static abstract class LogServiceImplBase implements io.grpc.BindableService {

    /**
     */
    public void logActivity(SessionLog.Activity request,
                            io.grpc.stub.StreamObserver<SessionLog.LogResult> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getLogActivityMethod(), responseObserver);
    }

    /**
     */
    public void fetchActivites(SessionLog.SessionInfo request,
                               io.grpc.stub.StreamObserver<SessionLog.Activity> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getFetchActivitesMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
              .addMethod(
                      getLogActivityMethod(),
                      io.grpc.stub.ServerCalls.asyncUnaryCall(
                              new MethodHandlers<
                                      SessionLog.Activity,
                                      SessionLog.LogResult>(
                                      this, METHODID_LOG_ACTIVITY)))
              .addMethod(
                      getFetchActivitesMethod(),
                      io.grpc.stub.ServerCalls.asyncServerStreamingCall(
                              new MethodHandlers<
                                      SessionLog.SessionInfo,
                                      SessionLog.Activity>(
                                      this, METHODID_FETCH_ACTIVITES)))
              .build();
    }
  }

  /**
   */
  public static final class LogServiceStub extends io.grpc.stub.AbstractAsyncStub<LogServiceStub> {
    private LogServiceStub(
            io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected LogServiceStub build(
            io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new LogServiceStub(channel, callOptions);
    }

    /**
     */
    public void logActivity(SessionLog.Activity request,
                            io.grpc.stub.StreamObserver<SessionLog.LogResult> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
              getChannel().newCall(getLogActivityMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void fetchActivites(SessionLog.SessionInfo request,
                               io.grpc.stub.StreamObserver<SessionLog.Activity> responseObserver) {
      io.grpc.stub.ClientCalls.asyncServerStreamingCall(
              getChannel().newCall(getFetchActivitesMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   */
  public static final class LogServiceBlockingStub extends io.grpc.stub.AbstractBlockingStub<LogServiceBlockingStub> {
    private LogServiceBlockingStub(
            io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected LogServiceBlockingStub build(
            io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new LogServiceBlockingStub(channel, callOptions);
    }

    /**
     */
    public SessionLog.LogResult logActivity(SessionLog.Activity request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
              getChannel(), getLogActivityMethod(), getCallOptions(), request);
    }

    /**
     */
    public java.util.Iterator<SessionLog.Activity> fetchActivites(
            SessionLog.SessionInfo request) {
      return io.grpc.stub.ClientCalls.blockingServerStreamingCall(
              getChannel(), getFetchActivitesMethod(), getCallOptions(), request);
    }
  }

  /**
   */
  public static final class LogServiceFutureStub extends io.grpc.stub.AbstractFutureStub<LogServiceFutureStub> {
    private LogServiceFutureStub(
            io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected LogServiceFutureStub build(
            io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new LogServiceFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<SessionLog.LogResult> logActivity(
            SessionLog.Activity request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
              getChannel().newCall(getLogActivityMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_LOG_ACTIVITY = 0;
  private static final int METHODID_FETCH_ACTIVITES = 1;

  private static final class MethodHandlers<Req, Resp> implements
          io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
          io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
          io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
          io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final LogServiceImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(LogServiceImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_LOG_ACTIVITY:
          serviceImpl.logActivity((SessionLog.Activity) request,
                  (io.grpc.stub.StreamObserver<SessionLog.LogResult>) responseObserver);
          break;
        case METHODID_FETCH_ACTIVITES:
          serviceImpl.fetchActivites((SessionLog.SessionInfo) request,
                  (io.grpc.stub.StreamObserver<SessionLog.Activity>) responseObserver);
          break;
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
            io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }
  }

  private static abstract class LogServiceBaseDescriptorSupplier
          implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    LogServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return SessionLog.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("LogService");
    }
  }

  private static final class LogServiceFileDescriptorSupplier
          extends LogServiceBaseDescriptorSupplier {
    LogServiceFileDescriptorSupplier() {}
  }

  private static final class LogServiceMethodDescriptorSupplier
          extends LogServiceBaseDescriptorSupplier
          implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    LogServiceMethodDescriptorSupplier(String methodName) {
      this.methodName = methodName;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.MethodDescriptor getMethodDescriptor() {
      return getServiceDescriptor().findMethodByName(methodName);
    }
  }

  private static volatile io.grpc.ServiceDescriptor serviceDescriptor;

  public static io.grpc.ServiceDescriptor getServiceDescriptor() {
    io.grpc.ServiceDescriptor result = serviceDescriptor;
    if (result == null) {
      synchronized (LogServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
                  .setSchemaDescriptor(new LogServiceFileDescriptorSupplier())
                  .addMethod(getLogActivityMethod())
                  .addMethod(getFetchActivitesMethod())
                  .build();
        }
      }
    }
    return result;
  }
}
