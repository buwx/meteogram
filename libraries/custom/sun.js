/**
 * ============================================================================
 *
 * Calculates the time of sunrise and sunset for a given location.
 * 
 * Based on https://www.esrl.noaa.gov/gmd/grad/solcalc/sunrise.html
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
**/

// Convert radian angle to degrees

function radToDeg(angleRad) 
{
    return (180.0 * angleRad / Math.PI);
}

// Convert degree angle to radians

function degToRad(angleDeg) 
{
    return (Math.PI * angleDeg / 180.0);
}
    
// ***********************************************************************/
// * Name: calcDayOfYear */
// * Type: Function */
// * Purpose: Finds numerical day-of-year from mn, day and lp year info */
// * Arguments: */
// * month: January = 1 */
// * day : 1 - 31 */
// * lpyr : 1 if leap year, 0 if not */
// * Return value: */
// * The numerical day of year */
// ***********************************************************************/

function calcDayOfYear(mn, dy, lpyr) 
{
    var k = (lpyr ? 1 : 2);
    var doy = Math.floor((275 * mn)/9) - k * Math.floor((mn + 9)/12) + dy -30;
    return doy;
}

// ***********************************************************************/
// * Name: calcDayOfWeek */
// * Type: Function */
// * Purpose: Derives weekday from Julian Day */
// * Arguments: */
// * juld : Julian Day */
// * Return value: */
// * String containing name of weekday */
// ***********************************************************************/

function calcDayOfWeek(juld)
{
    var A = (juld + 1.5) % 7;
    var DOW = (A==0)?"Sunday":(A==1)?"Monday":(A==2)?"Tuesday":(A==3)?"Wednesday":(A==4)?"Thursday":(A==5)?"Friday":"Saturday";
    return DOW;
}

// ***********************************************************************/
// * Name: calcJD */
// * Type: Function */
// * Purpose: Julian day from calendar day */
// * Arguments: */
// * year : 4 digit year */
// * month: January = 1 */
// * day : 1 - 31 */
// * Return value: */
// * The Julian day corresponding to the date */
// * Note: */
// * Number is returned for start of day. Fractional days should be */
// * added later. */
// ***********************************************************************/

function calcJD(year, month, day)
{
    if (month <= 2) {
        year -= 1;
        month += 12;
    }
    var A = Math.floor(year/100);
    var B = 2 - A + Math.floor(A/4);

    var JD = Math.floor(365.25*(year + 4716)) + Math.floor(30.6001*(month+1)) + day + B - 1524.5;
    return JD;
}

// ***********************************************************************/
// * Name: calcDateFromJD */
// * Type: Function */
// * Purpose: Calendar date from Julian Day */
// * Arguments: */
// * jd : Julian Day */
// * Return value: */
// * String date in the form DD-MONTHNAME-YYYY */
// * Note: */
// ***********************************************************************/

function calcDateFromJD(jd)
{
    var z = Math.floor(jd + 0.5);
    var f = (jd + 0.5) - z;

    if (z < 2299161) {
        var A = z;
    } else {
        alpha = Math.floor((z - 1867216.25)/36524.25);
        var A = z + 1 + alpha - Math.floor(alpha/4);
    }

    var B = A + 1524;
    var C = Math.floor((B - 122.1)/365.25);
    var D = Math.floor(365.25 * C);
    var E = Math.floor((B - D)/30.6001);

    var day = B - D - Math.floor(30.6001 * E) + f;
    var month = (E < 14) ? E - 1 : E - 13;
    var year = (month > 2) ? C - 4716 : C - 4715;

    return (day + "-" + monthList[month-1].name + "-" + year);
}

// ***********************************************************************/
// * Name: calcDayFromJD */
// * Type: Function */
// * Purpose: Calendar day (minus year) from Julian Day */
// * Arguments: */
// * jd : Julian Day */
// * Return value: */
// * String date in the form DD-MONTH */
// ***********************************************************************/

function calcDayFromJD(jd)
{
    var z = Math.floor(jd + 0.5);
    var f = (jd + 0.5) - z;

    if (z < 2299161) {
        var A = z;
    } else {
        alpha = Math.floor((z - 1867216.25)/36524.25);
        var A = z + 1 + alpha - Math.floor(alpha/4);
    }

    var B = A + 1524;
    var C = Math.floor((B - 122.1)/365.25);
    var D = Math.floor(365.25 * C);
    var E = Math.floor((B - D)/30.6001);

    var day = B - D - Math.floor(30.6001 * E) + f;
    var month = (E < 14) ? E - 1 : E - 13;
    var year = (month > 2) ? C - 4716 : C - 4715;

    return ((day<10 ? "0" : "") + day + monthList[month-1].abbr);
}

// ***********************************************************************/
// * Name: calcTimeJulianCent */
// * Type: Function */
// * Purpose: convert Julian Day to centuries since J2000.0. */
// * Arguments: */
// * jd : the Julian Day to convert */
// * Return value: */
// * the T value corresponding to the Julian Day */
// ***********************************************************************/

function calcTimeJulianCent(jd)
{
    var T = (jd - 2451545.0)/36525.0;
    return T;
}

// ***********************************************************************/
// * Name: calcJDFromJulianCent */
// * Type: Function */
// * Purpose: convert centuries since J2000.0 to Julian Day. */
// * Arguments: */
// * t : number of Julian centuries since J2000.0 */
// * Return value: */
// * the Julian Day corresponding to the t value */
// ***********************************************************************/

function calcJDFromJulianCent(t)
{
    var JD = t * 36525.0 + 2451545.0;
    return JD;
}

// ***********************************************************************/
// * Name: calGeomMeanLongSun */
// * Type: Function */
// * Purpose: calculate the Geometric Mean Longitude of the Sun */
// * Arguments: */
// * t : number of Julian centuries since J2000.0 */
// * Return value: */
// * the Geometric Mean Longitude of the Sun in degrees */
// ***********************************************************************/

function calcGeomMeanLongSun(t)
{
    var L0 = 280.46646 + t * (36000.76983 + 0.0003032 * t);
    while(L0 > 360.0)
    {
        L0 -= 360.0;
    }
    while(L0 < 0.0)
    {
        L0 += 360.0;
    }
    return L0;      // in degrees
}

// ***********************************************************************/
// * Name: calGeomAnomalySun */
// * Type: Function */
// * Purpose: calculate the Geometric Mean Anomaly of the Sun */
// * Arguments: */
// * t : number of Julian centuries since J2000.0 */
// * Return value: */
// * the Geometric Mean Anomaly of the Sun in degrees */
// ***********************************************************************/

function calcGeomMeanAnomalySun(t)
{
    var M = 357.52911 + t * (35999.05029 - 0.0001537 * t);
    return M;       // in degrees
}

// ***********************************************************************/
// * Name: calcEccentricityEarthOrbit */
// * Type: Function */
// * Purpose: calculate the eccentricity of earth's orbit */
// * Arguments: */
// * t : number of Julian centuries since J2000.0 */
// * Return value: */
// * the unitless eccentricity */
// ***********************************************************************/

function calcEccentricityEarthOrbit(t)
{
    var e = 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
    return e;       // unitless
}

// ***********************************************************************/
// * Name: calcSunEqOfCenter */
// * Type: Function */
// * Purpose: calculate the equation of center for the sun */
// * Arguments: */
// * t : number of Julian centuries since J2000.0 */
// * Return value: */
// * in degrees */
// ***********************************************************************/

function calcSunEqOfCenter(t)
{
    var m = calcGeomMeanAnomalySun(t);

    var mrad = degToRad(m);
    var sinm = Math.sin(mrad);
    var sin2m = Math.sin(mrad+mrad);
    var sin3m = Math.sin(mrad+mrad+mrad);

    var C = sinm * (1.914602 - t * (0.004817 + 0.000014 * t)) + sin2m * (0.019993 - 0.000101 * t) + sin3m * 0.000289;
    return C;       // in degrees
}

// ***********************************************************************/
// * Name: calcSunTrueLong */
// * Type: Function */
// * Purpose: calculate the true longitude of the sun */
// * Arguments: */
// * t : number of Julian centuries since J2000.0 */
// * Return value: */
// * sun's true longitude in degrees */
// ***********************************************************************/

function calcSunTrueLong(t)
{
    var l0 = calcGeomMeanLongSun(t);
    var c = calcSunEqOfCenter(t);

    var O = l0 + c;
    return O;       // in degrees
}

// ***********************************************************************/
// * Name: calcSunTrueAnomaly */
// * Type: Function */
// * Purpose: calculate the true anamoly of the sun */
// * Arguments: */
// * t : number of Julian centuries since J2000.0 */
// * Return value: */
// * sun's true anamoly in degrees */
// ***********************************************************************/

function calcSunTrueAnomaly(t)
{
    var m = calcGeomMeanAnomalySun(t);
    var c = calcSunEqOfCenter(t);

    var v = m + c;
    return v;       // in degrees
}

// ***********************************************************************/
// * Name: calcSunRadVector */
// * Type: Function */
// * Purpose: calculate the distance to the sun in AU */
// * Arguments: */
// * t : number of Julian centuries since J2000.0 */
// * Return value: */
// * sun radius vector in AUs */
// ***********************************************************************/

function calcSunRadVector(t)
{
    var v = calcSunTrueAnomaly(t);
    var e = calcEccentricityEarthOrbit(t);
    var R = (1.000001018 * (1 - e * e)) / (1 + e * Math.cos(degToRad(v)));
    return R;       // in AUs
}

// ***********************************************************************/
// * Name: calcSunApparentLong */
// * Type: Function */
// * Purpose: calculate the apparent longitude of the sun */
// * Arguments: */
// * t : number of Julian centuries since J2000.0 */
// * Return value: */
// * sun's apparent longitude in degrees */
// ***********************************************************************/

function calcSunApparentLong(t)
{
    var o = calcSunTrueLong(t);
    var omega = 125.04 - 1934.136 * t;
    var lambda = o - 0.00569 - 0.00478 * Math.sin(degToRad(omega));
    return lambda;      // in degrees
}

// ***********************************************************************/
// * Name: calcMeanObliquityOfEcliptic */
// * Type: Function */
// * Purpose: calculate the mean obliquity of the ecliptic */
// * Arguments: */
// * t : number of Julian centuries since J2000.0 */
// * Return value: */
// * mean obliquity in degrees */
// ***********************************************************************/

function calcMeanObliquityOfEcliptic(t)
{
    var seconds = 21.448 - t*(46.8150 + t*(0.00059 - t*(0.001813)));
    var e0 = 23.0 + (26.0 + (seconds/60.0))/60.0;
    return e0;      // in degrees
}

// ***********************************************************************/
// * Name: calcObliquityCorrection */
// * Type: Function */
// * Purpose: calculate the corrected obliquity of the ecliptic */
// * Arguments: */
// * t : number of Julian centuries since J2000.0 */
// * Return value: */
// * corrected obliquity in degrees */
// ***********************************************************************/

function calcObliquityCorrection(t)
{
    var e0 = calcMeanObliquityOfEcliptic(t);

    var omega = 125.04 - 1934.136 * t;
    var e = e0 + 0.00256 * Math.cos(degToRad(omega));
    return e;       // in degrees
}

// ***********************************************************************/
// * Name: calcSunRtAscension */
// * Type: Function */
// * Purpose: calculate the right ascension of the sun */
// * Arguments: */
// * t : number of Julian centuries since J2000.0 */
// * Return value: */
// * sun's right ascension in degrees */
// ***********************************************************************/

function calcSunRtAscension(t)
{
    var e = calcObliquityCorrection(t);
    var lambda = calcSunApparentLong(t);
    var tananum = (Math.cos(degToRad(e)) * Math.sin(degToRad(lambda)));
    var tanadenom = (Math.cos(degToRad(lambda)));
    var alpha = radToDeg(Math.atan2(tananum, tanadenom));
    return alpha;       // in degrees
}

// ***********************************************************************/
// * Name: calcSunDeclination */
// * Type: Function */
// * Purpose: calculate the declination of the sun */
// * Arguments: */
// * t : number of Julian centuries since J2000.0 */
// * Return value: */
// * sun's declination in degrees */
// ***********************************************************************/

function calcSunDeclination(t)
{
    var e = calcObliquityCorrection(t);
    var lambda = calcSunApparentLong(t);

    var sint = Math.sin(degToRad(e)) * Math.sin(degToRad(lambda));
    var theta = radToDeg(Math.asin(sint));
    return theta;       // in degrees
}

// ***********************************************************************/
// * Name: calcEquationOfTime */
// * Type: Function */
// * Purpose: calculate the difference between true solar time and mean */
// * solar time */
// * Arguments: */
// * t : number of Julian centuries since J2000.0 */
// * Return value: */
// * equation of time in minutes of time */
// ***********************************************************************/

function calcEquationOfTime(t)
{
    var epsilon = calcObliquityCorrection(t);
    var l0 = calcGeomMeanLongSun(t);
    var e = calcEccentricityEarthOrbit(t);
    var m = calcGeomMeanAnomalySun(t);

    var y = Math.tan(degToRad(epsilon)/2.0);
    y *= y;

    var sin2l0 = Math.sin(2.0 * degToRad(l0));
    var sinm   = Math.sin(degToRad(m));
    var cos2l0 = Math.cos(2.0 * degToRad(l0));
    var sin4l0 = Math.sin(4.0 * degToRad(l0));
    var sin2m  = Math.sin(2.0 * degToRad(m));

    var Etime = y * sin2l0 - 2.0 * e * sinm + 4.0 * e * y * sinm * cos2l0
            - 0.5 * y * y * sin4l0 - 1.25 * e * e * sin2m;

    return radToDeg(Etime)*4.0; // in minutes of time
}

// ***********************************************************************/
// * Name: calcHourAngleSunrise */
// * Type: Function */
// * Purpose: calculate the hour angle of the sun at sunrise for the */
// * latitude */
// * Arguments: */
// * lat : latitude of observer in degrees */
// * solarDec : declination angle of sun in degrees */
// * Return value: */
// * hour angle of sunrise in radians */
// ***********************************************************************/

function calcHourAngleSunrise(lat, solarDec)
{
    var latRad = degToRad(lat);
    var sdRad  = degToRad(solarDec)

    var HAarg = (Math.cos(degToRad(90.833))/(Math.cos(latRad)*Math.cos(sdRad))-Math.tan(latRad) * Math.tan(sdRad));

    var HA = (Math.acos(Math.cos(degToRad(90.833))/(Math.cos(latRad)*Math.cos(sdRad))-Math.tan(latRad) * Math.tan(sdRad)));

    return HA;      // in radians
}

// ***********************************************************************/
// * Name: calcHourAngleSunset */
// * Type: Function */
// * Purpose: calculate the hour angle of the sun at sunset for the */
// * latitude */
// * Arguments: */
// * lat : latitude of observer in degrees */
// * solarDec : declination angle of sun in degrees */
// * Return value: */
// * hour angle of sunset in radians */
// ***********************************************************************/

function calcHourAngleSunset(lat, solarDec)
{
    var latRad = degToRad(lat);
    var sdRad  = degToRad(solarDec)

    var HAarg = (Math.cos(degToRad(90.833))/(Math.cos(latRad)*Math.cos(sdRad))-Math.tan(latRad) * Math.tan(sdRad));

    var HA = (Math.acos(Math.cos(degToRad(90.833))/(Math.cos(latRad)*Math.cos(sdRad))-Math.tan(latRad) * Math.tan(sdRad)));

    return -HA;     // in radians
}


// ***********************************************************************/
// * Name: calcSunriseUTC */
// * Type: Function */
// * Purpose: calculate the Universal Coordinated Time (UTC) of sunrise */
// * for the given day at the given location on earth */
// * Arguments: */
// * JD : julian day */
// * latitude : latitude of observer in degrees */
// * longitude : longitude of observer in degrees */
// * Return value: */
// * time in minutes from zero Z */
// ***********************************************************************/

function calcSunriseUTC(JD, latitude, longitude)
{
    var t = calcTimeJulianCent(JD);

    // *** Find the time of solar noon at the location, and use
    // that declination. This is better than start of the
    // Julian day

    var noonmin = calcSolNoonUTC(t, longitude);
    var tnoon = calcTimeJulianCent (JD+noonmin/1440.0);

    // *** First pass to approximate sunrise (using solar noon)

    var eqTime = calcEquationOfTime(tnoon);
    var solarDec = calcSunDeclination(tnoon);
    var hourAngle = calcHourAngleSunrise(latitude, solarDec);

    var delta = longitude - radToDeg(hourAngle);
    var timeDiff = 4 * delta;   // in minutes of time
    var timeUTC = 720 + timeDiff - eqTime;  // in minutes

    // *** Second pass includes fractional jday in gamma calc

    var newt = calcTimeJulianCent(calcJDFromJulianCent(t) + timeUTC/1440.0); 
    eqTime = calcEquationOfTime(newt);
    solarDec = calcSunDeclination(newt);
    hourAngle = calcHourAngleSunrise(latitude, solarDec);
    delta = longitude - radToDeg(hourAngle);
    timeDiff = 4 * delta;
    timeUTC = 720 + timeDiff - eqTime; // in minutes

    return timeUTC;
}

// ***********************************************************************/
// * Name: calcSolNoonUTC */
// * Type: Function */
// * Purpose: calculate the Universal Coordinated Time (UTC) of solar */
// * noon for the given day at the given location on earth */
// * Arguments: */
// * t : number of Julian centuries since J2000.0 */
// * longitude : longitude of observer in degrees */
// * Return value: */
// * time in minutes from zero Z */
// ***********************************************************************/

function calcSolNoonUTC(t, longitude)
{
    // First pass uses approximate solar noon to calculate eqtime
    var tnoon = calcTimeJulianCent(calcJDFromJulianCent(t) + longitude/360.0);
    var eqTime = calcEquationOfTime(tnoon);
    var solNoonUTC = 720 + (longitude * 4) - eqTime; // min

    var newt = calcTimeJulianCent(calcJDFromJulianCent(t) -0.5 + solNoonUTC/1440.0); 

    eqTime = calcEquationOfTime(newt);
    solNoonUTC = 720 + (longitude * 4) - eqTime; // min
    
    return solNoonUTC;
}

// ***********************************************************************/
// * Name: calcSunsetUTC */
// * Type: Function */
// * Purpose: calculate the Universal Coordinated Time (UTC) of sunset */
// * for the given day at the given location on earth */
// * Arguments: */
// * JD : julian day */
// * latitude : latitude of observer in degrees */
// * longitude : longitude of observer in degrees */
// * Return value: */
// * time in minutes from zero Z */
// ***********************************************************************/

function calcSunsetUTC(JD, latitude, longitude)
{
    var t = calcTimeJulianCent(JD);

    // *** Find the time of solar noon at the location, and use
    // that declination. This is better than start of the
    // Julian day

    var noonmin = calcSolNoonUTC(t, longitude);
    var tnoon = calcTimeJulianCent (JD+noonmin/1440.0);

    // First calculates sunrise and approx length of day

    var eqTime = calcEquationOfTime(tnoon);
    var solarDec = calcSunDeclination(tnoon);
    var hourAngle = calcHourAngleSunset(latitude, solarDec);

    var delta = longitude - radToDeg(hourAngle);
    var timeDiff = 4 * delta;
    var timeUTC = 720 + timeDiff - eqTime;

    // first pass used to include fractional day in gamma calc

    var newt = calcTimeJulianCent(calcJDFromJulianCent(t) + timeUTC/1440.0); 
    eqTime = calcEquationOfTime(newt);
    solarDec = calcSunDeclination(newt);
    hourAngle = calcHourAngleSunset(latitude, solarDec);

    delta = longitude - radToDeg(hourAngle);
    timeDiff = 4 * delta;
    timeUTC = 720 + timeDiff - eqTime; // in minutes

    return timeUTC;
}

//***********************************************************************/
//* Name: calcZenith */
//* Type: Function */
//* Purpose: calculate the zenith of the sun */
//* for the given day at the given location on earth */
//* Arguments: */
//* JD : julian day */
//* offset : hours since midnigth */
//* latitude : latitude of observer in degrees */
//* longitude : longitude of observer in degrees */
//* Return value: */
//* zenith in degrees */
//***********************************************************************/

function calcZenith(JD, offset, latitude, longitude)
{
	var T = calcTimeJulianCent(JD + offset/24); 
	var theta = calcSunDeclination(T);
	var Etime = calcEquationOfTime(T);

	var eqTime = Etime;
	var solarDec = theta; // in degrees

	var solarTimeFix = eqTime - 4.0 * longitude;
	var trueSolarTime = offset * 60 + solarTimeFix;

	while (trueSolarTime > 1440)
	{
		trueSolarTime -= 1440;
	}

	var hourAngle = trueSolarTime / 4.0 - 180.0;
	if (hourAngle < -180) 
	{
	  hourAngle += 360.0;
	}

	var haRad = degToRad(hourAngle);

	var csz = Math.sin(degToRad(latitude)) * 
		Math.sin(degToRad(solarDec)) + 
		Math.cos(degToRad(latitude)) * 
		Math.cos(degToRad(solarDec)) * Math.cos(haRad);
	if (csz > 1.0) 
	{
		csz = 1.0;
	} else if (csz < -1.0) 
	{ 
		csz = -1.0; 
	}
	return 90 - radToDeg(Math.acos(csz));
}
