type CouchDocument = {
  _id: string;
  _rev?: string;
};

// Maps a CouchDB document to the `id`-based shape the frontend expects, hiding `_rev`.
export function toClientDoc<T extends CouchDocument>(
  doc: T,
): Omit<T, "_id" | "_rev"> & { id: string } {
  const { _id, _rev, ...rest } = doc;

  return { id: _id, ...rest };
}
