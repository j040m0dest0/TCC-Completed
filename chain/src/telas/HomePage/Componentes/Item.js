import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, Alert, Vibration, ToastAndroid } from "react-native";

import Categoria from './Categoria';
import { deleteCategory, deleteLinkByCategory, updateLinkCategory, selectLink } from '../../../database/queries';

let linksList = []

function alertCategoria(usuario, categoria){
    Vibration.vibrate(200);
    Alert.alert("Excluir", "Deseja excluir a categoria?", 
        [{text: 'Cancelar', onPress: () => console.log("Cancelar"), style: 'cancel'},
         {text: 'Excluir', onPress: () => excluirCategoria(usuario, categoria)}], {cancelable: true})
}

async function excluirCategoria(usuario, categoria){
    deleteCategory(usuario, categoria);
    deleteLinkByCategory(categoria);
    linksList = await updateLinkList(usuario, categoria);
    console.log(linksList)
    for (let i = 0; i < linksList.length; i++){
        updateLinkCategory(usuario, linksList[i]["link"], categoria)
    }
    ToastAndroid.show('Categoria excluída!\nAtualize a lista arrastando para baixo.', ToastAndroid.SHORT);
}

async function updateLinkList(usuario, categoria){
    let json = await selectLink(usuario)
    linksList = []
    for (let i = 0; i < json.length; i++){
        if (json[i]["categories"].includes(categoria)){
            linksList.push({
                usuario: usuario,
                titulo: json[i]["title"],
                link: json[i]["link"],
                categoria: json[i]["categories"]
            })
        }
    }
    console.log(linksList) 
    return(linksList.sort((a, b) => a["titulo"].localeCompare(b["titulo"])))
}

export default function Item({ nome, cor, usuario }){
    const [modalVisible, setModalVisible] = useState(false);

    return <>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} 
            onLongPress={() => alertCategoria(usuario, nome)}>
                <View style={[estilos.categoria, {backgroundColor: cor}]} >
                    <Text style={estilos.texto}>{nome}</Text>
                </View>
            </TouchableOpacity>

            <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
                <Categoria titulo={nome} cor={cor} usuario={usuario}/>
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
        alignSelf: "center",
    },
    texto: {
        color: "#000000",
        fontSize: 22,
        fontWeight: "bold",
    },
})