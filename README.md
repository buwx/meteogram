# Meteogram
Meteogram for DWD MOSMIX forecast stations

TODO:

```
# get the latest MOSMIX data from the DWD OpenData server
wget -N -P data https://opendata.dwd.de/weather/local_forecasts/mos/MOSMIX_S_LATEST_240.kmz

# filter stations (only german stations with id=10*
zcat data/MOSMIX_S_LATEST_240.kmz | xsltproc --stringparam station "${STATION}" \
    mos-filter10.xsl - > data/MOSMIX_S_LATEST_240-de.kml

# run the xsl transformation with the specified station parameters
STATION=10738
TITLE=Stuttgart/Echterdingen
TITLE_SHORT=Stuttgart/Echt.

cat data/MOSMIX_S_LATEST_240-de.kml | xsltproc --stringparam station "${STATION}" \
    --stringparam title "${TITLE}" --stringparam titleShort "${TITLE_SHORT}" \
    mos-json.xsl - > data/${STATION}.json

# change mosmix_url to 'data/10738.json' and view meteogram.html
```

For more information see the service description on https://www.dwd.de/DE/leistungen/opendata/neuigkeiten/opendata_mar2018_01.html or my weather page https://buwx.de
