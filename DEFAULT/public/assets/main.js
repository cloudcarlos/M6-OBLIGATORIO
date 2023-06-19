const pruebaBackend =(url)=> {
    fetch(`${url}/`)
        .then(response => response.json())
        .then(data => console.log('main.js :: ' + data.message))
        .catch(error => console.error('Error:', error));
}

window.onload = () => {

    const API_URL = "http://localhost:3000";
    //prueba backend
    pruebaBackend(API_URL);

    const listadoAnimes = document.getElementById("todos-los-animes");

    listadoAnimes.addEventListener('click', async event => {
        console.log('click todos-los-anime');
        try{        
            let response = await fetch(`${API_URL}/animes`);
            let animes = await response.json();
            return console.log(animes)
        } catch (error) {
            console.log('mala la wea :: '+error);
        }
    })

}