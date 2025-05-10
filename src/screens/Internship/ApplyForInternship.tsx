import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DocumentPicker from 'react-native-document-picker';

interface ApplyFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; cv: any }) => void;
  internshipId: string;
}

const ApplyForInternship: React.FC<ApplyFormProps> = ({ visible, onClose, onSubmit, internshipId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cv, setCv] = useState<any>(null);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setCv(result[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        Alert.alert('Error picking document');
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (cv) {
        formData.append('cv', {
          uri: cv.uri,
          name: cv.name,
          type: cv.type || 'application/pdf',
        });
      }

      const response = await fetch(`http://10.0.2.2:8080/api/applications/internships/${internshipId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert('Application submitted successfully!');
        onSubmit({ name, email, cv });
        setName('');
        setEmail('');
        setCv(null);
        onClose();
      } else {
        Alert.alert('Failed to submit application.');
      }
    } catch (error) {
      Alert.alert('An error occurred. Please try again.');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <View style={styles.formContainer}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Add Resume</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Icon name="x" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContent}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex. Said"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex.Said@gmail.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Add CV</Text>
                <TouchableOpacity 
                  style={styles.uploadContainer} 
                  onPress={handlePickDocument}
                >
                  {cv ? (
                    <View style={styles.fileSelected}>
                      <Icon name="file" size={24} color="#0066ff" />
                      <Text style={styles.fileName} numberOfLines={1}>
                        {cv.name}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.uploadContent}>
                      <Icon name="file" size={24} color="#0066ff" />
                      <Text style={styles.uploadText}>Upload CV</Text>
                    </View>
                  )}
                </TouchableOpacity>
                <Text style={styles.uploadHint}>
                  Upload files in PDF format up to 5 MB. You can upload it once and you can use it in your next application.
                </Text>
              </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={onClose}
              >
                <Text style={styles.cancelButtonText}>cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.saveButton} 
                onPress={handleSubmit}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  keyboardAvoid: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  formContent: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  uploadContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    color: '#0066ff',
    marginTop: 8,
    fontSize: 16,
  },
  fileSelected: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileName: {
    marginLeft: 8,
    color: '#0066ff',
    fontSize: 16,
  },
  uploadHint: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#0066ff',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ApplyForInternship;