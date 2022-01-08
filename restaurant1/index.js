let url = 'http://localhost:1337/api/restaurants';
let list = document.querySelector(".list");
let btn = document.querySelector('#btn');
let input = document.querySelector('#names');
let des = document.querySelector('#des');

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
        let data = res.data;
        let result = ``;
        data.forEach(e => {
            result += `
                <li>
                    <h3>${e.attributes.name}</h3>
                    <p>${e.attributes.description}</p>
                </li>
            `
        })
        list.innerHTML = result;
    })
}

const sendData = async () => {
    const nameValue = input.value;
    const desValue = des.value;
    const data = JSON.stringify({ "data" : { 
        "name" : nameValue,
        "description" : desValue,
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
            // return jsonResponse;
        }
    } catch (error) {
        console.log(error);
    }

    //input 값 초기화
    input.value = null;
    des.value = null;
}
btn.addEventListener("click", sendData);
btn.addEventListener("click", myData);

/* DB에 저장된 정보 출력 */
myData();