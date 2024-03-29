<?xml version="1.0" encoding="UTF-8"?>
<!--
This file was generated by Altova MapForce 2021

YOU SHOULD NOT MODIFY THIS FILE, BECAUSE IT WILL BE
OVERWRITTEN WHEN YOU RE-RUN CODE GENERATION.

Refer to the Altova MapForce Documentation for further details.
http://www.altova.com/mapforce
-->
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:vmf="http://www.altova.com/MapForce/UDF/vmf" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:fn="http://www.w3.org/2005/xpath-functions" xmlns:ns0="http://www.wetterskipfryslan.nl/debiteuren" exclude-result-prefixes="vmf xs fn ns0">
	<xsl:template name="vmf:vmf1_statustoinactief">
		<xsl:param name="input" select="()"/>
		<xsl:choose>
			<xsl:when test="$input='Actief'">
				<xsl:copy-of select="'false'"/>
			</xsl:when>
			<xsl:when test="$input='Gesloten'">
				<xsl:copy-of select="'true'"/>
			</xsl:when>
			<xsl:when test="$input='Niet actief'">
				<xsl:copy-of select="'true'"/>
			</xsl:when>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="vmf:vmf2_landcodetolandnaam">
		<xsl:param name="input" select="()"/>
		<xsl:choose>
			<xsl:when test="$input='NL'">
				<xsl:copy-of select="'Nederland'"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:copy-of select="'Buitenland'"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:output method="xml" encoding="UTF-8" byte-order-mark="no" indent="yes"/>
	<xsl:param name="mutatieSoort" as="xs:string" required="yes"/>
	<xsl:template match="/">
		<debiteuren xmlns="http://www.wetterskipfryslan.nl/debiteuren/1">
			<xsl:for-each select="ns0:opvragenDebiteurAntwoord/ns0:berichtInhoud">
				<xsl:variable name="var11___as_integer" as="xs:integer" select="xs:integer('1')"/>
				<xsl:variable name="var12_resultof_equal" as="xs:boolean" select="($mutatieSoort = 'opvoeren')"/>
				<xsl:variable name="var10_contacten" as="node()?" select="ns0:contacten"/>
				<xsl:variable name="var9_resultof_first_items" as="node()*" select="($var10_contacten/ns0:contact/ns0:laatstBijgewerkt/ns0:mutatieDatum)[(fn:position() &lt;= $var11___as_integer)]"/>
				<debiteur>
					<mutatiesoort>
						<xsl:sequence select="$mutatieSoort"/>
					</mutatiesoort>
					<id>
						<xsl:sequence select="xs:string(xs:integer(fn:string(ns0:id)))"/>
					</id>
					<administratie>
						<xsl:sequence select="fn:string(ns0:administratie)"/>
					</administratie>
					<xsl:for-each select="ns0:relatieId">
						<relatieId>
							<xsl:sequence select="fn:string(.)"/>
						</relatieId>
					</xsl:for-each>
					<isRechtspersoon>
						<xsl:sequence select="xs:string(fn:exists(ns0:kvkNummer))"/>
					</isRechtspersoon>
					<relatieNaam>
						<xsl:sequence select="fn:string(ns0:relatieNaam)"/>
					</relatieNaam>
					<xsl:for-each select="ns0:status">
						<xsl:variable name="var1_resultof_vmf__statustoinactief" as="xs:string?">
							<xsl:call-template name="vmf:vmf1_statustoinactief">
								<xsl:with-param name="input" select="fn:string(.)" as="xs:string"/>
							</xsl:call-template>
						</xsl:variable>
						<xsl:for-each select="$var1_resultof_vmf__statustoinactief">
							<inactief>
								<xsl:sequence select="xs:string(xs:boolean(.))"/>
							</inactief>
						</xsl:for-each>
					</xsl:for-each>
					<xsl:if test="$var12_resultof_equal">
						<xsl:if test="fn:exists(($var9_resultof_first_items)[fn:not((fn:translate(fn:string(@xsi:nil), 'true ', '1') = '1'))])">
							<xsl:variable name="var2_cur_of_filter" as="xs:dateTime*">
								<xsl:for-each select="($var9_resultof_first_items)[fn:not((fn:translate(fn:string(@xsi:nil), 'true ', '1') = '1'))]">
									<xsl:sequence select="xs:dateTime(fn:string(.))"/>
								</xsl:for-each>
							</xsl:variable>
							<creatieDatum>
								<xsl:sequence select="xs:string(xs:date(xs:dateTime(fn:string-join(for $x in $var2_cur_of_filter return xs:string($x), ' '))))"/>
							</creatieDatum>
						</xsl:if>
					</xsl:if>
					<xsl:for-each select="$var9_resultof_first_items">
						<xsl:variable name="var3_test_resultof_equal" as="xs:dateTime?">
							<xsl:if test="fn:not((fn:translate(fn:string(@xsi:nil), 'true ', '1') = '1'))">
								<xsl:sequence select="xs:dateTime(fn:string(.))"/>
							</xsl:if>
						</xsl:variable>
						<mutatieDatum>
							<xsl:for-each select="$var3_test_resultof_equal">
								<xsl:sequence select="xs:string(xs:date(.))"/>
							</xsl:for-each>
						</mutatieDatum>
					</xsl:for-each>
					<xsl:for-each select="($var10_contacten/ns0:contact/ns0:adres)[(fn:position() &lt;= $var11___as_integer)]">
						<xsl:variable name="var4_landCode" as="node()?" select="ns0:landCode"/>
						<adres>
							<xsl:for-each select="ns0:straat">
								<straat>
									<xsl:sequence select="fn:string(.)"/>
								</straat>
							</xsl:for-each>
							<xsl:for-each select="ns0:huisnummer">
								<huisnummer>
									<xsl:sequence select="xs:string(xs:integer(fn:string(.)))"/>
								</huisnummer>
							</xsl:for-each>
							<xsl:for-each select="ns0:postcode">
								<postcode>
									<xsl:sequence select="fn:string(.)"/>
								</postcode>
							</xsl:for-each>
							<xsl:for-each select="ns0:woonplaats">
								<plaatsnaam>
									<xsl:sequence select="fn:string(.)"/>
								</plaatsnaam>
							</xsl:for-each>
							<xsl:for-each select="$var4_landCode">
								<landCode>
									<xsl:sequence select="fn:string(.)"/>
								</landCode>
							</xsl:for-each>
							<xsl:for-each select="$var4_landCode">
								<landnaam>
									<xsl:call-template name="vmf:vmf2_landcodetolandnaam">
										<xsl:with-param name="input" select="fn:string(.)" as="xs:string"/>
									</xsl:call-template>
								</landnaam>
							</xsl:for-each>
						</adres>
					</xsl:for-each>
					<xsl:for-each select="($var10_contacten/ns0:contact)[(fn:position() &lt;= $var11___as_integer)]">
						<xsl:variable name="var5_telefoonnummers" as="node()?" select="ns0:telefoonnummers"/>
						<xsl:variable name="var6_contactgegevens" as="node()?" select="ns0:contactgegevens"/>
						<contact>
							<xsl:for-each select="$var6_contactgegevens/ns0:contactpersoon">
								<contactpersoon>
									<xsl:sequence select="fn:string(.)"/>
								</contactpersoon>
							</xsl:for-each>
							<xsl:for-each select="$var6_contactgegevens/ns0:eMail">
								<emailadres>
									<xsl:sequence select="fn:string(.)"/>
								</emailadres>
							</xsl:for-each>
							<xsl:for-each select="$var5_telefoonnummers/ns0:telefoon1">
								<telefoonnummer>
									<xsl:sequence select="fn:string(.)"/>
								</telefoonnummer>
							</xsl:for-each>
							<xsl:for-each select="$var5_telefoonnummers/ns0:telefoon2">
								<faxnummer>
									<xsl:sequence select="fn:string(.)"/>
								</faxnummer>
							</xsl:for-each>
						</contact>
					</xsl:for-each>
					<rol>
						<rolId>
							<xsl:sequence select="xs:string(xs:integer('2'))"/>
						</rolId>
						<factuursoort></factuursoort>
						<aanmaanprocedure></aanmaanprocedure>
						<xsl:for-each select="ns0:betaalwijze/ns0:betaalMethode">
							<betaalwijze>
								<xsl:sequence select="fn:string(.)"/>
							</betaalwijze>
						</xsl:for-each>
						<xsl:if test="$var12_resultof_equal">
							<xsl:if test="fn:exists(($var9_resultof_first_items)[fn:not((fn:translate(fn:string(@xsi:nil), 'true ', '1') = '1'))])">
								<xsl:variable name="var7_test_equal_of_first_items" as="xs:dateTime*">
									<xsl:for-each select="($var9_resultof_first_items)[fn:not((fn:translate(fn:string(@xsi:nil), 'true ', '1') = '1'))]">
										<xsl:sequence select="xs:dateTime(fn:string(.))"/>
									</xsl:for-each>
								</xsl:variable>
								<creatieDatum>
									<xsl:sequence select="xs:string(xs:date(xs:dateTime(fn:string-join(for $x in $var7_test_equal_of_first_items return xs:string($x), ' '))))"/>
								</creatieDatum>
							</xsl:if>
						</xsl:if>
						<xsl:for-each select="$var9_resultof_first_items">
							<xsl:variable name="var8_test_resultof_equal" as="xs:dateTime?">
								<xsl:if test="fn:not((fn:translate(fn:string(@xsi:nil), 'true ', '1') = '1'))">
									<xsl:sequence select="xs:dateTime(fn:string(.))"/>
								</xsl:if>
							</xsl:variable>
							<mutatieDatum>
								<xsl:for-each select="$var8_test_resultof_equal">
									<xsl:sequence select="xs:string(xs:date(.))"/>
								</xsl:for-each>
							</mutatieDatum>
						</xsl:for-each>
					</rol>
				</debiteur>
			</xsl:for-each>
		</debiteuren>
	</xsl:template>
</xsl:stylesheet>
