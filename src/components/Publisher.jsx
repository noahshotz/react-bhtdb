import axios from "axios";
import React, { useEffect, useState } from "react";

import { FiLoader as Loading } from "react-icons/fi"


async function getSampleData(isLoading, setLoading, myData, setMyData) {
    const url = "http://localhost:8010/proxy/publisher"
    await axios.get(url).then(response => {
        setMyData(response.data);
        setLoading(false);
    })
}

export default function Publisher() {

    const [isLoading, setLoading] = useState(true);
    const [myData, setMyData] = useState();

    useEffect(() => {
        getSampleData(isLoading, setLoading, myData, setMyData)
    }, [])

    if (isLoading) {
        return <h3>Data is loading <Loading className="rotating"/></h3>
    }

    return (
        <React.Fragment>
            <div>
                <h3>Tabelle <i>publisher</i></h3>
                <h4>Abfrage:</h4>
                <code>SELECT * FROM publisher</code>
                <h4>Rückgabe:</h4>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Sitz</th>
                            <th>Gründung</th>
                            <th>Aktiv</th>
                            <th>Logo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myData.map((rows) => (
                            <tr key={rows.pubId}>
                                <td>{rows.pubId}</td>
                                <td>{rows.name}</td>
                                <td>{rows.sitz}</td>
                                <td>{rows.gruendung}</td>
                                <td>{rows.aktiv}</td>
                                <td>{rows.logo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}