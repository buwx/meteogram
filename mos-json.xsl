<?xml version="1.0" encoding="UTF-8"?>
<!--
 | ============================================================================
 |
 | Converts MOSMIX-KML to JSON
 |
 | Used Variables:
 |
 | - station: the station id
 | - title: title in long form
 | - titleShort: title in short form
 | - lon: longitude of station location
 | - lat: latitude of station location
 |
 | ============================================================================
 |
 | Author: Michael Buchfink
 |
 | ============================================================================
 |
 | Last updated: 09.03.2018
 |
 | ============================================================================
 |
 | Licensed to the Apache Software Foundation (ASF) under one
 | or more contributor license agreements.  See the NOTICE file
 | distributed with this work for additional information
 | regarding copyright ownership.  The ASF licenses this file
 | to you under the Apache License, Version 2.0 (the
 | "License"); you may not use this file except in compliance
 | with the License.  You may obtain a copy of the License at
 |
 |   http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing,
 | software distributed under the License is distributed on an
 | "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 | KIND, either express or implied.  See the License for the
 | specific language governing permissions and limitations
 | under the License.
 |
 -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:dwd="https://opendata.dwd.de/weather/lib/pointforecast_dwd_extension_V1_0.xsd"
  xmlns:kml="http://www.opengis.net/kml/2.2">

  <xsl:output method="text" indent="yes" />
  <xsl:strip-space elements="*" />

  <xsl:template match="kml:Document">
    <xsl:text>{</xsl:text>
    <xsl:apply-templates />
    <xsl:text>}</xsl:text>
  </xsl:template>

  <xsl:template match="kml:ExtendedData">
    <xsl:text>"issuer": "</xsl:text>
    <xsl:value-of select="dwd:ProductDefinition/dwd:Issuer" />
    <xsl:text>"</xsl:text>
    <xsl:text>, "productId": "</xsl:text>
    <xsl:value-of select="dwd:ProductDefinition/dwd:ProductID" />
    <xsl:text>"</xsl:text>
    <xsl:text>, "generatingProcess": "</xsl:text>
    <xsl:value-of select="dwd:ProductDefinition/dwd:GeneratingProcess" />
    <xsl:text>"</xsl:text>
    <xsl:apply-templates select="dwd:ProductDefinition/dwd:ForecastTimeSteps" />
  </xsl:template>

  <xsl:template match="dwd:ForecastTimeSteps">
    <xsl:text>, "timeSteps": [</xsl:text>
    <xsl:for-each select="dwd:TimeStep">
      <xsl:text>"</xsl:text>
      <xsl:value-of select="." />
      <xsl:text>"</xsl:text>
      <xsl:if test="position() != last()">
        <xsl:text>,</xsl:text>
      </xsl:if>
    </xsl:for-each>
    <xsl:text>]</xsl:text>
  </xsl:template>

  <xsl:template match="kml:Placemark">
    <xsl:if test="kml:name=$station">
      <xsl:text>, "station": {</xsl:text>
      <xsl:text>"name": "</xsl:text>
      <xsl:value-of select="$station" />
      <xsl:text>"</xsl:text>
      <xsl:text>, "description": "</xsl:text>
      <xsl:value-of select="kml:description" />
      <xsl:text>"</xsl:text>
      <xsl:text>, "title": "</xsl:text>
      <xsl:value-of select="$title" />
      <xsl:text>"</xsl:text>
      <xsl:text>, "titleShort": "</xsl:text>
      <xsl:value-of select="$titleShort" />
      <xsl:text>"</xsl:text>
      <xsl:text>, "coordinates": [</xsl:text>
      <xsl:value-of select="kml:Point/kml:coordinates" />
      <xsl:text>]</xsl:text>
      <xsl:for-each select="kml:ExtendedData/dwd:Forecast">
        <xsl:text>, "</xsl:text>
        <xsl:value-of select="@dwd:elementName" />
        <xsl:text>": [</xsl:text>
        <xsl:attribute name="dwd:elementName"><xsl:value-of
          select="@dwd:elementName" /></xsl:attribute>
        <xsl:call-template name="format">
          <xsl:with-param name="text" select="normalize-space()" />
        </xsl:call-template>
        <xsl:text>]</xsl:text>
      </xsl:for-each>
      <xsl:text>}</xsl:text>
    </xsl:if>
  </xsl:template>

  <xsl:template name="format">
    <xsl:param name="text" />
    <xsl:variable name="replace" select="' '" />
    <xsl:variable name="with" select="','" />
    <xsl:choose>
      <xsl:when test="contains($text,$replace)">
        <xsl:text>"</xsl:text>
        <xsl:value-of select="substring-before($text,$replace)" />
        <xsl:text>"</xsl:text>
        <xsl:value-of select="$with" />
        <xsl:call-template name="format">
          <xsl:with-param name="text"
            select="substring-after($text,$replace)" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:text>"</xsl:text>
        <xsl:value-of select="$text" />
        <xsl:text>"</xsl:text>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>
