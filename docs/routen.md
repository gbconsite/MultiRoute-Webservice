# Routen & Endpunkte

## Webservice-Request



### Das Webservice-Request-Objekt

<https://webservice.tourenplaner.biz/startjob>



#### HTTP Methode:

    POST



#### Format / ContentType

    Content-Type: application/json



### Das JSON-POST-Object



#### "tour":

| Parameter                        | Beschreibung                                                                                                                                 | Werte                                                               |
|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| optimize                         | **Optional** Art der Optimierung                                                                                                             | time(default) or distance                                           |
| roundtrip                        | **Optional** Tourtype Rundstrecke oder nur Hinfahrt                                                                                          | true or false(default)                                              |
| tollfree                         | **Optional** Tourparameter Vermeidung von Gebühren                                                                                           | true or false(default)                                              |
| avoid\_highway                   | **Optional** Tourparameter Vermeidung von Autobahnen                                                                                         | true or false(default)                                              |
| avoid\_ferry                     | **Optional** Tourparameter Vermeidung von Fähren                                                                                             | true or false(default)                                              |
| uid                              | **Optional** CRM-uniqueID , mit welcher dieser Vorgang im CRM verwaltet wird.                                                                | String                                                              |
| start                            | **Optional** Startet automatisch die Routenoptimierung als Hintergrunddienst                                                                 | true or false(default)                                              |
| show\_only                       | **Optional** Es wird keine Optimierung der Route vorgenommen (Tour nur anzeigen). Funktioniert nur bei start: true                           | true or false(default)                                              |
| optimize\_endpoint               | **Optional** Der Endpunkt ist nicht fest, d.h. er wird auch in die Optimierung mit einbezogen. Funktioniert nur bei roundtrip: false         | true or false(default)                                              |
| time\_window                     | **Optional** Zeitplanung mit Zeitfenster                                                                                                     | true or false(default)                                              |
| time\_window\_caclculation\_time | **Optional** Maximale Zeit, die für die Berechnung der Zeitplanung mit Zeitfenster aufgewendet wird. Funktioniert nur bei time\_window: true | 1-600 (60) default                                                  |
| travel\_mode                     | **Optional** Profil                                                                                                                          | Driving(default) siehe extra Liste                                  |
| optimize                         | **Optional** Art der Optimierung                                                                                                             | time(default) or distance (Auswirkung nur bei travel\_mode=Driving) |
| avoid\_highway                   | **Optional** Tourparameter Vermeidung von Autobahnen                                                                                         | true or false(default)(Auswirkung nur bei travel\_mode=Driving)     |
| tollfree                         | **Optional** Tourparameter Vermeidung von Gebühren                                                                                           | true or false(default)(Auswirkung nur bei travel\_mode=Driving)     |

Gültige Profile

|          |                   |
|----------|-------------------|
| Driving  | PKW               |
| Walking  | zu Fuß            |
| Hgv\_28  | LKW (2,8 Tonnen)  |
| Hgv\_35  | LKW (3,5 Tonnen)  |
| Hgv\_75  | LKW (7,5 Tonnen)  |
| Hgv\_120 | LKW (12,0 Tonnen) |

    {
       "optimize": "time",
       "roundtrip": true,
       "tollfree": true,
       "avoid_highway": true,
       "uid": "A123",
       "start": true,
       "show_only" : true,
       "time_window" : false,
       "travel_mode" : "Hgv_75" 
    }



#### "waypoints":

Geliefert werden muss ein Array mit den einzelnen Wegpunkt Objekt

1.  Der erste Punkt im Array ist der Startpunkt
2.  Der letzt Punkt ist der Endpunkt wenn nur Hinweg berechnet werden
    soll

| Parameter  | Beschreibung                                                                                                                                           | Werte  |
|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|--------|
| uid        | **Optional** CRM-uniqueID , unter welchem der Wegpunkt gespeichert ist                                                                                 | String |
| address    | **Required** Adresse                                                                                                                                   | Object |
| coordinate | **Optional** Koordinaten des Wegpunktes, keine Geokodierung notwendig                                                                                  | Object |
| time       | **Optional** Zeitangabe zu dem Wegpunkt\*                                                                                                              | Object |
| name       | **Optional** Name der angezeigt werden soll                                                                                                            | String |
| links      | **Optional** Links die beim Click auf das Icon(Karte) angezeigt werden soll                                                                            | Object |
| color      | **Optional** Farbe (*blue* (default für Haupttour), *red* (default für corridor\_points), *black*, *green*, *grey*, *light\_blue*, *yellow*, *orange*) | String |

Es können beliebige key value(String) Paare angegeben werden, diese
werden einfach durch gereicht.



##### address

| Parameter | Beschreibung                   | Werte                              |
|-----------|--------------------------------|------------------------------------|
| locality  | **Required** Ort               | Bsp.: München                      |
| postcode  | **Required** Postleitzahl      | Bsp.: 80331                        |
| street    | **Required** Straße Hausnummer | Bsp.: Tal 1                        |
| country   | **Optional** Land              | Bsp.: DE ,Deutschland oder Germany |



##### coordinate

| Parameter | Beschreibung           | Werte      |
|-----------|------------------------|------------|
| lat       | **Required** Latitude  | Bsp.: 48.5 |
| lon       | **Required** Longitude | Bsp.: 11.5 |



##### time

| Parameter          | Beschreibung                            | Werte                           |
|--------------------|-----------------------------------------|---------------------------------|
| duration\_of\_stay | **Required** Aufenthaltszeit in Minuten | Bsp.: 60                        |
| arrival            | **Required** Ankunftszeit               | Bsp.: 2013-20-19T15:22:46+01:00 |
| departure          | **Required** Abhartszeit                | Bsp.: 2013-20-19T15:22:46+01:00 |



##### time mit Zeitfenster

| Parameter          | Beschreibung                                                          | Werte                           |
|--------------------|-----------------------------------------------------------------------|---------------------------------|
| duration\_of\_stay | Aufenthaltszeit in Minuten                                            | Bsp.: 60                        |
| timeframe\_start   | Zeitfensterankunft                                                    | Bsp.: 2013-02-19T15:00:00+01:00 |
| timeframe\_end     | Zeitfensterabfahrt (**Der erste Punkt muss eine Abfahrtszeit haben**) | Bsp.: 2013-02-19T16:00:00+01:00 |
| timeframe\_isfixed | Zeitfenster muss eingehalten werden                                   | true oder false                 |



##### Achtung

1.  Zeitangaben in ISO 8601 Format
2.  duration\_of\_stay wird nicht für den ersten Punkt ausgewertet.
3.  arrival, departure es wir nur <u>ein</u> fixer Termin verwendet.
    1.  Es wird beim ersten Datensatz wo es eine arrival oder departure
        Angabe findet als Fixtermin festgelegt.
    2.  Wenn arrival und departure angegeben sind, dann wird arrival als
        Fixtermin festgelegt.



##### links

| Parameter | Beschreibung                                                                        | Werte                                                                                                                                   |
|-----------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| name      | **Required** Text der angezeigt wird                                                | Bsp.: Termin                                                                                                                            |
| url       | **Required** (wenn keine **function** oder **window** angegeben ist) Url            | Bsp.: "url" : "http://heise.de"                                                                                                         |
| function  | **Required** (wenn keine **url** oder **window** angegeben ist) Javascript function | Bsp.: "function" : "alert('Hallo')"                                                                                                     |
| window    | **Required** (wenn keine **url** oder **function** angegeben ist) Open new window   | Bsp.: "window" : \["http://heise.de", "test", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes" |



##### Beispiel Waypoints ohne Zeitfenster

    [
         {
            "uid":"1",
            "coordinate" : {"lat":"48.163415","lon":"11.577531"},
            "address": {"locality": "München", "postcode": "80803", "street": "Pündterplatz 8"},
        "links" : [{"name": "Neu Webseite", "url" : "http://heise.de"}, 
            {"name": "Ajax Aufruf mit Type script", "url" : "/test_alert.js", "remote" : true}, 
            {"name": "Javascript", "function" : "alert(\"Hallo\")"},
            {"name": "Url im neuen Fenster mit Angaben", "window" : ["http://heise.de", "test", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes"]}
            ]
         },
         {
            "uid":"2",
            "coordinate" : {"lat":"49.454345","lon":"11.073495"},
            "address": {"locality": "Nürnberg", "postcode": "90403", "street": "Weintraubengasse 1"},
            "time": {"duration_of_stay" : 60, "arrival": "2013-02-19T15:00:00+01:00"}
         },
         {
            "uid":"3",
            "coordinate" : {"lat":"48.136415","lon":"11.577531"},
            "address": {"locality": "München", "postcode": "80331", "street": "Tal 1"}
         }
    ]



##### Beispiel Waypoints mit Zeitfenster

    [
         {
            "uid":"1",
            "coordinate" : {"lat":"48.163415","lon":"11.577531"},
            "address": {"locality": "München", "postcode": "80803", "street": "Pündterplatz 8"},
            "time": {"timeframe_end": "2013-02-19T15:00:00+01:00"}
         },
         {
            "uid":"2",
            "coordinate" : {"lat":"49.454345","lon":"11.073495"},
            "address": {"locality": "Nürnberg", "postcode": "90403", "street": "Weintraubengasse 1"},
            "time": {"duration_of_stay" : 60, "timeframe_start": "2013-02-19T15:00:00+01:00", "timeframe_end": "2013-02-19T18:00:00+01:00"}
         },
         {
            "uid":"3",
            "coordinate" : {"lat":"48.136415","lon":"11.577531"},
            "address": {"locality": "München", "postcode": "80331", "street": "Tal 1"}
         }
    ]



### Webservice-Response-Objekt



#### Format / ContentType

    Content-Type: application/json



#### Das JSON-Object

|                          |                                  |          |
|--------------------------|----------------------------------|----------|
| Parameter                | Beschreibung                     | Werte    |
| return\_code             | Status Code                      | Integer  |
| error\_description       | Fehlerbeschreibung               | String   |
| tid                      | Transaktions-ID wenn erfolgreich | String   |
| credit\_expiration\_date | Gültigkeit des Guthabens         | DateTime |



##### Beispiel

     {
        "return_code": 0,
        "error_description": "",
        "tid": "bGVJKz6wFb-xi1zKmWKpKw",
        "credit_expiration_date": "2014-02-26T14:00:02+01:00" 
      }

| return\_code | error\_description                   |
|--------------|--------------------------------------|
| 0            | wie in UNIX: alles ok                |
| 2            | Autorisierung: Abo abgelaufen        |
| 3            | Inputdaten falsch oder unvollständig |
| 5            | Tour konnte nicht gespeichert werden |
| …            | …                                    |



### Beispielaufruf mit curl
```shell
    curl -u test:test -XPOST -H "Content-Type: application/json" "localhost:3000/startjob" -d '
    {
      "tour": {
        "roundtrip": true,
        "tollfree": false,
        "optimize": "time",
        "avoid_highway": false,
        "uid": "123",
        "start": true
      },
      "waypoints": [
         {
            "uid":"34",
            "coordinate" : {"lat":"48.163415","lon":"11.577531"},
            "address": {"locality": "München", "postcode": "80803", "street": "Pündterplatz 8"}
         },
         {
            "uid":"26",
            "coordinate" : {"lat":"49.454345","lon":"11.073495"},
            "address": {"locality": "Nürnberg", "postcode": "90403", "street": "Weintraubengasse 1"},
            "time": {"duration_of_stay" : 60, "arrival": "2013-02-19T15:22:46+01:00"}
         },
         {
            "uid":"56",
            "coordinate" : {"lat":"48.136415","lon":"11.577531"},
            "address": {"locality": "München", "postcode": "80331", "street": "Tal 1"}
         }
    ]
    }'
```


## Webservice-Result



### Der Webservice-Result-Aufruf

<https://webservice.tourenplaner.biz/getresult?tid=%3Ctransaktions-ID>  
oder  
<https://webservice.tourenplaner.biz/getresult.json?tid=%3Ctransaktions-ID>

Optionaler Parameter:  
<https://webservice.tourenplaner.biz/getresult.json?tid=%3Ctransaktions-ID%3E&geocode_result=true>



### Das JSON-Object



#### "tour":

|                     |                                                                  |                           |
|---------------------|------------------------------------------------------------------|---------------------------|
| Parameter           | Beschreibung                                                     | Werte                     |
| optimize            | Art der Optimierung                                              | time(default) or distance |
| roundtrip           | Tourtype Rundstrecke oder nur Hinfahrt                           | true or false(default)    |
| tollfree            | Tourparameter Vermeidung von Gebühren                            | true or false(default)    |
| avoid\_highway      | Tourparameter Vermeidung von Autobahnen                          | true or false(default)    |
| uid                 | CRM-uniqueID , mit welcher dieser Vorgang im CRM verwaltet wird. | String                    |
| status              | Zustand in dem sich die Tourenoptimierung befindet.              | String                    |
| distance            | Fahrstrecke in Meter                                             | Integer                   |
| travel\_time        | Gesamtzeit in Sekunden (Fahrzeit + Aufenthaltsdauer)             | Integer                   |
| driving\_time       | Fahrzeit in Sekunden                                             | Integer                   |
| waiting\_time       | Wartezeit in Sekunden                                            | Integer                   |
| time\_window\_error | JSON Fehlerobjekt                                                | null (default)            |



##### Beispiel

    {
       "optimize": "time|distance",
       "roundtrip": true,
       "tollfree": true,
       "avoid_highway": true
       "uid": "A123",
       "distance": 0,
       "travel_time": 0,
       "driving_time": 0,
       "waiting_time": 0,
       "time_window_error": null
    }



##### Parameter status

| status                  | Bedeutung                                       | Berechnung fertig |
|-------------------------|-------------------------------------------------|-------------------|
| start                   | Daten wurden übergeben                          | x                 |
| geocoded                | Alle Daten wurden Geokodiert                    | x                 |
| optimized               | Tour wurde optimiert                            | x                 |
| scheduled               | Zeitplanung wurde durchgeführt                  | ✔                 |
| scheduled\_time\_window | Zeitplanung mit Zeitfenstern wurde durchgeführt | ✔                 |



##### Parameter time\_window\_error

JSON Objekt mit Fehlerstruktur zur Fehlermeldung (Zeitplanung mit
Zeitfenster).



##### Zeitplanung mit Zeitfenster Fehler 1

Ein Punkt konnte nicht vom Startpunkt erreicht werden (innerhalb des
Zeitfensters).

    "time_window_error": {
    "type": 1,
    "nr": 2,
    "name": "Punkt 3",
    "start_depo": "2:00 Uhr",
    "fahrzeit": "0h:10m",
    "ankunft_kunde": "2:10 Uhr",
    "timeframe_start": "1:30 Uhr",
    "timeframe_end": "1:45 Uhr" 
    }

| Parameter time\_window\_error | Bedeutung                                                                                             |
|-------------------------------|-------------------------------------------------------------------------------------------------------|
| type                          | Fehlertyp 1: Ein Punkt in der Tour kann nicht vom Depot in der vorgeschriebenen Zeit erreicht werden. |
| nr                            | Akteuelle Position in den waypoints (Array beginnt mit 1)                                             |
| name                          | CRM-uniqueID , unter welchem der Wegpunkt gespeichert ist                                             |
| start\_depo                   | Abfahrtszeit beim Depot                                                                               |
| fahrzeit                      | Fahrzeit                                                                                              |
| ankunft\_kunde                | Ankunftszeit beim Kunden                                                                              |
| timeframe\_start              | Zeitfenster für die Ankunft Anfang                                                                    |
| timeframe\_end                | Zeitfenster für die Ankunft Ende                                                                      |



##### Zeitplanung mit Zeitfenster Fehler 2

Zwischen 2 Punkten reicht die Zeit nicht, sie innerhalb einer Tour
anzufahren.

    "time_window_error": {
    "type": 2,
    "nr1": 2,
    "nr2": 3,
    "name1": "Name Punkt1",
    "name2": "Name Punkt2",
    "timeframe_start1": "3:30 Uhr",
    "timeframe_end1": "3:45 Uhr",
    "timeframe_start2": "3:30 Uhr",
    "timeframe_end2": "3:45 Uhr",
    "start_kunde1": "4:30 Uhr",
    "stop_kunde2": "6:12 Uhr",
    "start_kunde2": "4:30 Uhr",
    "stop_kunde1": "6:10 Uhr",
    "fahrzeit12": "1h:42m",
    "fahrzeit21": "1h:40m",
    "aufenthalt_kunde1": "1h:00m",
    "aufenthalt_kunde2": "1h:00m" 
    }

| Parameter time\_window\_error | Bedeutung                                                                                     |
|-------------------------------|-----------------------------------------------------------------------------------------------|
| type                          | Fehlertyp 2: Zwischen 2 Kunden gibt es keine Möglichkeit sie innerhalb einer Tour anzufahren. |
| nr1                           | Aktuelle Position Kunde 1 in den waypoints (Array beginnt mit 1)                              |
| nr2                           | Aktuelle Position Kunde 2 in den waypoints (Array beginnt mit 1)                              |
| name1                         | CRM-uniqueID , unter welchem der Wegpunkt gespeichert ist                                     |
| name2                         | CRM-uniqueID , unter welchem der Wegpunkt gespeichert ist                                     |
| timeframe\_start1             | Zeitfenster für die Ankunft Anfang (Kunde 1)                                                  |
| timeframe\_end1               | Zeitfenster für die Ankunft Ende (Kunde 1)                                                    |
| timeframe\_start2             | Zeitfenster für die Ankunft Anfang (Kunde 2)                                                  |
| timeframe\_end2               | Zeitfenster für die Ankunft Ende (Kunde 2)                                                    |
| start\_kunde1                 | Abfahrtszeit bei Kunde 1 (timeframe\_start1 + aufenthalt\_kunde1)                             |
| stop\_kunde2                  | Ankunftszeit bei Kunde 2 (start\_kunde1 + fahrzeit12)                                         |
| start\_kunde2                 | Abfahrtszeit beim Depot (timeframe\_start2 + aufenthalt\_kunde2)                              |
| stop\_kunde1                  | Abfahrtszeit beim Depot (start\_kunde2 + fahrzeit21)                                          |
| fahrzeit12                    | Fahrzeit von Kunde 1 zu Kunde 2                                                               |
| fahrzeit21                    | Fahrzeit von Kunde 2 zu Kunde 1                                                               |
| aufenthalt\_kunde1            | Aufenthalsdauer bei Kunde 1                                                                   |
| aufenthalt\_kunde2            | Aufenthalsdauer bei Kunde 2                                                                   |



#### "waypoints":

Geliefert werden muss ein Array mit den einzelnen Wegpunkt Objekt

1.  Der erste Punkt im Array ist der Startpunkt
2.  Der letzt Punkt ist der Endpunkt wenn nur Hinweg berechnet wurde

|                      |                                                                           |                                      |
|----------------------|---------------------------------------------------------------------------|--------------------------------------|
| Parameter            | Beschreibung                                                              | Werte                                |
| uid                  | CRM-uniqueID , unter welchem der Wegpunkt gespeichert ist                 | String                               |
| address              | Adresse                                                                   | Object                               |
| geocode\_address     | Geokodierte Adresse                                                       | Object nur wenn geocode\_result=true |
| coordinate           | Koordinaten des Wegpunktes                                                | Object                               |
| building\_coordinate | Koordinaten des Gebäudes (Nur wenn Geokodiert wurde. Kann auch leer sein) | Object                               |
| time                 | Zeitangabe zu dem Wegpunkt\*                                              | Object                               |
| distance             | Entfernung zum vorherigen Punkt                                           | Integer                              |
| driving\_time        | Faherzeit zum vorherigen Punkt                                            | Integer                              |



##### Achtung:

Wenn der Parameter roundtrip: true (Rundreise) ist, dann beziehen sich
die Parameter distance und driving\_time auf die Zeit und Strecke, die
vom letzten Punkt (letzter Punkt vor dem Ziel) zum Ersten (Start/Ziel)
benötigt wird.



##### Parameter address (wird nicht verändert)

|           |                   |                                                                 |
|-----------|-------------------|-----------------------------------------------------------------|
| Parameter | Beschreibung      | Werte                                                           |
| locality  | Ort               | Bsp.: München                                                   |
| postcode  | Postleitzahl      | Bsp.: 80331                                                     |
| street    | Straße Hausnummer | Bsp.: Tal 1                                                     |
| country   | Land              | Bsp,: DE (wird nur ausgegeben wenn ursprünglich mit angegeben.) |



##### Parameter geocode\_address Gefundene Adresse

|           |                    |                                                       |
|-----------|--------------------|-------------------------------------------------------|
| Parameter | Beschreibung       | Werte                                                 |
| locality  | Ort                | Bsp.: München (null wenn Koordinaten vorhanden waren) |
| postcode  | Postleitzahl       | Bsp.: 80331 (null wenn Koordinaten vorhanden waren)   |
| street    | Straße Hausnummer  | Bsp.: Tal 1 (null wenn Koordinaten vorhanden waren)   |
| quality   | Geokodier-Qualität | Bsp.: 0 (null wenn Koordinaten vorhanden waren)       |

Geokodier-Qualität:  
gleich 0: Eingabe passt zur Ausgabe  
größer 0: Es gibt mindestens einen Unterschied

Unterschiede bei der Postleitzahl werden mit einem Faktor von 10
multipliziert.  
Wenn der angegebene Ort vollständig im gefundenen Ort vorhanden ist,
dann wird das auch als 0 bewertet.  
Eingabe: Neustadt = Neustadt an der Donau

*Es wird empfohlen, die gefundene Adresse ("geocode\_address") ab einer
quality von 4 bis 5 am Frontend auszugeben, um eine manuelle Prüfung zu
ermöglichen ("meinten Sie...?").  
Dieser Grenzwert hängt allerdings stark von der Güte der übergebenen
Adressen ("address") ab.*



##### Parameter coordinate

|           |              |            |
|-----------|--------------|------------|
| Parameter | Beschreibung | Werte      |
| lat       | Latitude     | Bsp.: 48.5 |
| lon       | Longitude    | Bsp.: 11.5 |



##### Parameter building\_coordinate

|           |              |            |
|-----------|--------------|------------|
| Parameter | Beschreibung | Werte      |
| lat       | Latitude     | Bsp.: 48.5 |
| lon       | Longitude    | Bsp.: 11.5 |



##### Parameter time

|                    |                            |                                 |
|--------------------|----------------------------|---------------------------------|
| Parameter          | Beschreibung               | Werte                           |
| duration\_of\_stay | Aufenthaltszeit in Minuten | Bsp.: 60                        |
| arrival            | Ankunftszeit               | Bsp.: 2013-02-19T15:22:46+01:00 |
| departure          | Abfahrtszeit               | Bsp.: 2013-02-19T15:22:46+01:00 |
| timeframe\_start   | Zeitfensterankunft         | Bsp.: 2013-02-19T15:22:46+01:00 |
| timeframe\_end     | Zeitfensterankunftabfahrt  | Bsp.: 2013-02-19T15:22:46+01:00 |
| waiting\_time      | Wartezeit in Sekunden      | Integer                         |



##### Achtung

1.  Zeitangaben in ISO 8601 Format
2.  timeframe\_start,timeframe\_end, waiting\_time werden nur
    ausgegeben, wenn auch Zeitfenster angegeben worden sind.



##### Beispiel

    curl -u test:test -H "Content-Type: application/json" localhost:3000/getresult?tid=

      {
        "tour": {
          "roundtrip": true,
          "tollfree": false,
          "optimize": "time",
          "avoid_highway": false,
          "uid": "123",
          "status": "scheduled" 
        },
        "waypoints": [
          {
            "uid": "34",
            "address": {
              "locality": "München",
              "postcode": "80803",
              "street": "Pündterplatz 8" 
            },
            "coordinate": {
              "lat": 48.163415,
              "lon": 11.577531
            },
            "times": {
              "arrival": "2013-02-19T19:33:13+01:00",
              "departure": "2013-02-19T15:11:24+01:00" 
            }
          },
          {
            "uid": "56",
            "address": {
              "locality": "München",
              "postcode": "80331",
              "street": "Tal 1" 
            },
            "coordinate": {
              "lat": 48.136415,
              "lon": 11.577531
            },
            "times": {
              "arrival": "2013-02-19T15:22:46+01:00",
              "departure": "2013-02-19T15:22:46+01:00",
              "duration_of_stay": null,
              "timeframe_start": "2013-02-19T15:21:46+01:00",
              "timeframe_end": "2013-02-19T15:23:46+01:00",
              "waiting_time":0
            }
          },
          {
            "uid": "26",
            "address": {
              "locality": "Nürnberg",
              "postcode": "90403",
              "street": "Weintraubengasse 1" 
            },
            "coordinate": {
              "lat": 49.454345,
              "lon": 11.073495
            },
            "times": {
              "arrival": "2013-02-19T17:01:35+01:00",
              "departure": "2013-02-19T18:01:35+01:00",
              "duration_of_stay": 60,
              "timeframe_start": null,
              "timeframe_end": null,
              "waiting_time":0
            }
          }
        ]
      }



## Webservice-Status



### Der Webservice-Status-Aufruf

<https://webservice.tourenplaner.biz/getstatus?tid=%3Ctransaktions-ID>
(Achtung Header "Content-Type: application/json" mus mit übergeben
werden)  
oder  
<https://webservice.tourenplaner.biz/getstatus.json?tid=%3Ctransaktions-ID>



### Das JSON-Object

|                     |                                                     |               |
|---------------------|-----------------------------------------------------|---------------|
| Parameter           | Beschreibung                                        | Werte         |
| status              | Zustand in dem sich die Tourenoptimierung befindet. | String        |
| error\_text         | Fehlermeldung                                       | null(default) |
| time\_window\_error | Zeitfenster JSON Fehlerobjekt                       | null(default) |



#### Parameter status

| status                  | Bedeutung                                       | Berechnung fertig |
|-------------------------|-------------------------------------------------|-------------------|
| start                   | Daten wurden übergeben                          | x                 |
| geocoded                | Alle Daten wurden Geokodiert                    | x                 |
| matrix                  | Fahrzeitmatrix wurde ermittelt                  | x                 |
| optimized               | Tour wurde optimiert                            | x                 |
| scheduled               | Zeitplanung wurde durchgeführt                  | ✔                 |
| scheduled\_time\_window | Zeitplanung mit Zeitfenstern wurde durchgeführt | ✔                 |
| error                   | Fehler ist während der Verarbeitung aufgetreten | x                 |



#### Parameter error\_text

| error\_text                     | Bedeutung                                                                                       | Lösung                                                                           |
|---------------------------------|-------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| Error geocoding: uid=xxx        | Adresse mit der uid xxx konnte nicht geokodiert werden                                          | Adresse herausnehmen.                                                            |
| Error matrix: uid=xxx           | Adresse mit der uid xxx konnte nicht angefahren werden.                                         | Adresse herausnehmen.                                                            |
| Optimisation not possible       | Optimierung nicht möglich                                                                       | Zeitfenster anpassen                                                             |
| Optimisation timeout            | Optimierung mit Zeitfenster timeout                                                             | Tour Optimierung nochmals starten mit Parameter time\_window\_caclculation\_time |
| timeout                         | Fahrzeitmatrixermittelung hat zu lange gebraucht                                                | Tour Optimierung nochmals starten                                                |
| Unable to access network        | Es gab Probleme mit der Applikation beim Aufruf der Geokodierung bzw. Fahrzeitmatrixermittelung | gbconsite Benachrichtigen                                                        |
| HGV outside supported countries | LKW Routing nicht möglich                                                                       | Tour Optimierung mit Driving                                                     |
| Internal Server Error           | Es gab Probleme mit der Applikation beim Aufruf der Geokodierung bzw. Fahrzeitmatrixermittelung | gbconsite Benachrichtigen                                                        |



#### Parameter time\_window\_error

JSON Objekt mit Fehlerstruktur zur Fehlermeldung (Zeitplanung mit
Zeitfenstern).



##### Zeitplanung mit Zeitfenster Fehler 1:

Ein Punkt konnte nicht vom Startpunkt aus erreicht werden (innerhalb des
Zeitfensters).

    "time_window_error": {
        "type": 1,
        "nr": 2,
        "name": "Punkt 3",
        "start_depo": "2:00 Uhr",
        "fahrzeit": "0h:10m",
        "ankunft_kunde": "2:10 Uhr",
        "timeframe_start": "1:30 Uhr",
        "timeframe_end": "1:45 Uhr" 
    }

| key              | Bedeutung                                                                                             |
|------------------|-------------------------------------------------------------------------------------------------------|
| type             | Fehlertyp 1: Ein Punkt in der Tour kann nicht vom Depot in der vorgeschriebenen Zeit erreicht werden. |
| nr               | Akteuelle Position in den waypoints (Array beginnt mit 1)                                             |
| name             | CRM-uniqueID , unter welchem der Wegpunkt gespeichert ist                                             |
| start\_depo      | Abfahrtszeit beim Depot                                                                               |
| fahrzeit         | Fahrzeit                                                                                              |
| ankunft\_kunde   | Ankunftszeit beim Kunden                                                                              |
| timeframe\_start | Zeitfenster für die Ankunft Anfang                                                                    |
| timeframe\_end   | Zeitfenster für die Ankunft Ende                                                                      |



##### Zeitplanung mit Zeitfenster Fehler 2:

Zwischen 2 Punkten reicht die Zeit nicht, sie innerhalb einer Tour
anzufahren

    "time_window_error": {
      "type": 2,
      "nr1": 2,
      "nr2": 3,
      "name1": "Name Punkt1",
      "name2": "Name Punkt2",
      "timeframe_start1": "3:30 Uhr",
      "timeframe_end1": "3:45 Uhr",
      "timeframe_start2": "3:30 Uhr",
      "timeframe_end2": "3:45 Uhr",
      "start_kunde1": "4:30 Uhr",
      "stop_kunde2": "6:12 Uhr",
      "start_kunde2": "4:30 Uhr",
      "stop_kunde1": "6:10 Uhr",
      "fahrzeit12": "1h:42m",
      "fahrzeit21": "1h:40m",
      "aufenthalt_kunde1": "1h:00m",
      "aufenthalt_kunde2": "1h:00m" 
    }

| key                | Bedeutung                                                                                     |
|--------------------|-----------------------------------------------------------------------------------------------|
| type               | Fehlertyp 2: Zwischen 2 Kunden gibt es keine Möglichkeit sie innerhalb einer Tour anzufahren. |
| nr1                | Aktuelle Position Kunde 1 in den waypoints (Array beginnt mit 1)                              |
| nr2                | Aktuelle Position Kunde 2 in den waypoints (Array beginnt mit 1)                              |
| name1              | CRM-uniqueID , unter welchem der Wegpunkt gespeichert ist                                     |
| name2              | CRM-uniqueID , unter welchem der Wegpunkt gespeichert ist                                     |
| timeframe\_start1  | Zeitfenster für die Ankunft Anfang (Kunde 1)                                                  |
| timeframe\_end1    | Zeitfenster für die Ankunft Ende (Kunde 1)                                                    |
| timeframe\_start2  | Zeitfenster für die Ankunft Anfang (Kunde 2)                                                  |
| timeframe\_end2    | Zeitfenster für die Ankunft Ende (Kunde 2)                                                    |
| start\_kunde1      | Abfahrtszeit bei Kunde 1 (timeframe\_start1 + aufenthalt\_kunde1)                             |
| stop\_kunde2       | Ankunftszeit bei Kunde 2 (start\_kunde1 + fahrzeit12)                                         |
| start\_kunde2      | Abfahrtszeit beim Depot (timeframe\_start2 + aufenthalt\_kunde2)                              |
| stop\_kunde1       | Abfahrtszeit beim Depot (start\_kunde2 + fahrzeit21)                                          |
| fahrzeit12         | Fahrzeit von Kunde 1 zu Kunde 2                                                               |
| fahrzeit21         | Fahrzeit von Kunde 2 zu Kunde 1                                                               |
| aufenthalt\_kunde1 | Aufenthalsdauer bei Kunde 1                                                                   |
| aufenthalt\_kunde2 | Aufenthalsdauer bei Kunde 2                                                                   |



## Webservice-StaticMap

Statische Karte kann mit Route /get\_static\_map?tid=xxx angefordert
werden.



### Ausgabe-Steuerung

durch JSON-Objekt im POST-Request. Beispiel-JSON:

    {
      "static_map": {
        "file_name": "mein_image.jpg",
        "disposition": "attachment",
        "mapsize_width": 800,
        "mapsize_height": 800
      }
    }



#### zulässige Werte / Beschränkung:

mapsize\_width 80 - 900 (Pixel)  
mapsize\_height 80 - 834 (Pixel)  
disposition "attachement" oder "inline" ("Download/Speichern"-Header
oder normaler Header zum Gebrauch auf Website)



#### Default-Werte:

file\_name "staticmap.jpg"  
disposition "attachement"  
mapsize\_width 400  
mapsize\_height 400



### Fehlerfall

Im Fehlerfall wird ein JSON-Objekt der Form  
` {code: xx, description: 'yy'}`  
ausgeliefert.

| code | description                                                             |
|------|-------------------------------------------------------------------------|
| 11   | Mehr als 100 Wegepunkte. Statische Karte kann nicht erstellt werden.    |
| 12   | Keine Wegepunkte gefunden. Statische Karte kann nicht erstellt werden.  |
| 13   | Schwerwiegender Fehler bei Kartenrequest.                               |
| 14   | Parameter mapsize\_width muss zwischen 80 und 900 liegen (übergeben ... |



### Erfolgsfall

Konnte die Karte erstellt werden, wird sie mit HTTP-Statuscode 200 und
Header "image/jpg" sowie weiteren Headern - abhängig von Parameter
"disposition" - als JPEG-Image ausgeliefert. In diesem Fall ist keine
JSON-Ausgabe möglich.

Zwischen 1 und 25 Wegepunkten werden Standardmarker und Route angezeigt,
über 25 Punkten werden lediglich durchnummerierte Marker angezeigt.



### vor Verwendung

Es ist vor Verwendung zu prüfen, ob der MIME-Type "image/jpg" ist. Wenn
nicht, enthält die Rückgabe kein Image, sondern das Fehler-JSON.



### Beispielaufruf mit Curl

tid=xxx ersetzen durch gültige tid. Die Ausgabe von curl wird in eine
Datei umgeleitet, ansonsten sieht man im Erfolgsfall nur "binary"-Code
auf dem Screen.

    curl -u test:test -XPOST -H "Content-Type: application/json" "localhost:3000/get_static_map?tid=xxx" -d '
    {
      "static_map": {
        "file_name": "mein_image.jpg",
        "disposition": "attachment",
        "mapsize_width": 800,
        "mapsize_height": 800
      }
    }
    ' > mein_image.jpg



#### Beispiel-Ergebnis

![](https://www.multiroute.de/static-map.jpg)



## Webservice-Optimierung



### Der Webservice-Optimierung-Aufruf

Wenn man die aktuelle Tour im Modus 'nur anzeigen' gestartet hat, kann
man mit diesem Aufruf  
die Optimierung starten

<https://webservice.tourenplaner.biz/optimize?tid=%3Ctransaktions-ID>  
oder  
<https://webservice.tourenplaner.biz/optimize.json?tid=%3Ctransaktions-ID>



### GET Parameter

Zusätzlich kann man noch für die Zeitplanung mit Zeitfenster diese
beiden Parameter angeben (als GET Parameter):

| Parameter                        | Beschreibung                                                                                                                                 | Werte                  |
|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|------------------------|
| time\_window                     | **Optional** Zeitplanung mit Zeitfenster                                                                                                     | true or false(default) |
| time\_window\_caclculation\_time | **Optional** Maximale Zeit, die für die Berechnung der Zeitplanung mit Zeitfenster aufgewendet wird. Funktioniert nur bei time\_window: true | 1-600 (60) default     |



#### Beispiel

    curl -u test:test -H "Content-Type: application/json" "localhost:3000/optimize?tid=123456" 
    curl -u test:test -H "Content-Type: application/json" "localhost:3000/optimize?tid=123456&time_window=true&time_window_caclculation_time=120" 



## Postleitzahlen entlang der Tour

Um zusätzlich mögliche Kundenbesuche entlang einer Tour identifizieren
zu können, besteht die Möglichkeit, nach den von der Tour tangierten
PLZ-Gebieten zu suchen.  
Mit den Ergebnissen kann z.B. im CRM, ERP, usw. nach weiteren Kunden
gesucht werden („welche Kunden sind in den PLZ, die von der Tour
berührt/geschnitten werden?“), die anschließend in die Tour integriert
werden könnten.



### Webservice-Aufruf



#### Ohne Puffer:

<https://webservice.tourenplaner.biz/get_postcodes_along_tour?tid=%3Ctransaktions-ID>  
oder  
<https://webservice.tourenplaner.biz/get_postcodes_along_tour.json?tid=%3Ctransaktions-ID>

Dieser Aufruf liefert die Postleitzahlen aller PLZ-Gebiete zurück, die
von der Tour-Linie be-rührt/geschnitten werden (im Bild unten gelb
dargestellt).

![](https://www.multiroute.de/plz.jpg)



#### Optional zusätzlich mit Puffer:

<https://webservice.tourenplaner.biz/get_postcodes_along_tour?tid=%3Ctransaktions-ID%3E&buffer=%3CMeter>  
oder  
<https://webservice.tourenplaner.biz/get_postcodes_along_tour.json?tid=%3Ctransaktions-ID%3E&buffer=%3CMeter>

Dieser Aufruf liefert die Postleitzahlen aller PLZ-Gebiete zurück, die
von der der gepuffertenTour-Linie (=Polygon) berührt/geschnitten werden
(im Bild unten gelb dargestellt).

![](https://www.multiroute.de/plz-buffer.jpg)

Der Puffer wird in der Projektion "Lambert Azimuthal Equal Area"
angewandt (PLZ für Europa).



#### Ergebnis

    {
      "postcodes": ["80796","80797","80801","80802","80803","80805"]
    }



#### Erweiterung

    {
      "data": [
      {
      "country": "DE",
      "postcodes": ["80796","80797","80801","80802","80803","80805"]
      },
      {
      "country": "AT",
      "postcodes": ["1000", "1001"]
      }
      ]
    }

    h3. Voraussetzung

    Für diese Funktion ist für Abfragen außerhalb Deutschlands der Erwerb von Lizenzen für PLZ Geometriedaten erforderlich (deutsche PLZ sind kostenlos enthalten).



## Webservice-AdditionalPoints

Es können jederzeit zu einer Tour zusätzliche Punkte hinzugefügt werden.



### "waypoints":

Geliefert werden muss ein Array mit dem einzelnen Objekt

| Parameter  | Beschreibung                                                           | Werte  |
|------------|------------------------------------------------------------------------|--------|
| uid        | **Optional** CRM-uniqueID , unter welchem der Wegpunkt gespeichert ist | String |
| address    | **Required** Adresse                                                   | Object |
| coordinate | **Optional** Koordinaten des Wegpunktes, keine Geokodierung notwendig  | Object |
| time       | **Optional** Zeitangabe zu dem Wegpunkt\*                              | Object |
| name       | **Optional** Name der angezeigt werden soll                            | String |

Es können beliebige key value(String) Paare angegeben werden, diese
werden einfach durchgereicht.



##### address

| Parameter | Beschreibung                   | Werte         |
|-----------|--------------------------------|---------------|
| locality  | **Required** Ort               | Bsp.: München |
| postcode  | **Required** Postleitzahl      | Bsp.: 80331   |
| street    | **Required** Straße Hausnummer | Bsp.: Tal 1   |



##### coordinate

| Parameter | Beschreibung           | Werte      |
|-----------|------------------------|------------|
| lat       | **Required** Latitude  | Bsp.: 48.5 |
| lon       | **Required** Longitude | Bsp.: 11.5 |



##### time

| Parameter          | Beschreibung                            | Werte                           |
|--------------------|-----------------------------------------|---------------------------------|
| duration\_of\_stay | **Required** Aufenthaltszeit in Minuten | Bsp.: 60                        |
| arrival            | **Required** Ankunftszeit               | Bsp.: 2013-20-19T15:22:46+01:00 |
| departure          | **Required** Abhartszeit                | Bsp.: 2013-20-19T15:22:46+01:00 |



##### Achtung

1.  Zeitangaben in ISO 8601 Format
2.  duration\_of\_stay wird nicht für den Ersten Punkt ausgewertet.
3.  arrival, departure es wir nur ein fixer Termin verwendet.
    1.  Es wird beim ersten Datensatz wo es eine arrival oder departure
        Angabe findet als Fixtermin festgelegt.
    2.  Wenn arrival und departure angegeben sind, dann wird arrival als
        Fixtermin festgelegt.



### Beispiel

    [
         {
            "uid":"1",
            "coordinate" : {"lat":"48.163415","lon":"11.577531"},
            "address": {"locality": "München", "postcode": "80803", "street": "Pündterplatz 8"}
         },
         {
            "uid":"2",
            "coordinate" : {"lat":"49.454345","lon":"11.073495"},
            "address": {"locality": "Nürnberg", "postcode": "90403", "street": "Weintraubengasse 1"}
            "time": {"duration_of_stay" : 60}
         },
         {
            "uid":"3",
            "coordinate" : {"lat":"48.136415","lon":"11.577531"},
            "address": {"locality": "München", "postcode": "80331", "street": "Tal 1"}
         }
    ]



### Curl Beispiel

    curl -u test:test -XPOST -H "Content-Type: application/json" "https://webservice.tourenplaner.biz/add_corridor_points?tid=AG-nhaaIPX6DkVwQCOMd1w" -d '
    {
      "waypoints": [
         {
            "uid":"20",
            "name" : "Test1",
            "address": {"locality": "Oberschleißheim", "postcode": "", "street": ""}
         },
         {
            "uid":"21",
            "name" : "Test2",
            "address": {"locality": "Moosinning", "postcode": "85452", "street": "Am Bleibach 4a"}
         },
         {
            "uid":"22",
            "name" : "Test3",
            "address": {"locality": "Ahrensburg", "postcode": "22926", "street": "Beimoorkamp 6"}
         },
         {
            "uid":"23",
            "name" : "Test4",
            "address": {"locality": "Saarbrücken", "postcode": "66125", "street": "Beim Weisenstein 13"}
         }
    ]
    }'



## Webservice Download



### Der Webservice-Download-Aufruf

<https://webservice.tourenplaner.biz/download?tid=%3Ctransaktions-ID%3E&building_coordinates=true&format=%3Cformat>

|                       |          |                                                                                                |
|-----------------------|----------|------------------------------------------------------------------------------------------------|
| Parameter             |          | Kommentar                                                                                      |
| tid                   | required | Tour token                                                                                     |
| building\_coordinates | optional | Statt den Straßenkoordinaten werden die Gebäudekoordinaten angezeigt true oder false (default) |



### Formate

|                                |                                            |
|--------------------------------|--------------------------------------------|
| **format**                     | **Name**                                   |
| alanwaypointsandroutesformat   | Alan Map 500 Waypoints and Routes (\*.wpr) |
| columbusv900professionalformat | Columbus V900 Professional (\*.csv)        |
| columbusv900standardformat     | Columbus V900 Standard (\*.csv)            |
| compegpsdatarouteformat        | CompeGPS Data Route (\*.rte)               |
| compegpsdatawaypointformat     | CompeGPS Data Waypoint (\*.wpt)            |
| copilot6format                 | CoPilot 6 (\*.trp)                         |
| copilot7format                 | CoPilot 7 (\*.trp)                         |
| copilot8format                 | CoPilot 8 (\*.trp)                         |
| copilot9format                 | CoPilot 9 (\*.trp)                         |
| excel                          | Excel as of Version 2007 (.xlsx)           |
| excel\_old                     | Excel (.xls)                               |
| flightrecorderdataformat       | FAI/IGC Flight Recorder Data (\*.igc)      |
| tourformat                     | Falk Navigator (\*.tour)                   |
| garminflightplanformat         | Garmin Flight Plan (\*.fpl)                |
| garminmapsource5format         | Garmin MapSource 5.x (\*.mps)              |
| garminmapsource6format         | Garmin MapSource 6.x (\*.gdb)              |
| garminpcx5format               | Garmin PCX5 (\*.wpt)                       |
| garminpoiformat                | Garmin POI (\*.gpi)                        |
| garminpoidbformat              | Garmin POI Database (\*.xcsv)              |
| geocachingformat               | Geocaching.com/EasyGPS (\*.loc)            |
| glopusformat                   | Glopus (\*.tk)                             |
| kml20format                    | Google Earth 3 (\*.kml)                    |
| kmz20format                    | Google Earth 3 Compressed (\*.kmz)         |
| kml21format                    | Google Earth 4 (\*.kml)                    |
| kmz21format                    | Google Earth 4 Compressed (\*.kmz)         |
| kml22betaformat                | Google Earth 4.2 (\*.kml)                  |
| kmz22betaformat                | Google Earth 4.2 Compressed (\*.kmz)       |
| kml22format                    | Google Earth 5 (\*.kml)                    |
| kmz22format                    | Google Earth 5 Compressed (\*.kmz)         |
| gopal3routeformat              | GoPal 3 Route (\*.xml)                     |
| gopal5routeformat              | GoPal 5 Route (\*.xml)                     |
| goridergpsformat               | GoRider GPS (\*.rt)                        |
| gpx10format                    | GPS Exchange Format 1.0 (\*.gpx)           |
| gpx11format                    | GPS Exchange Format 1.1 (\*.gpx)           |
| gpstunerformat                 | GPS Tuner (\*.trk)                         |
| haicomloggerformat             | Haicom Logger (\*.csv)                     |
| iblue747format                 | i-Blue 747 (\*.csv)                        |
| igo8routeformat                | iGO8 Route (\*.kml)                        |
| klicktelrouteformat            | klickTel Routenplaner 2009 (\*.krt)        |
| kompassformat                  | Kompass (\*.tk)                            |
| magellanexploristformat        | Magellan Explorist (\*.log)                |
| magellanmapsendformat          | Magellan MapSend (\*.wpt)                  |
| magellanrouteformat            | Magellan Route (\*.rte)                    |
| magicmapsiktformat             | MagicMaps Project (\*.ikt)                 |
| magicmapspthformat             | MagicMaps Tour (\*.pth)                    |
| magicmaps2goformat             | MagicMaps2Go (\*.txt)                      |
| mtp0607format                  | Map&Guide Tourenplaner 2006/2007 (\*.bcr)  |
| mtp0809format                  | Map&Guide Tourenplaner 2008/2009 (\*.bcr)  |
| navigatingpoiwarnerformat      | Navigating POI-Warner (\*.asc)             |
| nmnrouteformat                 | Navigon Mobile Navigator (\*.route)        |
| nmn4format                     | Navigon Mobile Navigator 4 (\*.rte)        |
| nmn5format                     | Navigon Mobile Navigator 5 (\*.rte)        |
| nmn6format                     | Navigon Mobile Navigator 6 (\*.rte)        |
| nmn6favoritesformat            | Navigon Mobile Navigator 6 Favorites       |
| nmn7format                     | Navigon Mobile Navigator 7 (\*.freshroute) |
| nmnurlformat                   | Navigon Mobile Navigator URL (\*.txt)      |
| nmeaformat                     | NMEA 0183 Sentences (\*.nmea)              |
| nokialandmarkexchangeformat    | Nokia Landmark Exchange (\*.lmx)           |
| opelnaviformat                 | Opel Navi 600/900 (\*.poi)                 |
| oziexplorerrouteformat         | OziExplorer Route (\*.rte)                 |
| oziexplorerwaypointformat      | OziExplorer Waypoint (\*.wpt)              |
| qstarzq1000format              | Qstarz BT-Q1000 (\*.csv)                   |
| route66format                  | Route 66 POI (\*.csv)                      |
| sygicunicodeformat             | Sygic POI Unicode (\*.txt)                 |
| tomtom5routeformat             | Tom Tom 5 Route (\*.itn)                   |
| tomtom8routeformat             | Tom Tom 8 Route (\*.itn)                   |
| tomtompoiformat                | Tom Tom POI (\*.ov2)                       |
| ovlformat                      | Top50 OVL ASCII (\*.ovl)                   |
| tcx1format                     | Training Center Database 1 (\*.tcx)        |
| tcx2format                     | Training Center Database 2 (\*.tcx)        |
| viamichelinformat              | ViaMichelin (\*.xvm)                       |
| webpageformat                  | Web Page (\*.html)                         |



#### Formate abfragen

Man kann sämtliche Formate erhalten mit

<https://webservice.tourenplaner.biz/getexportformats>



#### Spezialformate im Browser für Mobile Navigation

<https://webservice.tourenplaner.biz/google_maps?tid=%3Ctransaktions-ID>  
<https://webservice.tourenplaner.biz/google_maps?tid=%3Ctransaktions-ID%3E&building_coordinates=true>  
<https://webservice.tourenplaner.biz/apple_maps?tid=%3Ctransaktions-ID>  
<https://webservice.tourenplaner.biz/apple_maps?tid=%3Ctransaktions-ID%3E&building_coordinates=true>  
Oder als Auswahlseite:  
<https://webservice.tourenplaner.biz/navi_maps?tid=%3Ctransaktions-ID>  
<https://webservice.tourenplaner.biz/navi_maps?tid=%3Ctransaktions-ID%3E&building_coordinates=true>



## Weitere Aufrufe



### Webservice-Delete

Kompletter Upload
<https://webservice.tourenplaner.biz/delete.json?tid=%3Ctid>

Nur Waypoints
https://webservice.tourenplaner.biz/delete_waypoints?tid=tid&uids=uid1,uid2

Falls nur Waypoints gelöscht wurden, muss die Optimierung noch einmal gestartet werden mit
https://webservice.tourenplaner.biz/optimize?tid=tid


#### Rückgabe

HTTP-Statuscode 200 bzw. 500



### Dynamische Karte



#### Karte mit einer Tour anzeigen

<https://webservice.tourenplaner.biz/map_only/%3Ctid%3E(?building_coordinates=true)>

|                       |          |                                                                                                |
|-----------------------|----------|------------------------------------------------------------------------------------------------|
| Parameter             |          | Kommentar                                                                                      |
| tid                   | required |                                                                                                |
| building\_coordinates | optional | Statt den Straßenkoordinaten werden die Gebäudekoordinaten angezeigt true oder false (default) |



##### Rückgabe

HTTP-Statuscode 200 bzw. 500

Die dynamische Karte kann z.B. als iFrame eingebunden werden.

#### Gleichzeitiges Anzeigen mehrerer Touren und eines Punktes

Diese Funktion kann genutzt werden, um für eine neue Adresse visuell zu
bewerten, zu welcher bestehenden Tour diese am nächsten ist.

<https://webservice.tourenplaner.biz/map_tours/&lt;tids?locality=&lt;ort&amp;street=&lt;straße>

|                       |          |                                                     |
|-----------------------|----------|-----------------------------------------------------|
| Parameter             |          | Kommentar                                           |
| tids                  | required | als Komma separierte Liste &lt;tid,&lt;tid… |
| building\_coordinates | optional | true oder false (default)                           |
| locality              | optional | Ort (Es wird geokodiert)                            |
| postcode              | optional | Postleitzahl (Es wird geokodiert)                   |
| street                | optional | Straße Hausnummer (Es wird geokodiert)              |
| latitude              | optional | Breitengrad (Es wird nicht geokodiert)              |
| longitude             | optional | Längengrad (Es wird nicht geokodiert)               |



#### Interaktive Oberfläche (muss freigeschaltet sein)

<https://webservice.tourenplaner.biz/tid/%3Ctid%3E(?building_coordinates=true)>

|                       |          |                                                                                                |
|-----------------------|----------|------------------------------------------------------------------------------------------------|
| Parameter             |          | Kommentar                                                                                      |
| tid                   | required |                                                                                                |
| building\_coordinates | optional | Statt den Straßenkoordinaten werden die Gebäudekoordinaten angezeigt true oder false (default) |
