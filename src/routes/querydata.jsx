import axios from "axios";
import React, { useEffect, useState } from "react";

import { BsArrowLeftShort as ArrowLeft } from "react-icons/bs";
import { FiLoader as Loading } from "react-icons/fi"

async function getData(isLoading, setLoading, myData, setMyData) {
    const proxy = "https://web-production-0fb1.up.railway.app/"
    const baseURL = "backend-bhtdb-production.up.railway.app/"
    const request = "querydata"
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

export default function Querydata() {

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
                        <h3>Tabelle <i>QUERYDATA</i></h3>
                        <h4>Abfrage:</h4>
                        <code>SELECT * FROM QUERYDATA LIMIT 5</code>
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
                <div className="cp-ct">
                    <a href="/" className="btn-back"><ArrowLeft /> Go back</a>
                    <h3>Tabelle <i>QUERYDATA</i></h3>
                    <h4>Abfrage:</h4>
                    <code>SELECT * from QUERYDATA LIMIT 5</code>
                    <h4>Rückgabe:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th className="id-col">ID</th>
                                <th>ANONID</th>
                                <th>QUERY</th>
                                <th>QUERYTIME</th>
                                <th>ITEMRANK</th>
                                <th>CLICKURL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myData.map((rows) => (
                                <tr key={rows.ID}>
                                    <td>{rows.ID}</td>
                                    <td>{rows.ANONID}</td>
                                    <td>{rows.QUERY}</td>
                                    <td>{rows.QUERYTIME}</td>
                                    <td>{rows.ITEMRANK}</td>
                                    <td className="url-col">{rows.CLICKURL}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}