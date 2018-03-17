library(suncalc)
library(corrplot)
library(MASS)

setwd("R/dwd")

set.seed(1023)
weather_data <- read.csv("dwd.csv", header = TRUE, sep = ";")
colnames(weather_data)
(n <- nrow(weather_data))
weather_data$date <- as.POSIXct(weather_data$date,format='%Y-%m-%d %H:%M:%S', tz='UTC')
c(as.character(weather_data$date[1]), as.character(weather_data$date[n]))

dftt = data.frame(diff1 = numeric(n))
dftt$diff1 <- weather_data$tt - weather_data$dwd_tt
dftt$sun_pos <- getSunlightPosition(weather_data$date-3*30*60, lat = 48.68, lon = 9.22)$altitude * 180/pi
dftt$dwd_n <- weather_data$dwd_n
dftt$diff_td <- weather_data$dwd_tt - weather_data$dwd_td
dftt$dwd_ff <- weather_data$dwd_ff

factor_vars <- names(which(sapply(dftt, class) == "factor"))
numeric_vars <- setdiff(colnames(dftt), factor_vars)
numeric_vars_mat <- as.matrix(dftt)
numeric_vars_cor <- cor(numeric_vars_mat)
corrplot(numeric_vars_cor)

# fit1 <- lm(diff1 ~ dwd_ff + sun_pos + diff_td + dwd_n, data=dftt)

fit1 <- glm(diff1 ~ ., data=dftt)
step <- stepAIC(fit1, direction="both")
step

# Call:  glm(formula = diff1 ~ sun_pos + dwd_n + diff_td + dwd_ff, data = dftt)
#
# Coefficients:
# (Intercept)      sun_pos        dwd_n      diff_td       dwd_ff  
#     -1.3731       0.0137       0.0942       0.0183       0.0445  
#
# Degrees of Freedom: 26099 Total (i.e. Null);  26095 Residual
# Null Deviance:	    37800 
# Residual Deviance: 25000 	AIC: 72900

dttd = data.frame(diff2 = numeric(n))
dttd$diff2 <- weather_data$td - weather_data$dwd_td
dttd$sun_pos <- getSunlightPosition(weather_data$date-3*30*60, lat = 48.68, lon = 9.22)$altitude * 180/pi
dttd$dwd_n <- weather_data$dwd_n
dttd$diff_td <- weather_data$dwd_tt - weather_data$dwd_td
dttd$dwd_ff <- weather_data$dwd_ff

factor_vars <- names(which(sapply(dttd, class) == "factor"))
numeric_vars <- setdiff(colnames(dttd), factor_vars)
numeric_vars_mat <- as.matrix(dttd)
numeric_vars_cor <- cor(numeric_vars_mat)
corrplot(numeric_vars_cor)

# fit_td <- lm(diff2 ~ dwd_ff + sun_pos + diff_td + dwd_n, data=dttd)

fit2 <- glm(diff2 ~ ., data=dttd)
step <- stepAIC(fit2, direction="both")
step

# Call:  glm(formula = diff_td ~ dwd_n + diff_tt + dwd_ff, data = dttd)
#
# Coefficients:
# (Intercept)        dwd_n      diff_tt       dwd_ff  
#    -0.50521      0.08313      0.11188      0.01186  
#
# Degrees of Freedom: 26099 Total (i.e. Null);  26096 Residual
# Null Deviance:	    23150 
# Residual Deviance: 16860 	AIC: 62670
