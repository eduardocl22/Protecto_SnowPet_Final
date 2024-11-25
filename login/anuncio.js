import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AnunciosContext } from '../AnunciosContext';

const Item = ({ item, onLike, onAddComment }) => {
  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      onAddComment(item.id, comment);
      setComment('');
    }
  };

  const renderStatusIcon = () => {
    if (item.status === 'Perdido') {
      return <Icon name="error" size={30} color="red" style={styles.statusIcon} />;
    } else if (item.status === 'Encontrado') {
      return <Icon name="check-circle" size={30} color="green" style={styles.statusIcon} />;
    }
  };

  return (
    <View style={styles.item}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
        {renderStatusIcon()}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.type} - {item.status}</Text>
      </View>
      <View style={styles.interactionContainer}>
        <TouchableOpacity onPress={() => onLike(item.id)}>
          <Icon name="thumb-up" size={24} color="blue" />
          <Text>{item.likes}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.commentsContainer}>
        <FlatList
          data={item.comments}
          renderItem={({ item }) => <Text style={styles.comment}>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
        <TextInput
          style={styles.commentInput}
          placeholder="Añadir un comentario..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.addCommentButton} onPress={handleAddComment}>
          <Icon name="send" size={20} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MascotasPerdidasEncontradas = ({ navigation }) => {
  const { data, handleLike, handleAddComment } = useContext(AnunciosContext);

  const renderItem = ({ item }) => (
    <Item item={item} onLike={handleLike} onAddComment={handleAddComment} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mascotas Perdidas y Encontradas</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* Barra inferior */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => navigation.navigate('GPS')}
        >
          <Icon name="my-location" size={25} color="#fff" />
          <Text style={styles.bottomButtonText}>GPS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => navigation.navigate('Consejos')}
        >
          <Icon name="pets" size={25} color="#fff" />
          <Text style={styles.bottomButtonText}>Consejos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  statusIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  interactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  commentsContainer: {
    marginTop: 10,
  },
  comment: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addCommentButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#007bff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
  },
  bottomButton: {
    alignItems: 'center',
  },
  bottomButtonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
});

export default MascotasPerdidasEncontradas;
