document.addEventListener('DOMContentLoaded', () =>{
    const form = document.querySelector("#github-form");
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let search = e.target.search.value
        //console.log(search)
        handleSearch(search)

function handleSearch() {

    fetch('https://api.github.com/search/users?q=' + search, {
        method: 'GET',
        header:{
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.v3+json'
        },
        body: JSON.stringify()
    })
    .then(res => res.json())
    .then(data => {console.log(data)
        document.querySelector('#user-list').innerHTML = ''
        document.querySelector('#repos-list').innerHTML =''

        data.items.forEach(user => {
            console.log(user)
            let userName = document.createElement('li')
            userName.className = 'all-users'
            userName.innerHTML = `
                <div class='content'>
                    <h3> User: ${user.login}</h3>
                    <p> URL: ${user.html_url}</p>
                    <div class ='repos'>
                    <button class='repo-button' style='margin-bottom: 25px'>
                    Repositories
                    </button>
                    </div>
                    <img src=${user.avatar_url} />
                </div>`

           document.querySelector('#user-list').appendChild(userName)   

           const repository = document.querySelector('.repo-button')
           console.log(repository)
           repository.addEventListener('click', () => {
               fetch(user.repos_url, {
               method: 'GET',
               header:{
                   'Content-Type': 'application/json',
                   Accept: 'application/vnd.github.v3+json'
               },
               body: JSON.stringify()
            })
               .then(res => res.json())
               .then(data => {

               data.forEach(repo => {

                    let repository2 = document.createElement('li')
                    repository2.innerHTML = `
                    <h4> ${repo.name} </h4>
                    <p> ${repo.html_url}</p>
                    `
                    document.querySelector('#repos-list').appendChild(repository2)

               })
            })

           })


    })

})
}
})
})  