clang --target=wasm32 -O2 -nostdlib -Wl,--no-entry -Wl,--export-all -o bare_metal_wasm.wasm graphics.c
