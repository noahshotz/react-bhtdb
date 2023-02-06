import axios from "axios";
import React, { useEffect, useState } from "react";

import { FiLoader as Loading } from "react-icons/fi"
import { BsArrowLeftShort as ArrowLeft } from "react-icons/bs";


async function getData(isLoading, setLoading, myData, setMyData) {
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
        getData(isLoading, setLoading, myData, setMyData)
    }, [])

    if (isLoading) {
        return (
            <React.Fragment>
                <div className="wrapper">
                    <a href="/" className="btn-back"><ArrowLeft /> Go back</a>
                    <div className="cp-ct">
                        <h3>Tabelle <i>platform</i></h3>
                        <h4>Abfrage:</h4>
                        <code>SELECT * FROM platform</code>
                        <h4>Rückgabe:</h4>
                        <div className="isLoading">
                            <h3>Data is loading <Loading className="rotating" /></h3>
                            <small>Geschätzte Ladezeit: - s</small>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <div className="wrapper">
                <a href="/" className="btn-back"><ArrowLeft /> Go back</a>
                <div className="cp-ct">
                    <h3>Tabelle <i>platform</i></h3>
                    <h4>Abfrage:</h4>
                    <code>SELECT * FROM platform</code>
                    <h4>Rückgabe:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th className="id-col">pId</th>
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
            </div>
        </React.Fragment>
    )
}