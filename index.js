async function main() {
  const { instance } = await WebAssembly.instantiateStreaming(
    fetch("./dist/graphics.wasm"), {}
  );
  const width = 600;
  const height = 600;

  // WASM implementation
  const canvas = document.getElementById("demo-canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  draw_wasm(instance, ctx, width, height)

  // JS implementation using fillRect
  const canvas2 = document.getElementById("demo-canvas-2");
  canvas2.width = width
  canvas2.height = height
  const ctx2 = canvas2.getContext("2d")

  draw_js(ctx2, width, height)
}

function draw_wasm(instance, ctx, width, height) {
  const buffer_address = instance.exports.BUFFER.value; // here
  const image = new ImageData(
      new Uint8ClampedArray(
          instance.exports.memory.buffer, //here
          buffer_address,
          4 * width * height,
      ),
      width,
  );

  instance.exports.go(); // here

  ctx.putImageData(image, 0, 0);
}

function draw_js(ctx2, width, height) {
  ctx2.fillStyle = 'blue'
  ctx2.fillRect(0, 0, width/2, height)

  ctx2.fillStyle = 'red'
  ctx2.fillRect(width/2, 0, width/2, height)
}

main().catch((err) => {throw err})
