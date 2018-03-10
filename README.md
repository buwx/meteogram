# Meteogram
Meteogram for DWD MOSMIX forecast data

TODO:

```
# get the latest MOSMIX data from the DWD OpenData server
wget -N -P data https://opendata.dwd.de/weather/local_forecasts/mos/MOSMIX_S_LATEST_240.kmz

# run the xsl transformation with the specified parameters
STATION=10738
TITLE=Stuttgart/Echterdingen
TITLE_SHORT=Stuttgart/Echt.
LON=9.22
LAT=48.68

zcat data/MOSMIX_S_LATEST_240.kmz | xsltproc --stringparam station "${STATION}" --stringparam title "${TITLE}" \
    --stringparam titleShort "${TITLE_SHORT}" --stringparam lon "${LON}" \
    --stringparam lat "${LAT}" mos-json.xsl - > data/${STATION}.json

# view meteogram.html
```

For more information see the service description on https://www.dwd.de/DE/leistungen/opendata/neuigkeiten/opendata_mar2018_01.html or my weather page https://buwx.de
