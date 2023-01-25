#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#include "sgp4.h"

int sgp4 (tle_t *ephem, geodetic_t *observer, double time, look_angle_t *look_angle)
{
    fprintf(stderr,"ephem.epoch => %f\n", ephem->epoch);
    fprintf(stderr,"ephem.xndt2o => %f\n", ephem->xndt2o);
    fprintf(stderr,"ephem.xndd6o => %f\n", ephem->xndd6o);
    fprintf(stderr,"ephem.bstar => %f\n", ephem->bstar);
    fprintf(stderr,"ephem.xincl => %f\n", ephem->xincl);
    fprintf(stderr,"ephem.xnodeo => %f\n", ephem->xnodeo);
    fprintf(stderr,"ephem.eo => %f\n", ephem->eo);
    fprintf(stderr,"ephem.omegao => %f\n", ephem->omegao);
    fprintf(stderr,"ephem.xmo => %f\n", ephem->xmo);
    fprintf(stderr,"ephem.xno => %f\n", ephem->xno);
    fprintf(stderr,"ephem.catnr => %d\n", ephem->catnr);
    fprintf(stderr,"ephem.name => %s\n", ephem->name);

    fprintf(stderr,"observer.lat => %f\n", observer->lat);
    fprintf(stderr,"observer.lon => %f\n", observer->lon);
    fprintf(stderr,"observer.alt => %f\n", observer->alt);
    fprintf(stderr,"observer.theta => %f\n", observer->theta);

    fprintf(stderr,"time => %f\n", time);

    look_angle->az = ephem->xndt2o;
    look_angle->el = ephem->xndd6o;
    look_angle->range = 100.55;
    look_angle->range_rate = 0.33;

    return 0;
}