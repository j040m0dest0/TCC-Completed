import * as WebBrowser from 'expo-web-browser';
import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { Text, View, StyleSheet, Pressable, Vibration, ToastAndroid, Alert } from "react-native";
import { deleteLinkByUser } from '../../../database/queries';

function copiarLink(link){
    Clipboard.setStringAsync(link); 
    Vibration.vibrate(200);
    ToastAndroid.show("Copiado para a área de transferência", ToastAndroid.SHORT);
}

function abrirLink(link){
    if (link.includes("https://") || link.includes("http://")){
        WebBrowser.openBrowserAsync(link)
    } else {
        WebBrowser.openBrowserAsync("https://" + link)
    }
}

function excluirLink(usuario, link){
    Vibration.vibrate(200);
    Alert.alert("Excluir", "Deseja excluir o link?", 
        [{text: 'Cancelar', onPress: () => console.log("Cancelar"), style: 'cancel'},
         {text: 'Excluir', onPress: () => {
        deleteLinkByUser(usuario, link); 
        ToastAndroid.show("Link excluído\nAtualize a lista arrastando para baixo.", ToastAndroid.SHORT)}}], 
    {cancelable: true})
}

export default function Link({ usuario, titulo, link }){
    return <>
        <View style={estilos.container}>
            <Pressable  onLongPress={() => excluirLink(usuario, link)}>
                <Text style={estilos.titulo} >{titulo}</Text>
                <Pressable onPress={() => abrirLink(link)} onLongPress={() => copiarLink(link)} >
                    <Text style={estilos.link}>{link}</Text>
                </Pressable>
            </Pressable>
        </View>
    </>
}

const estilos = StyleSheet.create({
    container: {
        width: 350,
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 8,
        marginHorizontal: 5,
        alignSelf: 'center'
    },
    titulo: {
        fontSize: 16,
        fontWeight: "bold",
        borderBottomWidth: 1,
        borderBottomColor: "#AFAFAF",
        marginBottom: 10,
        paddingBottom: 5,

    },
    link: {
        color: "#006aff"
    }
})