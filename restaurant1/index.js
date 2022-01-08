let url = 'http://localhost:1337/api/restaurants';
let list = document.querySelector(".list");
let btn = document.querySelector('.btn');

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


getData().then(res => {
    console.log(res.data[0].attributes.name);
})





let myData = () => {
    getData().then(res => {
        let data = res.data;
        let result = ``;
        data.forEach(e => {
            console.log(e);
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

/* DB에 저장된 정보 출력 */
myData();












// btn.addEventListener('click', myData);