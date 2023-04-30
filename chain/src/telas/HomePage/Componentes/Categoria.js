import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList, ScrollView, RefreshControl, } from "react-native";

import Link from "./Link";
import { selectLink, deleteLinkByUser } from "../../../database/queries"

let linksList = []

async function updateLink(usuario){
    let json = await selectLink(usuario)
    linksList = []
    for (let i = 0; i < json.length; i++){
        linksList.push({
            usuario: usuario,
            titulo: json[i]["title"],
            link: json[i]["link"],
            categoria: json[i]["categories"]
        }) 
    }
    console.log(linksList) 
    linksList.sort((a, b) => a["titulo"].localeCompare(b["titulo"]))
}

export default function Categoria({ titulo, cor, usuario }){
    const [busca, setBusca] = useState("");
    const [refreshing, setRefreshing] = React.useState(false);

    updateLink(usuario)

    useEffect(() => {
        setRefreshing(true);
        wait(500).then(() => setRefreshing(false));
    }, [])

    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
        };
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(800).then(() => setRefreshing(false));
    });

    return <>
        <View style={[estilos.view, {backgroundColor: cor}]} >
            <Text style={estilos.title}>{ titulo }</Text>
            <TextInput placeholder={"Pesquisar"} style={estilos.input} onChangeText={newText => setBusca(newText)}/>
        </View>
        <ScrollView style={[estilos.lista]} 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <FlatList
                    data={linksList}
                    renderItem={({ item }) => {
                        if(item.categoria.includes(titulo)){
                            if (busca == ""){
                                return <Link usuario={usuario} titulo={item.titulo} link={item.link} />
                            } else if (item.titulo.includes(busca)) {
                                return <Link usuario={usuario} titulo={item.titulo} link={item.link} />
                            } else {
                                return null
                            }
                        }
                    }}
                    keyExtractor={({link}) => link}
                    />
        </ScrollView>
    </> 
}

const estilos = StyleSheet.create({
    categoria: {
        height: 40,
        width: 350,
        margin: 5,
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
    },
    texto: {
        color: "#000000",
        fontSize: 16
    },
    view: {
        alignItems: "center",
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 5,
    },
    title: {
        marginBottom: 15,
        marginTop: 5,
        fontSize: 25,
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        marginTop: 5,
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#A9A9A9",
        backgroundColor: "white",
    },
    lista: {
        //alignItems: "center",
    }
})