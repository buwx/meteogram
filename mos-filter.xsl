<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:dwd="https://opendata.dwd.de/weather/lib/pointforecast_dwd_extension_V1_0.xsd"
  xmlns:kml="http://www.opengis.net/kml/2.2">

  <xsl:output omit-xml-declaration="yes" indent="yes"/>
  <xsl:strip-space elements="*"/>
  <xsl:variable name="prefix" select="$filter"/>

  <!-- identity template -->
  <xsl:template match="@* | node()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>

  <!-- override the above template for certain Placemark elements; output nothing. -->
  <xsl:template match="kml:Placemark[
     not(kml:name[starts-with(text(),$prefix)])]">
  </xsl:template>
</xsl:stylesheet>
