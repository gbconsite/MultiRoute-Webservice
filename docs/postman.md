# Postman Test

[Postman](https://www.postman.com/) ist ein kostenloses Programm zum einfachen Testen von APIs.

Als POST-Request mit der folgenden URL `https://webservice.tourenplaner.biz/startjob` und Basic Auth senden. 

![image](https://user-images.githubusercontent.com/47481567/196468883-f90eba72-7071-433e-82a2-a988cfd006ff.png)

Im Body das Tour-Objekt eingeben, bspw.:

```JSON
{
  "tour": {
    "roundtrip": true,
    "tollfree": false,
    "optimize": "time",
    "avoid_highway": false,
    "start": true
  },
  "waypoints": [
     {
    "address": {"locality": "München", "postcode": "80803", "street": "Pündterplatz 8"}
     },
     {
    "address": {"locality": "Nürnberg", "postcode": "90403", "street": "Weintraubengasse 1"}
     },
     {
    "address": {"locality": "Oberschleißheim", "postcode": "", "street": ""}
     },
     {
    "address": {"locality": "Moosburg", "postcode": "85368", "street": "Orionstraße 2"},
    "time": {"duration_of_stay" : 60}
     },
     {
    "address": {"locality": "Gammelsdorf", "postcode": "", "street": ""}
     },
     {
    "address": {"locality": "Landshut", "postcode": "", "street": ""},
     "time": {"duration_of_stay": 60}
    }
  ]
}
```

Folgende Einstellungen:

![image](https://user-images.githubusercontent.com/47481567/196469260-0b02fb21-2729-4818-8c0b-ac50a10ee799.png)

Der Request liefert anschließend die `tid` zurück: 

```JSON
{"return_code":0,"error_description":"","tid":"OjKl25fJw353463sgeK2lpA","credit_expiration_date":"2022-10-24T23:59:00+02:00"}
```
