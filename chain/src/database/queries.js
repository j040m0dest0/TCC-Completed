//localhost
const localhost = "http:///192.168.0.198"

//Verifica se o usuário e a senha estão corretos
export async function checkLogin(usuario, senha){
    let response = await fetch(localhost+':3000/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: usuario,
            password: senha,
        })
    })

    let json = await response.json();
    if(json == 'error'){
        return false;
    } else {
        return true;
    }
}

//Verifica se há um usuário com o mesmo email no banco
export async function checkNewUser(usuario, email){
    let response = await fetch(localhost+':3000/register', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: usuario,
            email: email,
        })
    })

    let json = await response.json();
    if(json == 'nao'){
        return true;
    } else if (json == 'tem') {
        return false;
    }
}

//Cria o usuário no banco
export async function createUser(usuario, email, senha){
    let response = await fetch(localhost+':3000/createUser', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: usuario,
            email: email,
            password: senha
        })
    })
}

//Faz um select das categorias do usuário
export async function selectCategories(usuario){
    let response = await fetch(localhost+':3000/slctCategories', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: usuario
        })
    })

    let json = await response.json();
    return json;
}

//Cria uma nova categoria no banco
export async function createCategory(usuario, categoria, cor){
    let response = await fetch(localhost+':3000/crtCategories', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: usuario,
            category: categoria,
            color: cor
        })
    })
}

//Verifica se o usuário já criou a categoria
export async function checkCategory(usuario, categoria){
    let response = await fetch(localhost+':3000/chckCategories', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: usuario,
            category: categoria,
        })
    })

    let json = await response.json();
    if(json == 'nao'){
        return false;
    } else if (json == 'tem') {
        return true;
    }
}

//Deletar uma categoria do usuário
export async function deleteCategory(usuario, categoria){
    let response = await fetch(localhost+':3000/dltCategories', {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: usuario,
            category: categoria,
        })
    })
}


//Faz um select dos links do usuário
export async function selectLink(usuario){
    let response = await fetch(localhost+':3000/slctLink', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: usuario
        })
    })

    let json = await response.json();
    return json;
}

//Cria uma nova categoria no banco
export async function createLink(usuario, titulo, link, categoria){
    let response = await fetch(localhost+':3000/crtLink', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: usuario,
            title: titulo,
            link: link,
            category: categoria
        })
    })
}

//Verifica se o usuário já criou a categoria
export async function checkLink(usuario, link){
    let response = await fetch(localhost+':3000/chckLink', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: usuario,
            link: link,
        })
    })

    let json = await response.json();
    if(json == 'error'){
        return false;
    } else {
        return true;
    }
}

//Deletar link pelo nome de usuário recebido
export async function deleteLinkByUser(usuario, link){
    let response = await fetch(localhost+':3000/dltLinkByUser', {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: usuario,
            link: link,
        })
    })
}

//Deletar todos os links de uma categoria
export async function deleteLinkByCategory(categoria){
    let response = await fetch(localhost+':3000/dltLinkByCategory', {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            category: categoria
        })
    })
}

//Remove a categoria pedida dos links com mais de 1 categoria
export async function updateLinkCategory(usuario, link, categoria){
    let response = await fetch(localhost+':3000/updtLink', {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: usuario,
            link: link,
            category: categoria
        })
    })
}    
