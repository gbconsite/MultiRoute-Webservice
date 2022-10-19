# Programmbeispiel C\#

```C#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.IO;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;

namespace ConsoleApplication1
{
    class Program
    {
	static void Main(string[] args)
	{
	    var username = "beispiel@beispiel.de";
	    var password = "password";
	    var myUri = new Uri("https://webservice.tourenplaner.biz/startjob");
	    var httpWebRequest = (HttpWebRequest)WebRequest.Create(myUri);
	    httpWebRequest.ContentType = "application/json; charset=utf-8";
	    httpWebRequest.Accept = "application/json";
	    httpWebRequest.Method = "POST";

	    NetworkCredential myNetworkCredential = new NetworkCredential(username, password);

	    CredentialCache myCredentialCache = new CredentialCache();
	    myCredentialCache.Add(myUri, "Basic", myNetworkCredential);

	    httpWebRequest.PreAuthenticate = true;
	    httpWebRequest.Credentials = myCredentialCache;


	    using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
	    {
		var json_obj = new root
		{
		  tour = new tour
		  {
		    uid="12345",
		    roundtrip= true,
		    tollfree= false,
		    optimize="time",
		    avoid_highway= false
		  },
		  waypoints= new List<waypoints> ()
		  {
		     new waypoints
		     {
			uid="1",
			name="Firma 1",
			address= new address{locality= "München", postcode= "80803", street= "Pündterplatz 8"}
		     },
		     new waypoints {
			uid="2",
			name="Firma 2",
			address= new address{locality= "Nürnberg", postcode= "90403", street= "Weintraubengasse 1"},
			time= new time{duration_of_stay= 60}
		     },
		     new waypoints
		     {
			uid="3",
			address= new address{locality= "München", postcode= "80331", street= "Tal 1"},
			time= new time{duration_of_stay= 60}
		     }
		}
		};
		MemoryStream ms = new MemoryStream();
		DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(root));
		ser.WriteObject(ms, json_obj);
		String json = Encoding.UTF8.GetString(ms.ToArray());


		streamWriter.Write(json);
		streamWriter.Flush();
		streamWriter.Close();

		var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
		using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
		{
		    var result = streamReader.ReadToEnd();
		    Console.WriteLine(result);
		}

	    }
	}
    }
    [DataContract]
    class root
    {
	public root() { }
	[DataMember]
	public tour tour { get; set; }
	[DataMember]
	public List<waypoints> waypoints;
    }
    [DataContract]
    class tour 
    {
	[DataMember]
	public string uid { get; set; } /* Required CRM-uniqueID , mit welcher dieser Vorgang im CRM verwaltet wird */
	[DataMember]
	public string optimize { get; set; } /* Optional Art der Optimierung: time(default) or distance */
	[DataMember]
	public Boolean roundtrip { get; set; } /* Optional Tourtype Rundstrecke oder nur Hinfahrt: true or false(default) */
	[DataMember]
	public Boolean tollfree { get; set; } /* Optional Tourparameter Vermeidung von Gebühren: true or false(default) */
	[DataMember]
	public Boolean avoid_highway { get; set; }  /* Optional Tourparameter Vermeidung von Autobahnen: true or false(default) */
	[DataMember]
	public Boolean start { get; set; }  /* Optional Startet automatisch die Routenoptimierung als Hintergrunddienst: true or false(default) */
    }
    [DataContract]
    class waypoints 
    {
	[DataMember]
	public string uid { get; set; } /* Optional CRM-uniqueID , unter welchem der Wegpunkt gespeichert ist 	*/
	/* required */
	[DataMember]
	public address address; /* Required Adresse */
	[DataMember]
	public time time; /* Optional Zeitangabe zu dem Wegpunkt* */
	/* Wenn Name gesetzt wird, dann wird er auch angezeit, sonst wird die id angezeigt */
	[DataMember]
	public string name { get; set; }
	/* Optionale Parameter es können Beliebg viele Parameter angefügt werden, sie werden einfach durchgereicht */
	[DataMember]
	public string entityId { get; set; }
    }
    [DataContract]
    class address
    {
	[DataMember]
	public string street { get; set; } /* Required Ort */
	[DataMember]
	public string postcode { get; set; } /* Required Postleitzahl */
	[DataMember]
	public string locality { get; set; }  /* Required Straße Hausnummer */
    }
    [DataContract]
    class time
    {
	/* Aufenthaltsdauer */
	[DataMember]
	public int duration_of_stay { get; set; }
	/* Ankuntszeit ISO 8601 Format*/
	[DataMember]
	public string arrival { get; set; }
	/* Abfahrtszeit ISO 8601 Format*/
	[DataMember]
	public string departure { get; set; }  
	/* ACHTUNG: Es wird arrival bzw depature vom ersten Datensatz wo sie angegeben sind ausgewertet*/
	/* Wenn arrival und departure angegeben sind, dann wird arrival verwendet */
    }

}
```
