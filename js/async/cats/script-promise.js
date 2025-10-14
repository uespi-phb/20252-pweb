function loadCatFact() {
  const output = document.getElementById('catFactOutput')
  output.textContent = 'Carregando...'

  fetch('https://catfact.ninja/fact')
    .then((r) => {
      if (!r.ok) throw new Error('Erro ao buscar fato')
      return r.json()
    })
    .then((data) => {
      output.textContent = `Fato: ${data.fact}\nTamanho: ${data.length}`
    })
    .catch((error) => {
      output.textContent = `Erro: ${error.message}`
    })
}

function loadUserAndPosts() {
  const output = document.getElementById('userPostsOutput')
  output.textContent = 'Buscando usuário...'

  fetch('https://randomuser.me/api/')
    .then((resp) => {
      if (!resp.ok) throw new Error('Erro ao buscar usuário')
      return resp.json()
    })
    .then((json) => {
      const user = json.results[0]
      const userName = `${user.name.first} ${user.name.last}`
      const userId = user.email.length // apenas para exemplo

      output.textContent = `Usuário: ${userName} (ID: ${userId})\nBuscando posts...`

      return fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      )
    })
    .then((resp) => {
      if (!resp.ok) throw new Error('Erro ao buscar posts')
      return resp.json()
    })
    .then((posts) => {
      const postTitles = posts.map((p) => `- ${p.title}`).join('\n')
      output.textContent += `\nPosts:\n${
        postTitles || '(nenhum post encontrado)'
      }`
    })
    .catch((err) => {
      output.textContent = `Erro: ${err.message}`
    })
}
