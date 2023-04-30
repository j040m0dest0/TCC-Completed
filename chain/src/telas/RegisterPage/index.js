import { useState } from "react";
import { StyleSheet, View, TextInput, Text, Pressable, ToastAndroid, Image } from "react-native"

import { checkNewUser, createUser } from "../../database/queries"
import logo from "../../../assets/logoChainbold.png"

async function newUser(usuario, email, senha, navegador){
    usuario = usuario.charAt(0).toUpperCase() + usuario.toLowerCase().slice(1)
    if (usuario == "" || email == "" || senha == "") {
        ToastAndroid.show('Preencha todos os campos!', ToastAndroid.SHORT);
    } else if (usuario.includes(" ") || email.includes(" ") || senha.includes(" ")){
        ToastAndroid.show('Informações não podem conter espaços!', ToastAndroid.SHORT);
    } else if(await checkNewUser(usuario, email)){
        createUser(usuario, email, senha)
        ToastAndroid.show('Usuário cadastrado!', ToastAndroid.SHORT);
        navegador.navigate("Chain");
    } else {
        ToastAndroid.show('Usuário ou e-mail já cadastrado!', ToastAndroid.SHORT);
    }
}

export default function RegisterPage({navigation, route}){
    const [user, setUserText] = useState("");
    const [password, setPasswordText] = useState("");
    const [email, setEmailText] = useState("");

    return<>
        <View style={estilos.register}>
            <Image source={logo} style={estilos.logo}/>
            
            <TextInput style={estilos.input} 
            placeholder="Usuário" 
            onChangeText={newText => setUserText(newText)}></TextInput>

            <TextInput style={estilos.input} 
            placeholder="E-mail" 
            onChangeText={newText => setEmailText(newText)}
            autoCapitalize = 'none'
            autoCorrect={false}></TextInput>

            <TextInput style={estilos.input} 
            placeholder="Senha" 
            onChangeText={newText => setPasswordText(newText)}
            autoCapitalize = 'none'
            autoCorrect={false}></TextInput>

            <Pressable style={estilos.botao} onPress={() => newUser(user, email, password, navigation)}>
                <Text style={estilos.botaoTexto}>Cadastrar</Text>
            </Pressable>
        </View>
    </>
}

const estilos = StyleSheet.create({
    register: {
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
    logo: {
        height: 180,
        marginBottom: 20,
        resizeMode: "contain",
    },
})