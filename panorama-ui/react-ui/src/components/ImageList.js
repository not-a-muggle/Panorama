import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';
import axios from 'axios';

const columns = [
    {
        field: 'imageName', headerName: 'Image Name', flex: 3, renderCell: (params) => {
            return (
                <Link to={`Image/${params.row.id}`}>
                    {params.value}
                </Link>
            )
        },
    },
    {
        field: 'imageCreationDate',
        headerName: 'Date Created',
        type: 'date',
        flex: 1,
        align: 'center',
        headerAlign: 'center'
    },
];



export default function ImageList() {

    const [rows, setRows] = useState([]);

    React.useEffect(() => {
        const username = localStorage.getItem("username");
        const jwtToken = localStorage.getItem("login_access_token");
        const baseURL = process.env.gatewayServerIP + ":" + process.env.gatewayServicePort || 'http://localhost:3000'
        axios.get(`${baseURL}/imageList?username=${username}`, { headers: { 'Authorization': "Bearer " + jwtToken } })
            .then(res => {

                setRows(res.data.map(row => {
                    row["id"] = row["imageId"];
                    return row;
                })
                );
            })
    }, []);


    return (
        <div style={{ height: 1000, width: '100%', margin: '64px' }}>
            <DataGrid rows={rows} columns={columns} pageSize={25} />
        </div>
    );
}

