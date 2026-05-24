const content = document.getElementById("content");
const wordCount = document.getElementById("wordCount");
const error = document.getElementById("error");

content.addEventListener("input", () => {

    let words = content.value.trim().split(/\s+/).filter(w => w);

    wordCount.innerText = `Слов: ${words.length} / 15`;

});

document.getElementById("profileBtn").onclick = () => {

    document.getElementById("homePage").classList.add("hidden");
    document.getElementById("profilePage").classList.remove("hidden");

};

function goHome(){

    document.getElementById("profilePage").classList.add("hidden");
    document.getElementById("homePage").classList.remove("hidden");

}

function submitPost(){

    let category = document.getElementById("category").value;
    let title = document.getElementById("title").value.trim();
    let text = document.getElementById("content").value.trim();

    let words = text.split(/\s+/).filter(w => w);

    if(!category || !title || !text){
        alert("Заполните все поля");
        return;
    }

    if(words.length < 15){
        error.style.display = "block";
        return;
    }

    error.style.display = "none";

    let post = {
        id: Date.now(),
        category,
        title,
        text
    };

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.unshift(post);

    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("category").value = "";
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    wordCount.innerText = "Слов: 0 / 15";

    showPosts();

}

function showPosts(){

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    let feed = document.getElementById("feed");
    let my = document.getElementById("myPosts");

    feed.innerHTML = "";
    my.innerHTML = "";

    if(posts.length === 0){

        feed.innerHTML = `<div class="empty">Пока нет публикаций</div>`;
        my.innerHTML = `<div class="empty">У вас нет публикаций</div>`;

        return;
    }

    posts.forEach(p => {

        let html = `
        <div class="post">

            <div class="category">${p.category}</div>

            <h3>${p.title}</h3>

            <p>${p.text}</p>

            <button class="btn deleteBtn" onclick="deletePost(${p.id})">
                Удалить
            </button>

        </div>`;

        feed.innerHTML += html;
        my.innerHTML += html;

    });

}

function deletePost(id){

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts = posts.filter(p => p.id !== id);

    localStorage.setItem("posts", JSON.stringify(posts));

    showPosts();

}

showPosts();