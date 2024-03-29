<?xml version="1.0" encoding="UTF-8"?>
<!--
This file was generated by Altova MapForce 2021

YOU SHOULD NOT MODIFY THIS FILE, BECAUSE IT WILL BE
OVERWRITTEN WHEN YOU RE-RUN CODE GENERATION.

Refer to the Altova MapForce Documentation for further details.
http://www.altova.com/mapforce
-->
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions" xmlns:ns0="http://www.wetterskipfryslan.nl/crediteuren" exclude-result-prefixes="xs fn ns0">
	<xsl:output method="xml" encoding="UTF-8" byte-order-mark="no" indent="yes"/>
	<xsl:template match="/">
		<xsl:variable name="var4_opvragenCrediteurAntwoord" as="node()?" select="ns0:opvragenCrediteurAntwoord"/>
		<vastleggenLeverancierVerzoek xmlns="http://www.wetterskipfryslan.nl/Leveranciers/2">
			<leverancier>
				<xsl:for-each select="$var4_opvragenCrediteurAntwoord/ns0:berichtInhoud/ns0:mutatieSoort">
					<mutatieSoort>
						<xsl:sequence select="fn:string(.)"/>
					</mutatieSoort>
				</xsl:for-each>
				<xsl:for-each select="$var4_opvragenCrediteurAntwoord/ns0:berichtInhoud/ns0:status">
					<inactief>
						<xsl:sequence select="xs:string(('Actief' != fn:string(.)))"/>
					</inactief>
				</xsl:for-each>
				<xsl:for-each select="$var4_opvragenCrediteurAntwoord/ns0:berichtInhoud/ns0:relatieNaam">
					<leverancierNaam>
						<xsl:sequence select="fn:string(.)"/>
					</leverancierNaam>
				</xsl:for-each>
				<xsl:for-each select="$var4_opvragenCrediteurAntwoord/ns0:berichtInhoud/ns0:crediteurId">
					<leverancierId>
						<xsl:sequence select="fn:string(.)"/>
					</leverancierId>
				</xsl:for-each>
				<xsl:variable name="var1_test_resultof_any" as="xs:string?">
					<xsl:choose>
						<xsl:when test="fn:exists(($var4_opvragenCrediteurAntwoord)[fn:exists((./ns0:berichtInhoud)[fn:exists((./ns0:factuurSoort)[fn:exists(ns0:btwCode)])])])">
							<xsl:for-each select="$var4_opvragenCrediteurAntwoord/ns0:berichtInhoud/ns0:factuurSoort/ns0:btwCode">
								<xsl:sequence select="fn:string(.)"/>
							</xsl:for-each>
						</xsl:when>
						<xsl:otherwise>
							<xsl:sequence select="'Hoog'"/>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:variable>
				<xsl:for-each select="$var1_test_resultof_any">
					<btwCode>
						<xsl:sequence select="."/>
					</btwCode>
				</xsl:for-each>
				<leverancierRol>crediteur</leverancierRol>
				<bankrekeningen>
					<xsl:for-each select="$var4_opvragenCrediteurAntwoord/ns0:berichtInhoud">
						<xsl:variable name="var2_cur" as="node()" select="."/>
						<xsl:for-each select="ns0:betaalwijze">
							<bankrekening>
								<xsl:for-each select="ns0:iban">
									<rekeningNummer>
										<xsl:sequence select="fn:string(.)"/>
									</rekeningNummer>
								</xsl:for-each>
								<xsl:for-each select="ns0:tenaamstelling">
									<tenaamstelling>
										<xsl:sequence select="fn:string(.)"/>
									</tenaamstelling>
								</xsl:for-each>
								<xsl:for-each select="$var2_cur/ns0:prioriteit">
									<isVoorkeurRekening>
										<xsl:sequence select="xs:string((fn:string(.) = xs:string(xs:decimal('0'))))"/>
									</isVoorkeurRekening>
								</xsl:for-each>
							</bankrekening>
						</xsl:for-each>
					</xsl:for-each>
				</bankrekeningen>
				<xsl:for-each select="($var4_opvragenCrediteurAntwoord/ns0:berichtInhoud/ns0:contacten/ns0:contact/ns0:adres)[(fn:position() &lt;= xs:integer('1'))]">
					<adres>
						<xsl:for-each select="ns0:straat">
							<straat>
								<xsl:sequence select="fn:string(.)"/>
							</straat>
						</xsl:for-each>
						<xsl:for-each select="ns0:huisnummer">
							<huisNummer>
								<xsl:sequence select="fn:string(.)"/>
							</huisNummer>
						</xsl:for-each>
						<xsl:for-each select="ns0:postcode">
							<postCode>
								<xsl:sequence select="fn:string(.)"/>
							</postCode>
						</xsl:for-each>
						<xsl:for-each select="ns0:woonplaats">
							<plaatsNaam>
								<xsl:sequence select="fn:string(.)"/>
							</plaatsNaam>
						</xsl:for-each>
						<xsl:for-each select="ns0:landCode">
							<land>
								<xsl:sequence select="fn:string(.)"/>
							</land>
						</xsl:for-each>
					</adres>
				</xsl:for-each>
				<contacten>
					<xsl:for-each select="$var4_opvragenCrediteurAntwoord/ns0:berichtInhoud/ns0:contacten/ns0:contact">
						<xsl:variable name="var3_contactgegevens" as="node()?" select="ns0:contactgegevens"/>
						<contact>
							<soortContact>Algemeen</soortContact>
							<xsl:for-each select="$var3_contactgegevens/ns0:contactpersoon">
								<contactPersoon>
									<xsl:sequence select="fn:string(.)"/>
								</contactPersoon>
							</xsl:for-each>
							<xsl:for-each select="$var3_contactgegevens/ns0:eMail">
								<emailAdres>
									<xsl:sequence select="fn:string(.)"/>
								</emailAdres>
							</xsl:for-each>
							<xsl:for-each select="ns0:telefoonnummers/ns0:telefoon1">
								<telefoonNummer>
									<xsl:sequence select="fn:string(.)"/>
								</telefoonNummer>
							</xsl:for-each>
						</contact>
					</xsl:for-each>
				</contacten>
			</leverancier>
		</vastleggenLeverancierVerzoek>
	</xsl:template>
</xsl:stylesheet>
