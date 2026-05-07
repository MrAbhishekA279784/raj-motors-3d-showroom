/**
 * Generates a minimal valid GLB (Binary glTF) file with a simple motorcycle-like mesh.
 * This is used as a placeholder for development until real assets are available.
 */

const fs = require('fs');
const path = require('path');

// A minimal valid GLB binary - basically a single textured mesh box  
// We'll create one using the minimal spec:
// A valid minimal GLB is a JSON (for the glTF structure) + BIN chunk

function buildMinimalMotorcycleGLB() {
  // Box mesh vertices (motorcycle-ish proportions: 2m long, 0.8m tall, 0.5m wide)
  const positions = new Float32Array([
    // Front face
    -1.0, -0.4, -0.25,  1.0, -0.4, -0.25,  1.0,  0.4, -0.25, -1.0,  0.4, -0.25,
    // Back face
    -1.0, -0.4,  0.25,  1.0, -0.4,  0.25,  1.0,  0.4,  0.25, -1.0,  0.4,  0.25,
    // Top face
    -1.0,  0.4, -0.25,  1.0,  0.4, -0.25,  1.0,  0.4,  0.25, -1.0,  0.4,  0.25,
    // Bottom face
    -1.0, -0.4, -0.25,  1.0, -0.4, -0.25,  1.0, -0.4,  0.25, -1.0, -0.4,  0.25,
    // Right face
     1.0, -0.4, -0.25,  1.0, -0.4,  0.25,  1.0,  0.4,  0.25,  1.0,  0.4, -0.25,
    // Left face
    -1.0, -0.4, -0.25, -1.0, -0.4,  0.25, -1.0,  0.4,  0.25, -1.0,  0.4, -0.25,
  ]);

  const indices = new Uint16Array([
    0, 1, 2,   0, 2, 3,    // front
    4, 6, 5,   4, 7, 6,    // back
    8, 9, 10,  8, 10, 11,  // top
    12, 14, 13, 12, 15, 14, // bottom
    16, 17, 18, 16, 18, 19, // right
    20, 22, 21, 20, 23, 22, // left
  ]);

  const posData = Buffer.from(positions.buffer);
  const idxData = Buffer.from(indices.buffer);

  // Pad to 4-byte alignment 
  function pad4(buf) {
    const rem = buf.length % 4;
    if (rem === 0) return buf;
    return Buffer.concat([buf, Buffer.alloc(4 - rem, 0)]);
  }

  const posDataPadded = pad4(posData);
  const idxDataPadded = pad4(idxData);

  const binBuffer = Buffer.concat([posDataPadded, idxDataPadded]);

  const gltf = {
    asset: { version: "2.0", generator: "ktm-generator" },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0, name: "motorcycle" }],
    meshes: [{
      name: "BikeBody",
      primitives: [{
        attributes: { POSITION: 0 },
        indices: 1,
        material: 0
      }]
    }],
    materials: [{
      name: "BikeMaterial",
      pbrMetallicRoughness: {
        baseColorFactor: [0.85, 0.1, 0.1, 1.0],
        metallicFactor: 0.8,
        roughnessFactor: 0.2
      }
    }],
    bufferViews: [
      { buffer: 0, byteOffset: 0, byteLength: posData.length, target: 34962 },
      { buffer: 0, byteOffset: posDataPadded.length, byteLength: idxData.length, target: 34963 }
    ],
    accessors: [
      {
        bufferView: 0, byteOffset: 0, componentType: 5126, count: 24, type: "VEC3",
        min: [-1.0, -0.4, -0.25], max: [1.0, 0.4, 0.25]
      },
      {
        bufferView: 1, byteOffset: 0, componentType: 5123, count: 36, type: "SCALAR",
        min: [0], max: [23]
      }
    ],
    buffers: [{ byteLength: binBuffer.length }]
  };

  const jsonStr = JSON.stringify(gltf);
  const jsonBuf = Buffer.from(jsonStr, 'utf-8');
  
  function padJson(buf) {
    const rem = buf.length % 4;
    if (rem === 0) return buf;
    return Buffer.concat([buf, Buffer.alloc(4 - rem, 0x20)]); // pad with spaces
  }

  const jsonPadded = padJson(jsonBuf);

  // GLB structure:
  // 12 bytes header: magic, version, totalLength
  // JSON chunk: 8 bytes header + json data
  // BIN chunk:  8 bytes header + bin data
  const totalLength = 12 + 8 + jsonPadded.length + 8 + binBuffer.length;

  const header = Buffer.alloc(12);
  header.writeUInt32LE(0x46546C67, 0); // magic: glTF
  header.writeUInt32LE(2, 4);          // version: 2
  header.writeUInt32LE(totalLength, 8); // total length

  const jsonChunkHeader = Buffer.alloc(8);
  jsonChunkHeader.writeUInt32LE(jsonPadded.length, 0);
  jsonChunkHeader.writeUInt32LE(0x4E4F534A, 4); // chunk type: JSON

  const binChunkHeader = Buffer.alloc(8);
  binChunkHeader.writeUInt32LE(binBuffer.length, 0);
  binChunkHeader.writeUInt32LE(0x004E4942, 4); // chunk type: BIN

  return Buffer.concat([header, jsonChunkHeader, jsonPadded, binChunkHeader, binBuffer]);
}

const outputPath = path.join(__dirname, 'ducati.glb');
const glbData = buildMinimalMotorcycleGLB();
fs.writeFileSync(outputPath, glbData);
console.log(`Generated GLB: ${outputPath} (${glbData.length} bytes)`);
