const PUBLIC_KEY = "dbab711d9dd31157460665c92e6ff4e3"
const PRIVATE_KEY = "b035ba44c02df1cad1216a27750d4dceb7be6255"

fetch('https://gateway.marvel.com/v1/public/comics', {
    method: 'GET',
    headers: {
        'apikey': PRIVATE_KEY
    }
})
    .then((response) => {
        return response.json()
    })
    .then((myJson) => {
        console.log(myJson)
    })