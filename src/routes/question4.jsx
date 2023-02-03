import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'
import { BsArrowLeftShort as ArrowLeft } from "react-icons/bs";

import { FiLoader as Loading } from "react-icons/fi"

async function getQ4(isLoading, setLoading, myData, setMyData) {
    const proxy = "https://web-production-0fb1.up.railway.app/"
    const baseURL = "backend-bhtdb-production.up.railway.app/"
    const request = "q4"
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

export default function question4() {

    const [isLoading, setLoading] = useState(true);
    const [myData, setMyData] = useState();

    const i = 4
    const question = "In welchem Land wurden die meisten der von uns untersuchten Spiele entwickelt?"
    const query = "select publisher.sitz, count(*) as count from videogames left join publisher on videogames.publisher = publisher.pubId group by publisher.sitz order by count desc limit 10"

    useEffect(() => {
        getQ4(isLoading, setLoading, myData, setMyData)
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
                        <h3 className="isLoading">Data is loading <Loading className="rotating" /></h3>
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
                                    <th className="id-col">pId</th>
                                    <th>Plattform</th>
                                    <th>Anzahl</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myData.map((rows,index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{rows.sitz}</td>
                                        <td>{rows.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Doughnut
                            datasetIdKey='id'
                            data={{
                                labels: myData.map((label) => (label.sitz)),
                                datasets: [
                                    {
                                        id: 1,
                                        label: 'Anzahl',
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