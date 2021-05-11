import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from "react-native-paper";

import { registerApi } from "../../api/user";
import Toast from 'react-native-root-toast';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { formStyle } from "../../styles/index";

export default function RegisterForm(props) {
    const {changeForm} = props;
    const [loading, setLoading] = useState(false); //Cargar o no el Loading

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)
            try {
                await registerApi(formData);
                changeForm();
            } catch (error) {
                setLoading(false);
                console.log(error);
                Toast.show("Error al registrar el usuario", {
                    position: Toast.positions.CENTER,
                });
            }

        },
    });

    return (
        <View>
            <TextInput 
                label='Email' 
                style={formStyle.input} 
                onChangeText={(text) => formik.setFieldValue("email", text)}onChangeText={(text) => formik.setFieldValue("email", text)}
                value={formik.values.email}
                error={formik.errors.email}
            />
            <TextInput 
                label='Nombre de usuario' 
                style={formStyle.input }
                onChangeText={(text) => formik.setFieldValue("username", text)}
                value={formik.values.username}
                error={formik.errors.username}
            />
            <TextInput 
                label='Contraseña' 
                style={formStyle.input } 
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue("password", text)}
                value={formik.values.password}
                error={formik.errors.password}
            />
            <TextInput 
                label='Respetir Contraseña' 
                style={formStyle.input }
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
            />

            <Button 
                mode="contained" 
                style={formStyle.btnSucces}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Registrarse
            </Button>

            <Button 
                mode="text" 
                style={formStyle.btnText} 
                labelStyle={formStyle.btnTextLabel}
                onPress={changeForm}
            >
                Iniciar Sesion
            </Button>
        </View>
    )
}

function initialValues() {
    return{
        email: "",
        username: "",
        password: "",
        repeatPassword: ""
    }
}
 function validationSchema(){
    return{
        email: Yup.string().email(true).required(true),
        username: Yup.string().required(true),
        password: Yup.string().required(true),
        repeatPassword: Yup.string().required(true).oneOf([Yup.ref("password")], true),
    }
 }

const styles = StyleSheet.create({})
