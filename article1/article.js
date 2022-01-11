let url = 'http://localhost:1337/api/articles';

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

const putData = () => {
    getData().then( res => {
        const data = res.data;
        const title = document.querySelector("#detail_title");
        const author = document.querySelector("#detail_author");
        const des = document.querySelector("#detail_des");
        const type = document.querySelector("#detail_type");
        const create = document.querySelector("#create_data");
        const update = document.querySelector("#update_data");

        title.innerHTML = data[0].attributes.title;
        type.innerHTML = data[0].attributes.type;
        des.innerHTML = data[0].attributes.description;
        author.innerHTML = data[0].attributes.author;
        create.innerHTML = data[0].attributes.createdAt;
        update.innerHTML = data[0].attributes.updatedAt;
    })
}