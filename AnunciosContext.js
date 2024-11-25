import React, { createContext, useState } from 'react';

const AnunciosContext = createContext();

const initialData = [
  { id: '1', name: 'Rocky', type: 'Perro', status: 'Perdido', image: require('./assets/rockie.jpg'), likes: 0, comments: [] },
  { id: '2', name: 'Mishi', type: 'Gato', status: 'Encontrado', image: require('./assets/mishi.jpg'), likes: 0, comments: [] },
  { id: '3', name: 'Max', type: 'Perro', status: 'Perdido', image: require('./assets/max.jpg'), likes: 0, comments: [] },
  { id: '4', name: 'Garfield', type: 'Gato', status: 'Encontrado', image: require('./assets/garfield.jpg'), likes: 0, comments: [] },
];

const AnunciosProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

  const handleLike = (id) => {
    const newData = data.map(item => {
      if (item.id === id) {
        return { ...item, likes: item.likes + 1 };
      }
      return item;
    }).sort((a, b) => b.likes - a.likes); // Ordenar por likes de mayor a menor
    setData(newData);
  };

  const handleAddComment = (id, comment) => {
    const newData = data.map(item => {
      if (item.id === id) {
        return { ...item, comments: [...item.comments, comment] };
      }
      return item;
    });
    setData(newData);
  };

  return (
    <AnunciosContext.Provider value={{ data, handleLike, handleAddComment }}>
      {children}
    </AnunciosContext.Provider>
  );
};

export { AnunciosContext, AnunciosProvider };
