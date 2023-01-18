import React, { useEffect, useState } from "react";
import Platforms from './Platforms'
import Publisher from './Publisher'
import Videogames from './Videogames'

export default function Datasets() {
    return (
        <React.Fragment>
            <h2>Datensätze</h2>
            <Platforms />
            <Publisher />
            <Videogames />
        </React.Fragment>
    )
}