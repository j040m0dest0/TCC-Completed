import React, { useState} from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable, ToastAndroid, FlatList } from "react-native";

import homepage from '../../../mocks/categorias';
import { createCategory, checkCategory } from '../../../database/queries';

async function adicionarCategoria (categoria, cor, usuario) {
    if (categoria.slice(-1) == " "){
        categoria = categoria.slice(0, -1)
    }
    if (await checkCategory(usuario, categoria)){
        ToastAndroid.show('Categoria já adicionada!', ToastAndroid.SHORT);
    } else if (categoria == ""){
        ToastAndroid.show('Nome da categoria não pode ser vazio!', ToastAndroid.SHORT);
    } 
    else {
        categoria = categoria.charAt(0).toUpperCase() + categoria.toLowerCase().slice(1)
        createCategory(usuario, categoria, cor);
        ToastAndroid.show('Nova categoria criada!\nAtualize a lista arrastando para baixo.', ToastAndroid.SHORT);
    }
}

export default function NovaCategoria(usuario){
    const [modalVisible, setModalVisible] = useState(false);
    const [textoCategoria, setTextoCategoria] = useState("");
    const [corCategoria, setCorCategoria] = useState("#f04343");

    return <>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <View style={estilos.categoria} >
                    <Text style={estilos.texto}>Nova categoria</Text>
                </View>
            </TouchableOpacity>

            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
                <View style={estilos.centeredView}>
                    <View style={estilos.modalView}>
                        <Text style={estilos.title}>Nova categoria:</Text>
                        <TextInput style={[estilos.input, {borderColor: corCategoria}]} onChangeText={newText => setTextoCategoria(newText)}></TextInput>
                        <View style={estilos.containerCores}>
                            <FlatList
                                numColumns={5}
                                data={homepage.cores}
                                renderItem={({item}) => {
                                    return <Pressable style={
                                                    [estilos.corPressable, {backgroundColor: item}]}
                                                    onPress={() => {setCorCategoria(item)}}></Pressable>
                                }}
                                />
                        </View>
                        <View style={estilos.botoesView}>
                            <Pressable style={estilos.botao} onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={estilos.botaoTexto}>Cancelar</Text>
                            </Pressable>
                            <Pressable style={estilos.botao} onPress={() => adicionarCategoria(textoCategoria, corCategoria, usuario.usuario)} >
                                <Text style={estilos.botaoTexto}>Criar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
    </>
}

const estilos = StyleSheet.create({
    categoria: {
        height: 50,
        width: 350,
        margin: 5,
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
        backgroundColor: "#AFAFAF",
    },
    texto: {
        color: "#000000",
        fontSize: 22,
        fontWeight: "bold",
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        marginTop: 5,
        padding: 10,
        borderRadius: 20,
        borderWidth: 2,
    },
    
    centeredView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
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

    corPressable: {
        width: 50, 
        height: 50,
        borderRadius: 25,
        margin: 5,
    },
    containerCores: {
        alignItems: "center",
        flexDirection: "row",
        marginLeft: 15,
        marginBottom: 10,
    }
})