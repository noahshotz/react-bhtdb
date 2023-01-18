--- Frage 1: Nach welchen Spielen (Top 10) wurde am meisten gesucht?
--- QUERYDATA : A table that contains search queries as strings
--- video_games : A table that contains all games possible as strings
--- A sql query that loops through the video_games table and for each entry in video_games.name selects the count of QUERYDATA table where the search query contains the game name
--- The result is a table with two columns: game and count
--- The result is ordered by count in descending order
--- The result is limited to 10 rows
SELECT 
    video_games.name AS game,
    COUNT(*) AS count
FROM
    video_games,
    QUERYDATA
WHERE
    QUERYDATA.QUERY
    LIKE '%' || video_games.name || '%'
GROUP BY
    video_games.name
ORDER BY 
    count DESC
LIMIT 10

---------

--- Frage 5: Wie sah die Verteilung auf verschiedene Plattformen aus?
--- QUERYDATA : A table that contains search queries as strings
--- platforms : A table that contains the platforms as strings
--- A sql query that loops through the platform table and for each entry in column platform.name selects the count of the search_logs table where the search query contains the platform name
--- The result is a table with two columns: platform and count
--- The result is ordered by count in descending order
--- The result is limited to 10 rows
SELECT
    platform,
    COUNT(*) AS count
from
    platforms,
    QUERYDATA
WHERE
    QUERYDATA.QUERY
    LIKE '%' || platform.name || '%'
    and
    QUERYDATA.QUERY
    LIKE '%' || platform.hersteller || '%'
GROUP BY
    platform
ORDER BY
    count DESC
LIMIT 10