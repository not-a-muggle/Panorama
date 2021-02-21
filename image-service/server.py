import grpc
from concurrent import futures
import time

import images_pb2
import images_pb2_grpc

server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))


images_pb2_grpc.add_ImageServiceServicer_to_server(images_pb2_grpc.ImageServiceServicer(), server)
server.add_insecure_port('[::]:50054')
server.start()
print("Image Server Started on port 50054")
try:
    while True:
        time.sleep(86400)
except KeyboardInterrupt:
    server.stop(0)