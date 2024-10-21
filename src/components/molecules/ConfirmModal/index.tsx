import { Button, Typography } from '@components/atoms';
import { Modal, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export interface IConfirmModalProps {
  showConfirmModal: boolean;
  setShowConfirmModal: (value: boolean) => void;
  handleDelete: () => void;
  variantMessage?: string;
}

export const ConfirmModal = ({
  showConfirmModal,
  setShowConfirmModal,
  handleDelete,
  variantMessage,
}: IConfirmModalProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <Modal
      visible={showConfirmModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowConfirmModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Typography style={styles.modalTitle}>Confirmar Deleção</Typography>
          <Typography style={styles.modalMessage}>
            Tem certeza que deseja excluir o cliente {variantMessage}?
          </Typography>
          <View style={styles.modalButtons}>
            <Button
              content="Cancelar"
              variant="text"
              onPress={() => setShowConfirmModal(false)}
            />
            <Button content="Excluir" variant="text" onPress={handleDelete} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const stylesheet = createStyleSheet(theme => ({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  numericInput: {
    borderWidth: 1,
    borderColor: theme.colors.halfColor,
    borderRadius: 4,
    marginLeft: 10,
    padding: 5,
    width: 50,
    textAlign: 'center',
  },
  containerPerPage: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    justifyContent: 'space-between',
    width: '100%',
  },
}));
