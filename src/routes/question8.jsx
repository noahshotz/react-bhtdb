import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'
import { BsArrowLeftShort as ArrowLeft } from "react-icons/bs";

import { FiLoader as Loading } from "react-icons/fi"

async function getQuestion(isLoading, setLoading, myData, setMyData) {
    const proxy = "https://web-production-0fb1.up.railway.app/"
    const baseURL = "backend-bhtdb-production.up.railway.app/"
    const request = "q8"
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

export default function question() {

    const [isLoading, setLoading] = useState(true);
    const [myData, setMyData] = useState();

    const i = 8
    const question = "Welche Spiele verzeichnen eine Häufung an (oder gar keine) Suchen nach Cheatcodes?"
    const query = "SELECT videogames.gId, videogames.title as game, count(*) as count from videogames, QUERYDATA WHERE QUERYDATA.QUERY LIKE CONCAT('%', videogames.title, '%') AND QUERYDATA.QUERY LIKE CONCAT('%', 'cheat', '%') GROUP BY videogames.title ORDER BY count desc LIMIT 10"

    useEffect(() => {
        getQuestion(isLoading, setLoading, myData, setMyData)
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
                                    <th className="id-col">gId</th>
                                    <th>Spiel</th>
                                    <th>Anfragen</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myData.map((rows, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{rows.game}</td>
                                        <td>{rows.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Bar
                            datasetIdKey='id'
                            data={{
                                labels: myData.map((label) => (label.game)),
                                datasets: [
                                    {
                                        id: 1,
                                        label: `Anfragen, die das Wort "cheats" enthielten`,
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