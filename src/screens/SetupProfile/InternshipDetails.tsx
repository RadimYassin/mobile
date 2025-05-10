
import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView, StatusBar } from "react-native"
import type { StackNavigationProp } from "@react-navigation/stack"
import Icon from "react-native-vector-icons/MaterialIcons"
import CheckBox from "@react-native-community/checkbox"
import { RootStackParamList } from "../../types/RootStackParamList"
import DateTimePicker from '@react-native-community/datetimepicker';

type SetupProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Internship_Experience_Details">

type Props = {
    navigation: SetupProfileScreenNavigationProp
}

const  InternshipDetails: React.FC<Props> = ({ navigation }) => {
    const [industryType, setIndustryType] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [location, setLocation] = useState("")
    const [internshipType, setInternshipType] = useState("")
    const [jobTitle, setJobTitle] = useState("Ex: Designer")
    const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false)
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
        const [showFromDatePicker, setShowFromDatePicker] = useState(false);
        const [showToDatePicker, setShowToDatePicker] = useState(false);
    const [description, setDescription] = useState("")

    const navigateToIndustrySelection = () => {
        navigation.navigate("IndustrySelection")
    }

    const navigateToInternshipType = () => {
        navigation.navigate("InternshipType")
    }
        const onChangeFromDate = (event: any, selectedDate: Date | undefined) => {
                const currentDate = selectedDate || fromDate;
                setShowFromDatePicker(false);
                setFromDate(currentDate);
        };

        const onChangeToDate = (event: any, selectedDate: Date | undefined) => {
                const currentDate = selectedDate || toDate;
                setShowToDatePicker(false);
                setToDate(currentDate);
        };

        const showFromDatepicker = () => {
                setShowFromDatePicker(true);
        };

        const showToDatepicker = () => {
                setShowToDatePicker(true);
        };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    <View style={[styles.progress, { width: "30%" }]} />
                </View>
            </View>

            <ScrollView style={styles.scrollView}>
                <Text style={styles.sectionTitle}>Company Details</Text>

                <TouchableOpacity style={styles.inputContainer} onPress={navigateToIndustrySelection}>
                    <View style={styles.inputRow}>
                        <TextInput
                            style={[industryType ? styles.inputText : styles.placeholderText, { flex: 1 }]}
                            placeholder="Select Industry Type"
                            value={industryType}
                            onChangeText={setIndustryType}
                            editable={false}
                        />
                        <Icon name="chevron-right" size={24} color="#888" />
                    </View>
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                    <View style={styles.inputWithIcon}>
                        <Icon name="business" size={20} color="#888" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Company Name"
                            value={companyName}
                            onChangeText={setCompanyName}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.inputWithIcon}>
                        <Icon name="location-on" size={20} color="#888" style={styles.inputIcon} />
                        <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />
                    </View>
                </View>

                <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Internship Details</Text>

                        <TouchableOpacity style={styles.inputContainer} onPress={navigateToInternshipType}>
                            <View style={styles.inputRow}>
                                <TextInput
                                    style={[internshipType ? styles.inputText : styles.placeholderText, { flex: 1 }]}
                                    placeholder="Select Internship Type"
                                    value={internshipType}
                                    onChangeText={setInternshipType}
                                    editable={false}
                                />
                                <Icon name="chevron-right" size={24} color="#888" />
                            </View>
                        </TouchableOpacity>

                <View style={styles.inputContainer}>
                    <View style={styles.inputWithIcon}>
                        <Icon name="work" size={20} color="#888" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Job Title (Ex: Designer)"
                            value={jobTitle}
                            onChangeText={setJobTitle}
                        />
                    </View>
                </View>

                <View style={styles.checkboxContainer}>
                    {/* <CheckBox
                        value={isCurrentlyWorking}
                        onValueChange={setIsCurrentlyWorking}
                        tintColors={{ true: "#4B6EFF", false: "#888" }}
                    /> */}
                    <Text style={styles.checkboxLabel}>I am currently working in this Role</Text>
                </View>

                <View style={styles.dateContainer}>
                         <TouchableOpacity style={styles.dateInput} onPress={showFromDatepicker}>
                                <Icon name="calendar-today" size={20} color="#888" style={styles.inputIcon} />
                                <Text style={styles.input}>
                                        {fromDate ? fromDate.toLocaleDateString() : 'From'}
                                </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.dateInput} onPress={showToDatepicker}>
                                <Icon name="calendar-today" size={20} color="#888" style={styles.inputIcon} />
                                <Text style={styles.input}>
                                        {toDate ? toDate.toLocaleDateString() : 'To'}
                                </Text>
                        </TouchableOpacity>
                        {showFromDatePicker && (
                                <DateTimePicker
                                        value={fromDate}
                                        mode="date"
                                        display="default"
                                        onChange={onChangeFromDate}
                                />
                        )}

                        {showToDatePicker && (
                                <DateTimePicker
                                        value={toDate}
                                        mode="date"
                                        display="default"
                                        onChange={onChangeToDate}
                                />
                        )}
                </View>

                <View style={styles.descriptionContainer}>
                    <TextInput
                        style={styles.descriptionInput}
                        placeholder="Description (Optional)"
                        multiline
                        numberOfLines={4}
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>

                <TouchableOpacity style={styles.addExperienceButton}>
                    <Icon name="add" size={20} color="#000" />
                    <Text style={styles.addExperienceText}>Add Past Experience</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveButton}  onPress={()=>navigation.navigate("AreasOfInterest")}>
                    <Text style={styles.saveButtonText}>Save & Continue</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.skipButton}>
                    <Text style={styles.skipButtonText}>Skip For Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#fff",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
    },
    progressContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "#fff",
    },
    progressBar: {
        height: 4,
        backgroundColor: "#E0E0E0",
        borderRadius: 2,
    },
    progress: {
        height: "100%",
        backgroundColor: "#4B6EFF",
        borderRadius: 2,
    },
    scrollView: {
        flex: 1,
        padding: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
        marginBottom: 16,
    },
    inputContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 12,
        padding: 16,
    },
    inputLabel: {
        fontSize: 14,
        color: "#888",
        marginBottom: 4,
    },
    inputRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    inputText: {
        fontSize: 16,
        color: "#000",
    },
    placeholderText: {
        fontSize: 16,
        color: "#888",
    },
    inputWithIcon: {
        flexDirection: "row",
        alignItems: "center",
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#000",
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 14,
        color: "#000",
    },
    dateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    dateInput: {
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 8,
                padding: 16,
                width: "48%",
                marginBottom: 12,
        },
    descriptionContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: "top",
        fontSize: 16,
    },
    addExperienceButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },
    addExperienceText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "500",
        color: "#000",
    },
    footer: {
        padding: 16,
        backgroundColor: "#fff",
    },
    saveButton: {
        backgroundColor: "#0066FF",
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: "center",
        marginBottom: 12,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    skipButton: {
        alignItems: "center",
    },
    skipButtonText: {
        color: "#0066FF",
        fontSize: 14,
    },
})

export default  InternshipDetails
