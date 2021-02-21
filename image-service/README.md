# Image Service

## Functionliaties

Image Service is responsible for handling of the images; that is storing images to Google Drive belonging to a particular user; retrieving images for a particular user.

## Working

Image Service uses sqlite3 for as a database to store metadata related to image location on the drive.
The serivce uses Google Drive as the cloud storage for the image data. We have created a new app associated with our project email
project.panorama.iub@gmail.com on Google Cloud and using that project to access the files of a google drive.

## Installation

### Software Requirements

* Python 3.8
* pip3
* virtualenv
* Python modules listed in `requirements.txt`

### Create a virtual environment based on Python `3.8`

You need to have python3 installed on your machine. If this requirement is satisifed, you can install `virtualenv` by using the the [link](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/).

Once the virtualenv setup is done, please activate the environment using the command below:

> source <venv_folder_name>/bin/activate4

All the requirements for the repository are mentioned in the file `requirements.txt`.

These requirements can be installed using 

> pip install -r requirements.txt

or by following the blog [here](https://intellipaat.com/community/31672/how-to-use-requirements-txt-to-install-all-dependencies-in-a-python-project).


### Execution

Activate the virtual environment.


The server for the python app is running on port `50054`.
To start the server, execute the command below in the virtual environment context.

> python3 server.py


## Implementation Status

The service is exposed via `gRPC`. The implmentation of the procedures is not complete as all the services are not exposed yet, however, local methods to retrieve image data and locate images on the drive is complete.

`DriveAccessor` class in `drive.py` is used to access Google Drive.

`DatabaseClient` under `dbclient.py` is used to handle all `sqlite3` related functionalities.

`UserImageAccessor` provides the functionalities to be called via gRPC.




