%dw 2.0
input payload xml
output xml
import * from dw::core::Strings
var wf = "http://www.wetterskipfryslan.nl/debiteuren"
---
{
    opvragenDebiteurVerzoek @(xmlns:wf,versie:1): {
        bedrijfId: substringBefore(payload.verwerkenErpxMutatieVerzoek.eventHeader.sleutelWaarde,'-') 
        match { case 10 -> 'WF' else -> '(onbekend bedrijf)' },
        debiteurId: substringAfter(payload.verwerkenErpxMutatieVerzoek.eventHeader.sleutelWaarde,'-')
    }
}
