import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';

const columns = [
    {
        field: 'id', headerName: 'ID', width: 70, 
    },


    { field: 'imageName', headerName: 'Image Name', width: 500, renderCell: (params) => {
        return(
            <Link to={`Image/${params.row.id}`}
            >
                {params.value}
            </Link>
        )
    }, },
    {
        field: 'date',
        headerName: 'Date Modified',
        type: 'date',
        width: 150,
    },
];

const rows = [
    { id: 1, imageName: 'Snow', date: '11/23/2020' },
    { id: 2, imageName: 'Lannister', date: '11/22/2020' },
    { id: 3, imageName: 'Lannister', date: '10/23/2019' },
    { id: 4, imageName: 'Stark', date: '2/27/2018' },
    { id: 5, imageName: 'Targaryen', date: '3/4/2019' },
    { id: 6, imageName: 'Melisandre', date: '6/23/2015' },
    { id: 7, imageName: 'Clifford', date: '7/22/2018' },
    { id: 8, imageName: 'Frances', date: '9/27/2016' },
    { id: 9, imageName: 'Roxie', date: '6/13/2012' },
];

export default function ImageList() {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={25} />
        </div>
    );
}

