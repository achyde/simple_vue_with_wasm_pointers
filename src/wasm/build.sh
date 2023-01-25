docker run --rm -v $(pwd):/src -u $(id -u):$(id -g) emscripten/emsdk emcc sgp4.c -o sgp4.js  -s EXPORTED_RUNTIME_METHODS='["cwrap", "getValue", "setValue", "stringToUTF8"]' -s EXPORT_ES6=1 -s MODULARIZE=1 -s USE_ES6_IMPORT_META=0 -s EXPORTED_FUNCTIONS='["_sgp4", "_malloc", "_free"]' -O3
mv sgp4.wasm ../../public/sgp4.wasm
