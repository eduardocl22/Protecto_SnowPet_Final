import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Modal, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AnunciosContext } from '../AnunciosContext';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const { height } = Dimensions.get('window');

const Item = ({ item, onLike, onAddComment }) => {
  const [comment, setComment] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      const isUserRegistered = false;

      if (!isUserRegistered) {
        setModalVisible(true);
      } else {
        onAddComment(item.id, comment);
        setComment('');
      }
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
        <View style={styles.commentInputContainer}>
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
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Animatable.View animation="bounceIn" duration={1500} style={styles.animatableContainer}>
              <Icon name="warning" size={50} color="orange" />
              <Text style={styles.modalTitle}>Necesitas Registrarte</Text>
              <Text style={styles.modalText}>
                Debes estar registrado para interactuar con otros usuarios
              </Text>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('Registro');
                }}
              >
                <Text style={styles.registerButtonText}>Registrarse</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const MascotasPerdidasEncontradas = () => {
  const { data, handleLike, handleAddComment } = useContext(AnunciosContext);
  const navigation = useNavigation();

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
      <TouchableOpacity style={styles.fixedButton} onPress={() => navigation.navigate('Consejos')}>
        <Icon name="pets" size={20} color="#fff" />
        <Text style={styles.optionText}>Consejos</Text>
      </TouchableOpacity>
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
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  addCommentButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatableContainer: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  fixedButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#007bff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 5,
  },
});

export default MascotasPerdidasEncontradas;

