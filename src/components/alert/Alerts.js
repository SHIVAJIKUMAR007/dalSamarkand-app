import React, {useEffect} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useGlobal} from 'reactn';
import {COLORS} from '../../constants/colors';
import {Snackbar} from 'react-native-paper';
export const ErrorAlert = () => {
  const [errorAlert, seterrorAlert] = useGlobal('errorAlert');
  useEffect(() => {
    if (errorAlert?.visible) {
      setTimeout(
        () => {
          seterrorAlert({message: '', visible: false});
        },
        errorAlert?.duration ? errorAlert?.duration : 2500,
      );
    }
  }, [errorAlert?.visible]);
  return (
    // <View style={styles.centeredView}>
    <Snackbar
      visible={errorAlert?.visible ? errorAlert?.visible : false}
      duration={errorAlert?.duration ? errorAlert?.duration : 2500}
      style={{backgroundColor: 'red'}}
      onDismiss={() => {
        seterrorAlert({message: '', visible: false});
      }}
      action={{
        label: 'X',
        onPress: () => {
          seterrorAlert({message: '', visible: false});
        },
      }}>
      {errorAlert?.message}
    </Snackbar>
    // <Modal
    //   animationType="slide"
    //   transparent={true}
    //   visible={errorAlert?.visible ? errorAlert?.visible : false}
    //   onRequestClose={() => {
    //     seterrorAlert({message: '', visible: false});
    //   }}>
    //   <View style={styles.centeredView}>
    //     <View style={[styles.modalView, , {backgroundColor: COLORS.RED}]}>
    //       {/* <Text style={[styles.modalText, {color: COLORS.RED}]}>Error!</Text> */}
    //       <Text style={styles.modalText2}>{errorAlert?.message}</Text>

    //       {/* <TouchableOpacity
    //         style={[styles.button, styles.buttonClose]}
    //         onPress={() => seterrorAlert({message: '', visible: false})}>
    //         <Text style={styles.textStyle}>OK</Text>
    //       </TouchableOpacity> */}
    //     </View>
    //   </View>
    // </Modal>
    // </View>
  );
};

export const SuccessAlert = () => {
  const [successAlert, setsuccessAlert] = useGlobal('successAlert');
  useEffect(() => {
    if (successAlert?.visible) {
      setTimeout(
        () => {
          setsuccessAlert({message: '', visible: false});
        },
        successAlert?.duration ? successAlert?.duration : 2500,
      );
    }
  }, [successAlert?.visible]);
  return (
    // <View style={styles.centeredView}>
    <Snackbar
      visible={successAlert?.visible ? successAlert?.visible : false}
      duration={successAlert?.duration ? successAlert?.duration : 2500}
      style={{backgroundColor: '#198754'}}
      onDismiss={() => {
        setsuccessAlert({message: '', visible: false});
      }}
      action={{
        label: 'X',
        onPress: () => {
          setsuccessAlert({message: '', visible: false});
        },
      }}>
      {successAlert?.message}
    </Snackbar>
    // <Modal
    //   animationType="slide"
    //   transparent={true}
    //   visible={successAlert?.visible ? successAlert?.visible : false}
    //   onRequestClose={() => {
    //     setsuccessAlert({message: '', visible: false});
    //   }}>
    //   <View style={styles.centeredView}>
    //     <View style={[styles.modalView, {backgroundColor: COLORS.GREEN}]}>
    //       {/* <Text style={[styles.modalText, {color: COLORS.GREEN}]}>Success</Text> */}
    //       <Text style={styles.modalText2}>{successAlert?.message}</Text>

    //       {/* <TouchableOpacity
    //         style={[styles.button, styles.buttonClose]}
    //         onPress={() => setsuccessAlert({message: '', visible: false})}>
    //         <Text style={styles.textStyle}>OK</Text>
    //       </TouchableOpacity> */}
    //     </View>
    //   </View>
    // </Modal>
    // </View>
  );
};

export const WarnAlert = () => {
  const [warnAlert, setwarnAlert] = useGlobal('warnAlert');
  useEffect(() => {
    if (warnAlert?.visible) {
      setTimeout(
        () => {
          setwarnAlert({message: '', visible: false});
        },
        warnAlert?.duration ? warnAlert?.duration : 2500,
      );
    }
  }, [warnAlert?.visible]);
  return (
    // <View style={styles.centeredView}>
    <Snackbar
      visible={warnAlert?.visible ? warnAlert?.visible : false}
      duration={warnAlert?.duration ? warnAlert?.duration : 2500}
      style={{backgroundColor: '#FFC107'}}
      onDismiss={() => {
        setwarnAlert({message: '', visible: false});
      }}
      action={{
        label: 'X',
        onPress: () => {
          setwarnAlert({message: '', visible: false});
        },
      }}>
      {warnAlert?.message}
    </Snackbar>
    // <Modal
    //   animationType="slide"
    //   transparent={true}
    //   visible={warnAlert?.visible ? warnAlert?.visible : false}
    //   onRequestClose={() => {
    //     setwarnAlert({message: '', visible: false});
    //   }}>
    //   <View style={styles.centeredView}>
    //     <View style={[styles.modalView, {backgroundColor: COLORS.YELLOW}]}>
    //       {/* <Text style={[styles.modalText, {color: COLORS.SECONDARY}]}>
    //         Hey Wait
    //       </Text> */}
    //       <Text style={styles.modalText2}>{warnAlert?.message}</Text>

    //       {/* <TouchableOpacity
    //         style={[styles.button, styles.buttonClose]}
    //         onPress={() => setwarnAlert({message: '', visible: false})}>
    //         <Text style={styles.textStyle}>OK</Text>
    //       </TouchableOpacity> */}
    //     </View>
    //   </View>
    // </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
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
    borderRadius: 10,
    width: 55,
    paddingVertical: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    fontSize: 16,
  },
  modalText: {
    // marginBottom: 15,
    fontSize: 24,
    textAlign: 'center',
  },
  modalText2: {
    // marginBottom: 14,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
});

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     borderRadius: 10,
//     // padding: 15,
//     width: 55,
//     paddingVertical: 10,

//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//     backgroundColor: '#2196F3',
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontSize: 16,
//   },
//   modalText: {
//     marginBottom: 15,
//     fontSize: 24,
//     textAlign: 'center',
//   },
//   modalText2: {
//     marginBottom: 14,
//     fontSize: 15,
//     textAlign: 'center',
//   },
// });
