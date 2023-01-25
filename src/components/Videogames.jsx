import axios from "axios";
import React, { useEffect, useState } from "react";

import { FiLoader as Loading } from "react-icons/fi"


async function getSampleData(isLoading, setLoading, myData, setMyData) {
    const url = "https://web-production-0fb1.up.railway.app/www.backend-bhtdb-production.up.railway.app/videogames"
    // set the request headers "origin,x-requested-with" to "https://web-production-0fb1.up.railway.app" and "XMLHttpRequest"

    await axios.get(url, 
        {
            headers: {
                "origin": "https://web-production-0fb1.up.railway.app",
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
        return <h3 className="isLoading">Data is loading <Loading className="rotating"/></h3>
    }

    return (
        <React.Fragment>
            <div>
                <h3>Tabelle <i>videogames</i></h3>
                <h4>Abfrage:</h4>
                <code>SELECT * from videogames LIMIT 5</code>
                <h4>Rückgabe:</h4>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
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
                                <td>{rows.name}</td>
                                <td>{rows.release_year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}