import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable, Alert, LogBox, Image } from "react-native";

import { checkLogin } from "../../database/queries";
import logo from "../../../assets/logoChainbold.png";

async function logon(usuario, senha, navegador){
    usuario = usuario.charAt(0).toUpperCase() + usuario.toLowerCase().slice(1)
    if( await checkLogin(usuario, senha) ){
        navegador.navigate('Home', {user: usuario})
    } else {
        Alert.alert("Login inválido", "Informações de login não estão corretas")
    }
}

export default function LoginPage({ navigation, route }){
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();//Ignore all log notifications
    const [user, setUserText] = useState("");
    const [password, setPasswordText] = useState("");

    function login(usuario, senha){
        let flag = false;
        for (let i = 0; i < valores.length; i++){
            if (valores[i]["user"] == usuario){
                if (valores[i]["password"] == senha){
                    navigation.navigate('Home', {user: usuario})
                    flag = true;
                } else {
                    Alert.alert("Senha inválida", "A senha digitada não está correta")
                }
            } 
        }
        if (!flag) {
            Alert.alert("Usuário inválido", "O usuário digitado não está correto")
        }
    }

    return <>
        <View style={estilos.login}>
            <Image source={logo} style={estilos.logo}/>
            
            <TextInput style={estilos.input} 
            placeholder={"Usuário"} 
            onChangeText={newText => setUserText(newText)} 
            defaultValue={""}></TextInput>

            <TextInput style={estilos.input}
            placeholder={"Senha"}
            onChangeText={newText => setPasswordText(newText)}
            secureTextEntry={true}
            defaultValue={""}
            autoCapitalize = 'none'
            autoCorrect={false}></TextInput>

            <Pressable style={estilos.botao} onPress={() => logon(user, password, navigation)}>
                <Text style={estilos.botaoTexto}>Entrar</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Cadastro")}>
                <Text style={estilos.register}>Novo usuário? Clique aqui</Text>
            </Pressable>
        </View>
    
    </>
}

const estilos = StyleSheet.create({
    login: {
        flex: 1,
        alignContent: "center",
        justifyContent: 'center',
        alignItems: "center",
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        marginTop: 5,
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#AFAFAF",
    },
    title: {
        marginTop: 4,
        marginLeft: 15,
        fontSize: 18,
        alignSelf: "flex-start"
    },
    botao: {
        borderRadius: 20,
        padding: 10,
        margin: 5,
        elevation: 2,
        backgroundColor: '#2196F3',
        marginHorizontal: 10,
        width: 200,
        alignSelf: "center",
    },
    botaoTexto: {
        fontSize: 18,
        marginHorizontal: 4,
        marginVertical: 2,
        color: "white",
        alignSelf: "center",
    },
    register: {
        color: "#8fc3ff",
        margin: 5,
        fontSize: 15,
    },
    logo: {
        height: 180,
        marginBottom: 20,
        resizeMode: "contain",
    },
})