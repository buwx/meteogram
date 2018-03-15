<?php
/*
 * ============================================================================
 *
 * Converts forecast data for a given station to json.
 *
 * ============================================================================
 *
 * Author: Michael Buchfink
 *
 * ============================================================================
 *
 * Last updated: 15.03.2018
 *
 * ============================================================================
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$station = '10738';
if (isset($_GET['station'])) {
    $station = $_GET['station'];
}

$title = 'Stuttgart';
if (isset($_GET['title'])) {
    $station = $_GET['title'];
}

$titleShort = $title;
if (isset($_GET['titleShort'])) {
    $station = $_GET['titleShort'];
}

$xslDoc = new DOMDocument();
$xslDoc->load('mos-json.xsl');

$xmlDoc = new DOMDocument();
$xmlDoc->load('MOSMIX_S_LATEST_240-de.kml');

$proc = new XSLTProcessor();
$proc->importStylesheet($xslDoc);

$proc->setParameter('', 'station', $station);
$proc->setParameter('', 'title', $title);
$proc->setParameter('', 'titleShort', $titleShort);

echo $proc->transformToXML($xmlDoc);
?>
