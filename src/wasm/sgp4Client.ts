const BYTES_PER_FLOAT = 8;
const BYTES_PER_INT = 4;

// @ts-ignore
import Module from "@/wasm/sgp4"

//see satpos.h for more details
const create_geodetic_wasm = (module:any) => module._malloc(40); //(10 * 4)
const set_geodetic_wasm = (module:any, ptr:any, lat:number, lon:number, alt:number, theta:number) => module.HEAPF64.set(new Float64Array([lat, lon, alt, theta]), ptr / 8);

//see satpos.h for more details
const create_obs_set_wasm = (module:any) => module._malloc(40); //(10 * 4)
const set_obs_set_t = (module:any, ptr:any, az:number, el:number, range:number, range_rate:number) => module.HEAPF64.set(new Float64Array([az, el, range, range_rate]), ptr / 8);

//see satpos.h for more details
const create_tle_wasm = (module:any) => module._malloc(107); //(10 * 8) + (1 * 2) + (25 * 1) = 80+2+25 = 107
const set_tle_wasm = (module:any,
                      ptr:any,
                      epoch:number,
                      xndt2o:number,
                      xndd6o:number,
                      bstar:number,
                      xincl:number,
                      xnodeo:number,
                      eo:number,
                      omegao:number,
                      xmo:number,
                      xno:number,
                      catnr:number,
                      sat_name:string,
) => {

    module.HEAPF64.set(new Float64Array([epoch, xndt2o, xndd6o, bstar, xincl, xnodeo, eo, omegao, xmo, xno]), ptr / BYTES_PER_FLOAT);
    ptr += (10 * BYTES_PER_FLOAT);

    module.setValue(ptr, catnr, "i32");
    ptr += BYTES_PER_INT;

    module.stringToUTF8(sat_name, ptr, 25);
};

let module:any = null;

interface Geodetic{
    lat:number;    /*!< Lattitude [rad] */
    lon:number;    /*!< Longitude [rad] */
    alt:number;    /*!< Altitude [km]? */
    theta:number;
}
interface Tle{
    epoch:number;            /*!< Epoch Time in NORAD TLE format YYDDD.FFFFFFFF */
    xndt2o:number;           /*!< 1. time derivative of mean motion */
    xndd6o:number;           /*!< 2. time derivative of mean motion */
    bstar:number;            /*!< Bstar drag coefficient. */
    xincl:number;            /*!< Inclination */
    xnodeo:number;           /*!< R.A.A.N. */
    eo:number;               /*!< Eccentricity */
    omegao:number;           /*!< argument of perigee */
    xmo:number;              /*!< mean anomaly */
    xno:number;              /*!< mean motion */
    catnr:number;            /*!< Catalogue Number.  */
    name:string;     /*!< Satellite name string. */
}
interface SatelliteLookAngel{
    az: number,
    el: number,
    range: number,
    range_rate: number,
}
export const calculate_sgp4 = async (tle:Tle, geodetic:Geodetic, time:number):Promise<SatelliteLookAngel> => {
    if (module === null) {
        module = await Module();
    }

    const tle_wasm = create_tle_wasm(module);
    const geodetic_wasm = create_geodetic_wasm(module);
    const result = create_obs_set_wasm(module);

    set_tle_wasm(module,
        tle_wasm,
        tle.epoch,
        tle.xndt2o,
        tle.xndd6o,
        tle.bstar,
        tle.xincl,
        tle.xnodeo,
        tle.eo,
        tle.omegao,
        tle.xmo,
        tle.xno,
        tle.catnr,
        tle.name);

    set_geodetic_wasm(module,
        geodetic_wasm,
        geodetic.lat,
        geodetic.lon,
        geodetic.alt,
        geodetic.theta);

    set_obs_set_t(module, result, 0, 0, 0, 0);

    module._sgp4(tle_wasm, geodetic_wasm, time, result);

    const resultArray = new Float64Array(module.HEAPF64.buffer, result, 4);

    const returnValue = {az: resultArray[0], el: resultArray[1], range: resultArray[2], range_rate: resultArray[3]};

    module._free(geodetic_wasm);
    module._free(result);
    module._free(tle_wasm);

    return returnValue;
};