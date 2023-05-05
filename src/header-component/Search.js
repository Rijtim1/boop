import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { db } from '../firebase';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const snapshot = await db
        .ref('items')
        .orderByChild('name')
        .startAt(searchTerm)
        .endAt(`${searchTerm}\uf8ff`)
        .once('value');

      const items = snapshot.val();
      if (items) {
        const results = Object.keys(items).map((key) => ({
          id: key,
          ...items[key],
        }));
        setSearchResults(results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative text-gray-400 focus-within:text-gray-600">
      <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-2">
        <FaSearch className="h-5 w-5" />
      </div>
      <input
        id="search"
        className="block w-full bg-gray-700 focus:ring-0 focus:border-gray-500 rounded-full pl-8 py-2 text-sm placeholder-gray-400"
        placeholder="Search"
        type="search"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      {searchResults.length > 0 && (
        <ul className="absolute z-10 w-full bg-gray-700 py-2 mt-1 rounded-lg">
          {searchResults.map((item) => (
            <li key={item.id} className="px-4 py-2">
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
