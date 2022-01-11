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
        data.forEach((e, i) => {
            result += `
            <li>
                <a href="article_detail.html?id=${i}">
                    <h2>${e.attributes.title}</h2>
                    <p>${e.attributes.createdAt}</p>
                </a>
            </li>
        `
        })
        list.innerHTML = result;
    })
}

const putData = () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    getData().then( res => {
        const data = res.data;
        const title = document.querySelector("#detail_title");
        const author = document.querySelector("#detail_author");
        const des = document.querySelector("#detail_des");
        const type = document.querySelector("#detail_type");
        const create = document.querySelector("#create_data");
        const update = document.querySelector("#update_data");
        data.forEach((e, i) => {
            if(id == i) {
                title.innerHTML = e.attributes.title;
                type.innerHTML = e.attributes.type;
                des.innerHTML = e.attributes.description;
                author.innerHTML = e.attributes.author;
                create.innerHTML = e.attributes.createdAt;
                update.innerHTML = e.attributes.updatedAt;
            }
        })
    })
}

const deleteData1 = async () => {
    try {
        const response = await fetch('http://localhost:1337/api/articles', {
            method:'DELETE',
        })
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(response);
            console.log(jsonResponse);
        }
    } catch (err) {
        console.log(err);
    }
}

const deleteData2 = () => {
    getData().then(res => {
        const data = res.data;
        data.forEach(e => {
            const id = e.id;
            console.log('id는', id);
        })
    })
}

const deleteBtn = document.querySelector('#delete_btn');

deleteData2();
deleteData1();