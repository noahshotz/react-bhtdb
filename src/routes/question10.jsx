import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'
import { BsArrowLeftShort as ArrowLeft } from "react-icons/bs";

import { FiLoader as Loading } from "react-icons/fi"

async function getQ5(isLoading, setLoading, myData, setMyData) {
    const proxy = "https://web-production-0fb1.up.railway.app/"
    const baseURL = "backend-bhtdb-production.up.railway.app/"
    const request = "q5"
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

export default function question10() {

    const [isLoading, setLoading] = useState(true);
    const [myData, setMyData] = useState();

    useEffect(() => {
        getQ5(isLoading, setLoading, myData, setMyData)
    }, [])

    if (isLoading) {
        return (
            <React.Fragment>
                <div className="wrapper">
                    <a href="/"><ArrowLeft /> Back</a>
                    <h3>Data is loading <Loading className="rotating"/></h3>
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