import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AnunciosContext } from '../AnunciosContext';

const data = [
  {
    id: '1',
    title: 'Consejo para el cuidado de la piel',
    description: 'Es importante proteger la piel de tu mascota del sol. Utiliza protectores solares específicos para animales y manténlos en la sombra durante las horas más calurosas del día.',
    image: require('../assets/consejo1.png'),
  },
  {
    id: '2',
    title: 'Alimentación equilibrada',
    description: 'Proporciona a tu mascota una dieta equilibrada y adecuada a su edad y tamaño. Consulta con un veterinario para determinar las porciones adecuadas y los alimentos más recomendables.',
    image: require('../assets/consejo2.png'),
  },
  {
    id: '3',
    title: 'Actividad física regular',
    description: 'Asegúrate de que tu mascota tenga suficiente ejercicio diario para mantenerse sana y en forma. Elige actividades que sean adecuadas para su raza y nivel de energía.',
    image: require('../assets/consejo3.jpg'),
  },
  {
    id: '4',
    title: 'Higiene dental',
    description: 'Cuida los dientes de tu mascota cepillándolos regularmente con un cepillo de dientes y pasta especial para animales. Esto ayuda a prevenir problemas dentales y mantener un aliento fresco.',
    image: require('../assets/consejo4.png'),
  },
];

const ConsejoItem = ({ item }) => {
  const [comment, setComment] = useState('');
  const { handleLike, handleAddComment } = useContext(AnunciosContext);

  const handleAddCommentPress = () => {
    if (comment.trim() !== '') {
      handleAddComment(item.id, comment);
      setComment('');
    }
  };

  return (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.interactionContainer}>
        <View style={styles.leftInteraction}>
          <TouchableOpacity onPress={() => handleLike(item.id)}>
            <Icon name="thumb-up" size={24} color="blue" />
          </TouchableOpacity>
          <View style={styles.commentContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Añadir un comentario..."
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleAddCommentPress}>
              <Icon name="send" size={20} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const Consejos = () => {
  const renderItem = ({ item }) => <ConsejoItem item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 16,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  interactionContainer: {
    marginTop: 10,
  },
  leftInteraction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});

export default Consejos;

