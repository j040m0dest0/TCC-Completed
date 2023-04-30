export async function checaUsuario(usuario, senha){
    let response = await fetch('http://192.168.0.198:3000/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: usuario,
            password: senha
        })
    })

    let json = await response.json();
    if(json == 'error'){
        return false;
    } else {
        return true;
    }
}