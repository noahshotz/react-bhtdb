import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'
import { BsArrowLeftShort as ArrowLeft } from "react-icons/bs";

import { FiLoader as Loading } from "react-icons/fi"

async function getData(isLoading, setLoading, myData, setMyData) {
    const proxy = "https://web-production-0fb1.up.railway.app/"
    const baseURL = "backend-bhtdb-production.up.railway.app/"
    const request = "q3"
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

export default function question3() {

    const [isLoading, setLoading] = useState(true);
    const [myData, setMyData] = useState();

    const i = 3
    const question = "Waren Solo oder Co-OP Spiele häufiger in den Suchanfragen?"
    const query = "SELECT videogames.max_players, COUNT(*) AS count FROM videogames, QUERYDATA WHERE QUERYDATA.QUERY LIKE CONCAT('%', videogames.title, '%') GROUP BY videogames.max_players ORDER BY count DESC"

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
                                    <th>Max Players</th>
                                    <th>Anfragen</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myData.map((rows) => (
                                    <tr>
                                        <td>{rows.max_players  === 1 ? "Single player" : "Co-Op"}</td>
                                        <td>{rows.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="chart-ct">
                            <Doughnut
                                datasetIdKey='id'
                                data={{
                                    labels: myData.map((label) => (label.max_players)),
                                    datasets: [
                                        {
                                            id: 1,
                                            label: 'Anfragen',
                                            data: myData.map((label) => (label.count))
                                        }
                                    ],
                                }}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}