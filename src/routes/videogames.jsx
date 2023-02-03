import axios from "axios";
import React, { useEffect, useState } from "react";

import { BsArrowLeftShort as ArrowLeft } from "react-icons/bs";
import { FiLoader as Loading } from "react-icons/fi"

async function getSampleData(isLoading, setLoading, myData, setMyData) {
    const proxy = "https://web-production-0fb1.up.railway.app/"
    const baseURL = "backend-bhtdb-production.up.railway.app/"
    const request = "videogames"
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

export default function Videogames() {

    const [isLoading, setLoading] = useState(true);
    const [myData, setMyData] = useState();

    useEffect(() => {
        getSampleData(isLoading, setLoading, myData, setMyData)
    }, [])

    if (isLoading) {
        return (
            <React.Fragment>
                <div className="wrapper">
                    <a href="/" className="btn-back"><ArrowLeft /> Go back</a>
                    <div className="cp-ct">
                        <h3>Tabelle <i>videogames</i></h3>
                        <h4>Abfrage:</h4>
                        <code>SELECT * from videogames LIMIT 10</code>
                        <h4>Rückgabe:</h4>
                        <h3 className="isLoading">Data is loading <Loading className="rotating" /></h3>
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
                    <h3>Tabelle <i>videogames</i></h3>
                    <h4>Abfrage:</h4>
                    <code>SELECT * from videogames LIMIT 10</code>
                    <h4>Rückgabe:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th className="id-col">ID</th>
                                <th>Titel</th>
                                <th>Max. players</th>
                                <th>Genre</th>
                                <th>Publisher</th>
                                <th>Platform</th>
                                <th>Release year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myData.map((rows) => (
                                <tr key={rows.gId}>
                                    <td>{rows.gId}</td>
                                    <td>{rows.title}</td>
                                    <td>{rows.max_players}</td>
                                    <td>{rows.genre}</td>
                                    <td>{rows.publisher}</td>
                                    <td>{rows.platform}</td>
                                    <td>{rows.release_year}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}