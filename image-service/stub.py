import grpc
import images_pb2_grpc
import images_pb2


channel = grpc.insecure_channel("127.0.0.1:50054",  options=[('grpc.enable_http_proxy', 0), (
    'grpc.max_receive_message_length', 16157952), ('grpc.max_send_message_length', 16157952)])


stub = images_pb2_grpc.ImageServiceStub(channel)
imageLocation = images_pb2.ImageLocation(
    userId="vdembla@iu.edu", imageId="1Gp6ki6DsKGsQNvcGnktAQIybwQT-5tKT")

imageLocation2 = images_pb2.ImageLocation(
    userId="vdembla@iu.edu", imageId="1LgvzG9zAKPVVXlbFNfAS2Efo7qYovwK7")

imageLocation3 = images_pb2.ImageLocation(
    userId="vdembla@iu.edu", imageId="1MOO4nJmBlpi8bJrTP7MG0PXTT2X0Ie_q")

imageLocations = [imageLocation, imageLocation2, imageLocation3]

# result = stub.getImage(imageLocation)

results = []
for result in stub.getImages(iter(imageLocations)):
    results.append(result)


for result in stub.storeImages(iter(results)):
    print(result.stored)    
channel.close()
# print(result)
