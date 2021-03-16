package edu.iu;

import io.grpc.Server;
import io.grpc.ServerBuilder;

import java.io.IOException;

/**
 * Server Started
 */
public class App {
    public static void main(String[] args) {
        Server server = ServerBuilder.forPort(50055).addService(new LogServiceServer()).build();
        System.out.println("Started Session Log Server at port 50055");
        try {
            server.start();
            server.awaitTermination();
        } catch (IOException | InterruptedException e) {
               e.printStackTrace();
        }
    }
}
