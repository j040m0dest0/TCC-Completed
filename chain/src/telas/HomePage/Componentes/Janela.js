import React, {useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Modal, TouchableOpacity, Image, ToastAndroid } from "react-native"

import addImage from "../../../../assets/addImage.png";
import { checkCategory, createLink, checkLink } from '../../../database/queries';

async function adicionarLink (titulo, link, categoria, usuario) {
    if (link == "" || titulo == "" | categoria == ""){
        ToastAndroid.show('Preencha todos os campos!', ToastAndroid.CENTER)
    } else {
        let category = formatCategoria(categoria)
        if (await checkLink(usuario, link)){
            ToastAndroid.show('Link já adicionado', ToastAndroid.CENTER)
        } else if (!await categoriaExiste(usuario, category)) { 
            ToastAndroid.show('Categoria não encontrada', ToastAndroid.CENTER)
        } else {
            createLink(usuario, titulo, link, category)
            ToastAndroid.show('Novo link adicionado', ToastAndroid.CENTER)
        }
    }
}

async function categoriaExiste(usuario, categoria){
    let categorias = categoria.split(",")
    let count = 0;
    let flag = false;
    for (let i = 0; i < categorias.length; i++){
        let formatCategoria = categorias[i].charAt(0).toUpperCase() + categorias[i].toLowerCase().slice(1)
        if(await checkCategory(usuario, formatCategoria)){
            count++
        }
    }
    if (count == categorias.length){
        flag = true}
    return flag;
}

function formatCategoria(categoria){
    let categorias = categoria.replace(", ", ",").split(",")
    for (let i = 0; i < categorias.length; i++){
        if (categorias[i].slice(-1) == " "){
            categorias[i] = categorias[i].slice(0, -1)
        }
        categorias[i] = categorias[i].charAt(0).toUpperCase() + categorias[i].toLowerCase().slice(1)
    }
    console.log(categorias.join(","))
    return categorias.join(",")
}

export default function Janela({texto, usuario}){
    const [modalVisible, setModalVisible] = useState(false);
    const [textoTitulo, setTextoTitulo] = useState("");
    const [textoCategoria, setTextoCategoria] = useState("");
    const [textoLink, setTextoLink] = useState("");

    return <>
            <TouchableOpacity onPress={() => {setModalVisible(true); setTextoLink(texto)}}>
                <Image source={addImage} />
            </TouchableOpacity>

            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setTextoLink(texto)
                setModalVisible(!modalVisible);
            }}>
                <View style={estilos.centeredView}>
                    <View style={estilos.modalView}>
                        
                        <Text style={estilos.title}>Título:</Text>
                        <TextInput style={estilos.input} onChangeText={newText => setTextoTitulo(newText)}></TextInput>                
                        
                        <Text style={estilos.title}>Link:</Text>
                        <TextInput style={estilos.input} defaultValue={texto} onChangeText={newText => setTextoLink(newText)} ></TextInput>
                        <Text style={estilos.title}>Categoria:</Text>
                        <TextInput style={estilos.input} onChangeText={newText => setTextoCategoria(newText)} placeholder={"Ex: Categoria 1, Categoria 2"} ></TextInput>
                        
                        <View style={estilos.botoesView}>
                            <Pressable style={estilos.botao} onPress={() => {setTextoLink(texto); setModalVisible(!modalVisible)}}>
                                <Text style={estilos.botaoTexto}>Cancelar</Text>
                            </Pressable>
                            <Pressable style={estilos.botao} onPress={() => {adicionarLink(textoTitulo, textoLink, textoCategoria, usuario.usuario)}} >
                                <Text style={estilos.botaoTexto}>Armazenar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
    </>
}

const estilos = StyleSheet.create({
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
    modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    },
    modalText:{
        color: "#000000",
        textAlign: "center",
    },
    title: {
        marginTop: 4,
        marginLeft: 15,
        fontSize: 18,
    },
    botoesView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    botao: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#2196F3',
        marginHorizontal: 10,
    },
    botaoTexto: {
        fontSize: 18,
        marginHorizontal: 4,
        marginVertical: 2,
        color: "white"
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
    },
})