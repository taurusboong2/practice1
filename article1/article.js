const url = new URL(window.location);
const urlID = url.searchParams.get("id");

const getData = async () => {
    let url = 'http://localhost:1337/api/articles';
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
        data.forEach( e => {
            let id = e.id;
            result += `
            <li>
                <a href="article_detail.html?id=${id}">
                    <h2>${e.attributes.title}</h2>
                    <p>${e.attributes.createdAt}</p>
                </a>
            </li>
        `
        })
        list.innerHTML = result;
    })
}

const putData2 = async () => {
    let url = `http://localhost:1337/api/articles/${urlID}`;
    const title = document.querySelector("#detail_title");
    const author = document.querySelector("#detail_author");
    const des = document.querySelector("#detail_des");
    const type = document.querySelector("#detail_type");
    const create = document.querySelector("#create_data");
    const update = document.querySelector("#update_data");
    try {
        const response = await fetch(url);
        if(response.ok) {
            const jsonResponse = await response.json();
            const dataAttr = jsonResponse.data.attributes;
            title.innerHTML = dataAttr.title;
            type.innerHTML = dataAttr.type;
            des.innerHTML = dataAttr.description;
            author.innerHTML = dataAttr.author;
            create.innerHTML = dataAttr.createdAt;
            update.innerHTML = dataAttr.updatedAt;
            // return jsonResponse;
        }
    } catch (err) {
        console.log(err);
    }
    const updateBtn = document.querySelector('#update_btn');
    updateBtn.setAttribute('href',`article_update.html?id=${urlID}`);
}


const deleteData = async () => {
    try {
        const response = await fetch(`http://localhost:1337/api/articles/${urlID}`, {
            method:'DELETE',
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
        })
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(response);
            console.log(jsonResponse);
        }
    } catch (err) {
        console.log(err);
    }
    location.href = "article.html";
}

const updatePage = async () => {
    getData().then( res => {
        const data = res.data;
        const title = document.querySelector("#ud_title");
        const author = document.querySelector("#ud_author");
        const des = document.querySelector("#ud_des");
        data.forEach( e => {
            if(urlID == e.id) {
                title.value = e.attributes.title;
                des.value = e.attributes.description;
                author.value = e.attributes.author;
            }
        })
    })
}


const updateData = async () => {
    let thisURL = `http://localhost:1337/api/articles/${urlID}`;
    const title = document.querySelector("#ud_title");
    const author = document.querySelector("#ud_author");
    const des = document.querySelector("#ud_des");
    const titleValue = title.value;
    const authorValue = author.value;
    const desValue = des.value;
    const type = document.querySelector("#ud_type");
    const typeValue = type.options[type.selectedIndex].value;
    const data = JSON.stringify({ "data" : { 
        "title" : titleValue,
        "description" : desValue,
        "author" : authorValue,
        "type" : typeValue
        } 
    });
    try {
        const response = await fetch(thisURL, {
            method: 'PUT',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (response.ok) {
            const jsonResponse = await response.json();
            location.href = `article_detail.html?id=${urlID}`;
            return jsonResponse;
        }
    } catch (err) {
        console.log(err);
    }
    
}

const ff = async () => {
    let url = `http://localhost:1337/api/articles`;
    const getData = await fetch(url)
    console.log(getData);
    const dataJson = await getData.json();
    console.log(dataJson);
    console.log(dataJson.data);
}
ff();
