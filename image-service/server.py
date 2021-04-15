import grpc
from concurrent import futures
import time
import logging
import images_pb2
import images_pb2_grpc

server = grpc.server(futures.ThreadPoolExecutor(max_workers=10), options=[
    ('grpc.max_send_message_length', 16157952),
    ('grpc.max_receive_message_length', 16157952)
])



images_pb2_grpc.add_ImageServiceServicer_to_server(
    images_pb2_grpc.ImageServiceServicer(), server)
server.add_insecure_port('0.0.0.0:30300')
server.start()
print("Image Server Started on port 30300")
logging.info("server started on port 30300")
server.wait_for_termination()
# try:
#     while True:
#         time.sleep(86400)
# except KeyboardInterrupt:
#     server.stop(0)
