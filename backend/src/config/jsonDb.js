const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "..", "data");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function filePathFor(collection) {
  return path.join(DATA_DIR, `${collection}.json`);
}

/**
 * Ensures a collection's JSON file exists, seeding it with `defaultData` if not.
 */
function ensureCollection(collection, defaultData = []) {
  const file = filePathFor(collection);
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(defaultData, null, 2), "utf-8");
  }
}

/**
 * Reads an entire collection (array of records) from disk.
 */
function readCollection(collection) {
  const file = filePathFor(collection);
  ensureCollection(collection);
  const raw = fs.readFileSync(file, "utf-8");
  try {
    return raw.trim() ? JSON.parse(raw) : [];
  } catch (err) {
    console.error(`Failed to parse ${collection}.json, resetting to empty array.`, err);
    return [];
  }
}

/**
 * Overwrites an entire collection on disk.
 * A simple synchronous write is fine for a single-process prototype.
 */
function writeCollection(collection, data) {
  const file = filePathFor(collection);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
}

module.exports = {
  ensureCollection,
  readCollection,
  writeCollection,
};
