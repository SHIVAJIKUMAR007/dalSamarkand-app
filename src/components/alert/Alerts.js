import React, {useEffect} from 'react';
import {Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {useGlobal} from 'reactn';
import {COLORS} from '../../constants/colors';

export const ErrorAlert = () => {
  const [errorAlert, seterrorAlert] = useGlobal('errorAlert');
  useEffect(() => {
    if (errorAlert?.visible) {
      setTimeout(() => {
        seterrorAlert({message: '', visible: false});
      }, 2500);
    }
  }, [errorAlert?.visible]);
  return (
    // <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={errorAlert?.visible}
      onRequestClose={() => {
        seterrorAlert({message: '', visible: false});
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={[styles.modalText, {color: COLORS.RED}]}>Error!</Text>
          <Text style={styles.modalText2}>{errorAlert?.message}</Text>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => seterrorAlert({message: '', visible: false})}>
            <Text style={styles.textStyle}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
    // </View>
  );
};

export const SuccessAlert = () => {
  const [successAlert, setsuccessAlert] = useGlobal('successAlert');
  useEffect(() => {
    if (successAlert?.visible) {
      setTimeout(() => {
        setsuccessAlert({message: '', visible: false});
      }, 2500);
    }
  }, [successAlert?.visible]);
  return (
    // <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={successAlert?.visible}
      onRequestClose={() => {
        setsuccessAlert({message: '', visible: false});
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={[styles.modalText, {color: COLORS.GREEN}]}>Success</Text>
          <Text style={styles.modalText2}>{successAlert?.message}</Text>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setsuccessAlert({message: '', visible: false})}>
            <Text style={styles.textStyle}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
    // </View>
  );
};

export const WarnAlert = () => {
  const [warnAlert, setwarnAlert] = useGlobal('warnAlert');
  useEffect(() => {
    if (warnAlert?.visible) {
      setTimeout(() => {
        setwarnAlert({message: '', visible: false});
      }, 2500);
    }
  }, [warnAlert?.visible]);
  return (
    // <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={warnAlert?.visible}
      onRequestClose={() => {
        setwarnAlert({message: '', visible: false});
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={[styles.modalText, {color: COLORS.YELLOW}]}>
            Hey Wait
          </Text>
          <Text style={styles.modalText2}>{warnAlert?.message}</Text>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setwarnAlert({message: '', visible: false})}>
            <Text style={styles.textStyle}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 17,
    textAlign: 'center',
  },
  modalText2: {
    marginBottom: 14,
    textAlign: 'center',
  },
});
