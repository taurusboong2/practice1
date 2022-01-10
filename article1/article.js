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

let myData = () => {
    getData().then(res => {
        let list = document.querySelector("#list");
        let data = res.data;
        let result = ``;
        data.forEach(e => {
            result += `
            <li>
                <a href="article_detail.html">
                    <h2>${e.attributes.title}</h2>
                    <p>${e.attributes.createdAt}</p>
                </a>
            </li>
        `
        })
        list.innerHTML = result;
    })
}

const sendData = async () => {
    let title = document.querySelector('#title');
    let des = document.querySelector('#des');
    let author = document.querySelector('#author');
    let type = document.getElementsByName("type");
    const titleValue = title.value;
    const desValue = des.value;
    const authorValue = author.value;
    const typeValue = type.value;
    console.log(titleValue);
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
sendData();

// submitBtn.addEventListener("click", sendData);
// submitBtn.addEventListener("click", myData);
myData();