import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: 'blue',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  optionsContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  optionsScrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: 'green',
    padding: 15,
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  publishButton: {
    backgroundColor: 'blue',
    padding: 15,
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
