async function main() {
  const { instance } = await WebAssembly.instantiateStreaming(
    fetch("./dist/graphics.wasm"), {}
  );
  const width = 600;
  const height = 600;

  const canvas = document.getElementById("demo-canvas");
  canvas.width = width;
  canvas.height = height;

  const buffer_address = instance.exports.BUFFER.value; // here
  const image = new ImageData(
      new Uint8ClampedArray(
          instance.exports.memory.buffer, //here
          buffer_address,
          4 * width * height,
      ),
      width,
  );

  const ctx = canvas.getContext("2d");

  instance.exports.go(); // here

  ctx.putImageData(image, 0, 0);
}

main().catch((err) => {throw err})
