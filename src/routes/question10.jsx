import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'
import { BsArrowLeftShort as ArrowLeft } from "react-icons/bs";

import { FiLoader as Loading } from "react-icons/fi"

async function getData(isLoading, setLoading, myData, setMyData) {
    const proxy = "https://web-production-0fb1.up.railway.app/"
    const baseURL = "backend-bhtdb-production.up.railway.app/"
    const request = "q10"
    const fetchURL = proxy + baseURL + request

    await axios.get(fetchURL,
        {
            headers: {
                "x-requested-with": "XMLHttpRequest"
            }
        }).then(response => {
            setMyData(response.data);
            setLoading(false);
        }
        )
}

export default function question10() {

    const [isLoading, setLoading] = useState(true);
    const [myData, setMyData] = useState();

    const i = 10
    const question = "Was sind die am längsten bestehenden Entwickler der von uns untersuchten Spiele?"
    const query = "SELECT publisher.name, publisher.gruendung FROM publisher WHERE publisher.aktiv LIKE 1 ORDER BY publisher.gruendung ASC LIMIT 10"

    useEffect(() => {
        getData(isLoading, setLoading, myData, setMyData)
    }, [])

    if (isLoading) {
        return (
            <React.Fragment>
                <div className="wrapper">
                    <a href="/" className="btn-back"><ArrowLeft /> Go back</a>
                    <div className="cp-ct">
                        <h2>Frage {i}</h2>
                        <h3>{question}</h3>
                        <h4>Abfrage:</h4>
                        <code>{query}</code>
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

    if (!isLoading) {
        return (
            <React.Fragment>
                <div className="wrapper">
                    <a href="/" className="btn-back"><ArrowLeft /> Go back</a>
                    <div className="cp-ct">
                        <h2>Frage {i}</h2>
                        <h3>{question}</h3>
                        <h4>Abfrage:</h4>
                        <code>{query}</code>
                        <h4>Rückgabe:</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th className="id-col">#</th>
                                    <th>Entwickler</th>
                                    <th>Gründung</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myData.map((rows, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{rows.name}</td>
                                        <td>{rows.gruendung}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Bar
                            datasetIdKey='id'
                            options={{
                                indexAxis: 'y',
                                scales: {
                                    x: {
                                        beginAtZero: false,
                                        max: 2023,
                                        ticks: {
                                            callback: (label) => `${label}`
                                        }
                                    }
                                }
                            }}
                            data={{
                                labels: myData.map(label => label.name),
                                datasets: [
                                    {
                                        id: 1,
                                        label: 'Zeitraum',
                                        data: myData.map(label => [label.gruendung, 2023])
                                    }
                                ]
                            }}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}