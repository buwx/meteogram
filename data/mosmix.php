<?php
   header('Content-Type: application/json');
   header('Access-Control-Allow-Origin: *');

   $xslDoc = new DOMDocument();
   $xslDoc->load('mos-json.xsl');

   $xmlDoc = new DOMDocument();
   $xmlDoc->load('MOSMIX_S_LATEST_240-de.kml');

   $proc = new XSLTProcessor();
   $proc->importStylesheet($xslDoc);

   $station = $_GET['station'];
   $title = $_GET['title'];
   $titleShort = $_GET['titleShort'];

   $proc->setParameter('', 'station', $station);
   $proc->setParameter('', 'title', $title);
   $proc->setParameter('', 'titleShort', $titleShort);

   echo $proc->transformToXML($xmlDoc);
?>
