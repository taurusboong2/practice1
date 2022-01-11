let url = 'http://localhost:1337/api/articles';

const getData = async () => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        }
        throw new Error("ERROR!");
    } catch (error) {
        console.log(error);
    }
}

const putData = () => {
    getData().then( res => {
        const data = res.data;
        data.forEach(e => {
            console.log(e.id);
        })
    })
}

putData();