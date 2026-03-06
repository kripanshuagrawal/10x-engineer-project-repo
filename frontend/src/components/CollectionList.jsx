import { useEffect, useState } from 'react';
import { getCollections, deleteCollection } from '../services/collectionService';

export default function CollectionList({ onEdit, onSelect }) {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    getCollections().then(res => {
      const data = res.data;
      // Handle both array and { collections: [...] } response shapes
      setCollections(Array.isArray(data) ? data : data.collections || []);
    });
  }, []);

  const handleDelete = async (id) => {
    await deleteCollection(id);
    setCollections(collections.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-3">
      {collections.length === 0 && (
        <p className="text-gray-500">No collections yet. Create one above!</p>
      )}
      {collections.map(col => (
        <div key={col.id} className="border p-4 rounded flex justify-between items-center">
          <span className="font-medium cursor-pointer" onClick={() => onSelect(col)}>{col.name}</span>
          <div className="flex gap-2">
            <button onClick={() => onEdit(col)} className="bg-yellow-400 text-white px-3 py-1 rounded">Edit</button>
            <button onClick={() => handleDelete(col.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
