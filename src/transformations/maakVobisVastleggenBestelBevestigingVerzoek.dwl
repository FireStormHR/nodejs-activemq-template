// 20-06-2023
// Deze dwl maakt een "oud" vastleggenOrderExportRequest bericht tbv vastleggen bestelbevestiging in Vobis.
// Dit om backwards compatible te blijven en omdat Vobis er over een niet al te lange tijd uit gaat.
// Want voor het vastleggen zijn eigenlijk alleen referentieNummer en orderId nodig

%dw 2.0
input payload xml
output application/xml skipNullOn="elements",defaultNamespace="http://www.wetterskipfryslan.nl/bestellingen/3"
---
{
    vastleggenOrderExportRequest : 
    {
        mutatieSoort : "wijzigen",
        administratieCode: "dummywaarde ERPx export",
        orderDatum: now() as Date,
        valutaCode: "dummywaarde ERPx export",
        referentieNummer: payload.verwerkenErpxMutatieVerzoek.eventHeader.sleutelWaarde,
        orderId : payload.verwerkenErpxMutatieVerzoek.eventPayload.wordtData.bestelnummer,
        orderregels : 
        {
            orderregel : 
            {
                    regelnummer : "0",
                    kostensoortId : "dummy",
                    bedrag : "999",
                    aantal : "999",
            }
        }          
    }
}