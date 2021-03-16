import { useParams } from "react-router";
import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function () {
  let { id } = useParams();
  const [imageData, setImageData] = useState([]);

  React.useEffect(() => {
    const username = localStorage.getItem("username");
    const jwtToken = localStorage.getItem("login_access_token");
    const imageId = id;

    axios.get(`http://localhost:3000/image?username=${username}&imageId=${id}`, { headers: { 'Authorization': "Bearer " + jwtToken } })
      .then(res => {
        setImageData(res.data.imageData);
      })
  }, []);
  return (<img src={imageData} />);

}