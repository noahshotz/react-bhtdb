import axios from "axios";
import React, { useEffect, useState } from "react";

import { FiLoader as Loading } from "react-icons/fi"


async function getSampleData(isLoading, setLoading, myData, setMyData) {
    const proxy = "https://web-production-0fb1.up.railway.app/"
    const baseURL = "backend-bhtdb-production.up.railway.app/"
    const request = "platform"
    const fetchURL = proxy + baseURL + request

    await axios.get(fetchURL,
        {
            headers: {
                "x-requested-with": "XMLHttpRequest"
            }
        }).then(response => {
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
        return (
            <React.Fragment>
                <h3>Tabelle <i>platform</i></h3>
                <h4>Abfrage:</h4>
                <code>SELECT * FROM platform</code>
                <h4>Rückgabe:</h4>
                <h3 className="isLoading">Data is loading <Loading className="rotating" /></h3>
            </React.Fragment>
        )
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
                            <th className="id-col">ID</th>
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