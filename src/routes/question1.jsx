import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'

import { FiLoader as Loading } from "react-icons/fi"

async function getQ5(isLoading, setLoading, myData, setMyData) {
    const url = "http://localhost:8010/proxy/q5"
    await axios.get(url).then(response => {
        setMyData(response.data);
        setLoading(false);
    })
}

export default function question1() {

    const [isLoading, setLoading] = useState(true);
    const [myData, setMyData] = useState();

    useEffect(() => {
        getQ5(isLoading, setLoading, myData, setMyData)
    }, [])

    if (isLoading) {
        return (
            <React.Fragment>
                <div className="wrapper">
                    <a href="/">Back</a>
                    <h3>Data is loading <Loading /></h3>
                </div>
            </React.Fragment>
        )
    }

    if (!isLoading) {
        return (
            <React.Fragment>
                <div className="wrapper">
                    <a href="/">Back</a>
                    <h2>Frage 1</h2>
                    <h3>5. Wie sah die Verteilung auf verschiedenen Plattformen aus?</h3>
                    <h4>Abfrage:</h4>
                    <code>SELECT platform.pId, CONCAT(hersteller, ' ', name) as platform, COUNT(*) AS count from platform, QUERYDATA WHERE QUERYDATA.QUERY LIKE CONCAT('% ', platform.name, '%') GROUP BY name ORDER BY count DESC</code>
                    <h4>Rückgabe:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>pId</th>
                                <th>Plattform</th>
                                <th>Anfragen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myData.map((rows) => (
                                <tr key={rows.pId}>
                                    <td>{rows.pId}</td>
                                    <td>{rows.platform}</td>
                                    <td>{rows.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Bar
                        datasetIdKey='id'
                        data={{
                            labels: myData.map((label) => (label.platform)),
                            datasets: [
                                {
                                    id: 1,
                                    label: 'Plattformen',
                                    data: myData.map((label) => (label.count)),
                                }
                            ],
                        }}
                    />
                </div>
            </React.Fragment>
        )
    }
}