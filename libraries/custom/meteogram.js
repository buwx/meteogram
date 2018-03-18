/**
 * ============================================================================
 * 
 * Meteogram library for DWD MOSMIX forecast stations.
 * 
 * ============================================================================
 * 
 * Author: Michael Buchfink
 * 
 * ============================================================================
 * 
 * Last updated: 17.03.2018
 * 
 * ============================================================================
 * 
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 * 
 */

var ww_messages = {
    '10' : 'feuchter Dunst',
    '11' : 'Schwaden von Bodennebel',
    '12' : 'durchgehender Bodennebel',
    '13' : 'Wetterleuchten sichtbar, kein Donner gehört',
    '14' : 'Niederschlag im Gesichtskreis, nicht den Boden erreichend',
    '15' : 'Niederschlag in der Ferne, aber nicht an der Station',
    '16' : 'Niederschlag in der Nähe, aber nicht an der Station',
    '17' : 'Gewitter, aber kein Niederschlag an der Station',
    '18' : 'Markante Böen im Gesichtskreis, aber kein Niederschlag an der Station',
    '19' : 'Tromben im Gesichtskreis',
    '20' : 'nach Sprühregen oder Schneegriesel',
    '21' : 'nach Regen',
    '22' : 'nach Schneefall',
    '23' : 'nach Schneeregen oder Eiskörnern',
    '24' : 'nach gefrierendem Regen',
    '25' : 'nach Regenschauer',
    '26' : 'nach Schneeschauer',
    '27' : 'nach Graupel- oder Hagelschauer',
    '28' : 'nach Nebel',
    '29' : 'nach Gewitter',
    '30' : 'leichter oder mäßiger Sandsturm, an Intensität abnehmend',
    '31' : 'leichter oder mäßiger Sandsturm, unveränderte Intensität',
    '32' : 'leichter oder mäßiger Sandsturm, an Intensität zunehmend',
    '33' : 'schwerer Sandsturm, an Intensität abnehmend',
    '34' : 'schwerer Sandsturm, unveränderte Intensität',
    '35' : 'schwerer Sandsturm, an Intensität zunehmend',
    '36' : 'leichtes oder mäßiges Schneefegen, unter Augenhöhe',
    '37' : 'starkes Schneefegen, unter Augenhöhe',
    '38' : 'leichtes oder mäßiges Schneetreiben, über Augenhöhe',
    '39' : 'starkes Schneetreiben, über Augenhöhe',
    '40' : 'Nebel in einiger Entfernung',
    '41' : 'Nebel in Schwaden oder Bänken',
    '42' : 'Nebel, Himmel erkennbar, dünner werdend',
    '43' : 'Nebel, Himmel nicht erkennbar, dünner werdend',
    '44' : 'Nebel, Himmel erkennbar, unverändert',
    '45' : 'Nebel, Himmel nicht erkennbar, unverändert',
    '46' : 'Nebel, Himmel erkennbar, dichter werdend',
    '47' : 'Nebel, Himmel nicht erkennbar, dichter werdend',
    '48' : 'Nebel mit Reifansatz, Himmel erkennbar',
    '49' : 'Nebel mit Reifansatz, Himmel nicht erkennbar',
    '50' : 'unterbrochener leichter Sprühregen',
    '51' : 'leichter Sprühregen',
    '52' : 'unterbrochener mäßiger Sprühregen',
    '53' : 'mäßiger Sprühregen',
    '54' : 'unterbrochener starker Sprühregen',
    '55' : 'starker Sprühregen',
    '56' : 'leichter gefrierender Sprühregen',
    '57' : 'mäßiger oder starker gefrierender Sprühregen',
    '58' : 'leichter Sprühregen mit Regen',
    '59' : 'mäßiger oder starker Sprühregen mit Regen',
    '60' : 'unterbrochener leichter Regen oder einzelne Regentropfen',
    '61' : 'leichter Regen',
    '62' : 'unterbrochener mäßiger Regen',
    '63' : 'mäßiger Regen',
    '64' : 'unterbrochener starker Regen',
    '65' : 'starker Regen',
    '66' : 'leichter gefrierender Regen',
    '67' : 'mäßiger oder starker gefrierender Regen',
    '68' : 'leichter Schneeregen',
    '69' : 'mäßiger oder starker Schneeregen',
    '70' : 'unterbrochener leichter Schneefall oder einzelne Schneeflocken',
    '71' : 'leichter Schneefall',
    '72' : 'unterbrochener mäßiger Schneefall',
    '73' : 'mäßiger Schneefall',
    '74' : 'unterbrochener starker Schneefall',
    '75' : 'starker Schneefall',
    '76' : 'Eisnadeln (Polarschnee)',
    '77' : 'Schneegriesel',
    '78' : 'Schneekristalle',
    '79' : 'Eiskörner (gefrorene Regentropfen)',
    '80' : 'leichter Regenschauer',
    '81' : 'mäßiger oder starker Regenschauer',
    '82' : 'äußerst heftiger Regenschauer',
    '83' : 'leichter Schneeregenschauer',
    '84' : 'mäßiger oder starker Schneeregenschauer',
    '85' : 'leichter Schneeschauer',
    '86' : 'mäßiger oder starker Schneeschauer',
    '87' : 'leichter Graupelschauer',
    '88' : 'mäßiger oder starker Graupelschauer',
    '89' : 'leichter Hagelschauer',
    '90' : 'mäßiger oder starker Hagelschauer',
    '91' : 'Gewitter in der letzten Stunde, zurzeit leichter Regen',
    '92' : 'Gewitter in der letzten Stunde, zurzeit mäßiger oder starker Regen',
    '93' : 'Gewitter in der letzten Stunde, zurzeit leichter Schneefall/Schneeregen/Graupel/Hagel',
    '94' : 'Gewitter in der letzten Stunde, zurzeit mäßiger oder starker Schneefall/Schneeregen/Graupel/Hagel',
    '95' : 'leichtes oder mäßiges Gewitter mit Regen oder Schnee',
    '96' : 'leichtes oder mäßiges Gewitter mit Graupel oder Hagel',
    '97' : 'starkes Gewitter mit Regen oder Schnee',
    '98' : 'starkes Gewitter mit Sandsturm',
    '99' : 'starkes Gewitter mit Graupel oder Hagel'
}

function directionText(speed, deg) {
    if (speed == 0) {
        return "";
    }
    else if (deg >= 11.25 && deg < 33.75) {
        return "NNO";
    }
    else if (deg >= 33.75 && deg < 56.25) {
        return "NO";
    }
    else if (deg >= 56.25 && deg < 78.75) {
        return "ONO";
    }
    else if (deg >= 78.75 && deg < 101.25) {
        return "O";
    }
    else if (deg >= 101.25 && deg < 123.75) {
        return "OSO";
    }
    else if (deg >= 123.75 && deg < 146.25) {
        return "SO";
    }
    else if (deg >= 146.25 && deg < 168.75) {
        return "SSO";
    }
    else if (deg >= 168.75 && deg < 191.25) {
        return "S";
    }
    else if (deg >= 191.25 && deg < 213.75) {
        return "SSW";
    }
    else if (deg >= 213.75 && deg < 236.25) {
        return "SW";
    }
    else if (deg >= 236.25 && deg < 258.75) {
        return "WSW";
    }
    else if (deg >= 258.75 && deg < 281.25) {
        return "W";
    }
    else if (deg >= 281.25 && deg < 303.75) {
        return "WNW";
    }
    else if (deg >= 303.75 && deg < 326.25) {
        return "NW";
    }
    else if (deg >= 326.25 && deg < 348.75) {
        return "NNW";
    }
    else {
        return "N"; 
    }
}

function highcharts_de() {
    return {
        decimalPoint: ',',
        thousandsSep: '.',
        loading: 'Daten werden geladen...',
        months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        shortMonths: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        shortWeekdays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        contextButtonTitle: "Exportieren",
        printChart: "Drucken",
        rangeSelectorFrom: "Von",
        rangeSelectorTo: "Bis",
        rangeSelectorZoom: "Zeitraum",
        downloadPNG: 'Download als PNG-Bild',
        downloadJPEG: 'Download als JPEG-Bild',
        downloadPDF: 'Download als PDF-Dokument',
        downloadSVG: 'Download als SVG-Bild',
        resetZoom: "Zoom zurücksetzen",
        resetZoomTitle: "Zoom zurücksetzen"
    }
}

function findExtremasForDay(temperatures, flags, from, to) {
    var min = null, i_min;
    var max = null, i_max;
    for (i=from; i < to; i++) {
        var temp = temperatures[i];
        if (!min || temp.y < min.y) {
            min = temp;
            i_min = i;
        }
        if (!max || temp.y > max.y) {
            max = temp;
            i_max = i;
        }
    }
    if (min && i_min > from + 1 && i_min < to - 2) {
        flags.push({
            x: min.x,
            title: min.y + '°',
            text: 'Tmin ' + min.y + '°C',
            color: '#48AFE8',
        });
    }
    if (max && i_max > from + 1 && i_max < to - 2) {
        flags.push({
            x: max.x,
            title: max.y + '°',
            text: 'Tmax ' + max.y + '°C',
            color: '#FF3333'
        });
    }
}

function findExtremas(temperatures, flags) {
    var from = 0;
    do {
      var from_day = new Date(temperatures[from].x).getDate();
      var to = from + 1;
      while (to < temperatures.length && new Date(temperatures[to].x).getDate() === from_day) {
        to++;
      }
      if (to - from >= 6) {
        findExtremasForDay(temperatures, flags, from, to);
      }
      from = to;
    }  
    while (from < temperatures.length);
}
