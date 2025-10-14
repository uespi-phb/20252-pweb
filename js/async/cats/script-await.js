async function loadCatFact() {
  const output = document.getElementById('catFactOutput')
  output.textContent = 'Carregando...'

  try {
    const res = await fetch('https://catfact.ninja/fact')
    if (!res.ok) throw new Error('Erro ao buscar fato')

    const data = await res.json()
    output.textContent = `Fato: ${data.fact}\nTamanho: ${data.length}`
  } catch (error) {
    output.textContent = `Erro: ${error.message}`
  }
}

async function loadUserAndPosts() {
  const output = document.getElementById('userPostsOutput')
  output.textContent = 'Buscando usuário...'

  try {
    const userRes = await fetch('https://randomuser.me/api/')
    if (!userRes.ok) throw new Error('Erro ao buscar usuário')

    const userData = await userRes.json()
    const user = userData.results[0]
    const userName = `${user.name.first} ${user.name.last}`
    const userId = user.email.length // ainda usando length como ID fictício

    output.textContent = `Usuário: ${userName} (ID: ${userId})\nBuscando posts...`

    const postsRes = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    )
    if (!postsRes.ok) throw new Error('Erro ao buscar posts')

    const posts = await postsRes.json()
    const postTitles = posts.map((p) => `- ${p.title}`).join('\n')

    output.textContent += `\nPosts:\n${
      postTitles || '(nenhum post encontrado)'
    }`
  } catch (err) {
    output.textContent = `Erro: ${err.message}`
  }
}
