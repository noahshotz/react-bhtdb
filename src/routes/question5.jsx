import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'
import { BsArrowLeftShort as ArrowLeft } from "react-icons/bs";

import { FiLoader as Loading } from "react-icons/fi"

async function getData(isLoading, setLoading, myData, setMyData) {
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

export default function question5() {

    const [isLoading, setLoading] = useState(true);
    const [myData, setMyData] = useState();

    const i = 5
    const question = "Wie sah die Verteilung auf verschiedenen Plattformen aus?"
    const query = "SELECT platform.pId, CONCAT(hersteller, ' ', name) AS platform, COUNT(*) AS count FROM platform, QUERYDATA WHERE QUERYDATA.QUERY LIKE CONCAT('%', platform.name, '%') GROUP BY name ORDER BY count DESC LIMIT 10"

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
                                    <th>Plattform</th>
                                    <th>Anfragen</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myData.map((rows, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
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
                                        label: 'Anfrage',
                                        data: myData.map((label) => (label.count)),
                                    }
                                ],
                            }}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}