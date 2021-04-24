import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';
import axios from 'axios';



export default function ImageList({ selectedRows, setSelectedRows }) {

    const [rows, setRows] = useState([]);

    React.useEffect(() => {
        const username = localStorage.getItem("username");
        const jwtToken = localStorage.getItem("login_access_token");
        // const baseURL = process.env.gatewayServerIP + ":" + process.env.gatewayServicePort || 'http://localhost:3000'
        const baseURL = "http://149.165.171.5:30200"
        axios.get(`${baseURL}/imageList?username=${username}`, { headers: { 'Authorization': "Bearer " + jwtToken } })
            .then(res => {

                setRows(res.data.map(row => {
                    row["id"] = row["imageId"];
                    // date parsing
                    const creationDate = new Date(Date.parse(row["imageCreationDate"]));
                    row["imageCreationDate"] = `${creationDate.toLocaleDateString()}  ${creationDate.toTimeString().substr(0, 8)}`;
                    console.log(row["imageCreationDate"])
                    return row;
                })
                );
            })
    }, []);

    // select change for checkbox
    const onSelectChange = (e) => {
        const selectedRow = e.currentTarget.dataset.imgid;
        if (!e.currentTarget.checked) {
            setSelectedRows([...selectedRows, selectedRow]);
        } else {
            const idx = selectedRows.indexOf(selectedRow);
            setSelectedRows([...selectedRows.slice(0, idx), ...selectedRows.slice(idx + 1)]);
        }

    }

    const clickColumnHeader = (params) => {
        console.log(params)
        if (params.field != "isChecked") {
            return;
        }
        if (selectedRows.length !== rows.length) {
            setSelectedRows([...rows.map(x => x.id)]);
        } else {
            setSelectedRows([]);
        }

    }

    const columns = [
        {
            field: 'isChecked', headerName: 'Select All', flex: 3, renderCell: (params) => {
                return (
                    <input type="checkbox" data-imgid={params.row.id} onClick={onSelectChange} onChange={onSelectChange} checked={selectedRows.indexOf(params.row.id) != -1} />
                );
            }
        },
        {

            field: 'imageName', headerName: 'Image Name', flex: 20, renderCell: (params) => {
                return (
                    <Link to={`Image/${params.row.id}`}>
                        {params.value}
                    </Link>
                )
            }
        },
        {
            field: 'imageCreationDate',
            headerName: 'Date Created',
            type: 'string',
            flex: 6,
            align: 'center',
            headerAlign: 'center'
        },
    ];

    return (
        <div style={{ height: 1000, width: '100%', margin: '64px' }}>
            <DataGrid rows={rows} columns={columns} pageSize={25} onColumnHeaderClick={clickColumnHeader} />
        </div>
    );
}
