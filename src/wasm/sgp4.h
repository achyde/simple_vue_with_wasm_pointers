#ifndef SGP4_H
#define SGP4_H

typedef struct
{
    double epoch;            /*!< Epoch Time in NORAD TLE format YYDDD.FFFFFFFF */
    double xndt2o;           /*!< 1. time derivative of mean motion */
    double xndd6o;           /*!< 2. time derivative of mean motion */
    double bstar;            /*!< Bstar drag coefficient. */
    double xincl;            /*!< Inclination */
    double xnodeo;           /*!< R.A.A.N. */
    double eo;               /*!< Eccentricity */
    double omegao;           /*!< argument of perigee */
    double xmo;              /*!< mean anomaly */
    double xno;              /*!< mean motion */

    int    catnr;            /*!< Catalogue Number.  */
    char   name[25];     /*!< Satellite name string. */
} tle_t;

typedef struct
{
    double lat;    /*!< Lattitude [rad] */
    double lon;    /*!< Longitude [rad] */
    double alt;    /*!< Altitude [km]? */
    double theta;
} geodetic_t;

typedef struct
{
    double az;            /*!< Azimuth [deg] */
    double el;            /*!< Elevation [deg] */
    double range;         /*!< Range [km] */
    double range_rate;    /*!< Velocity [km/sec] */
} look_angle_t;

int sgp4 (tle_t *ephem, geodetic_t *observer, double time, look_angle_t *look_angle);

#endif
