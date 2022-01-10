let url = 'http://localhost:1337/api/articles';
let submitBtn = document.querySelector('#submit_btn');

const getData = async () => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse
        }
        throw new Error('ERROR!');
    } catch (error) {
        console.log(error);
    }
}

const sendData = async () => {
    let title = document.querySelector('#title');
    let des = document.querySelector('#des');
    let author = document.querySelector('#author');
    let type = document.querySelector('input[name="type"]:checked');
    const titleValue = title.value;
    const desValue = des.value;
    const authorValue = author.value;
    const typeValue = type.value;
    console.log(titleValue);
    console.log(desValue);
    console.log(authorValue);
    console.log(typeValue);
    const data = JSON.stringify({ "data" : { 
        "title" : titleValue,
        "description" : desValue,
        "author" : authorValue,
        "type" : typeValue
        } 
    });
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            // return jsonResponse;
        }
    } catch (error) {
        console.log(error);
    }

    //input 값 초기화
    title.value = null;
    des.value = null;
    author.value = null;
}

submitBtn.addEventListener("click", sendData);