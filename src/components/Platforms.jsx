import axios from "axios";
import React, { useEffect, useState } from "react";

import { FiLoader as Loading } from "react-icons/fi"


async function getSampleData(isLoading, setLoading, myData, setMyData) {
    const url = "http://localhost:8010/proxy/platform"
    await axios.get(url).then(response => {
        setMyData(response.data);
        setLoading(false);

    })
}

export default function Platforms() {

    const [isLoading, setLoading] = useState(true);
    const [myData, setMyData] = useState();

    useEffect(() => {
        getSampleData(isLoading, setLoading, myData, setMyData)
    }, [])

    if (isLoading) {
        return <h3>Data is loading <Loading /></h3>
    }

    return (
        <React.Fragment>
            <div>
                <h3>Tabelle <i>platform</i></h3>
                <h4>Abfrage:</h4>
                <code>SELECT * FROM platform</code>
                <h4>Rückgabe:</h4>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Hersteller</th>
                            <th>Release year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myData.map((rows) => (
                            <tr key={rows.pId}>
                                <td>{rows.pId}</td>
                                <td>{rows.name}</td>
                                <td>{rows.hersteller}</td>
                                <td>{rows.releaseYear}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}