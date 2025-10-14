// Simula uma função assíncrona que retorna uma Promise
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) {
        resolve({ id: 1, name: 'Alice' })
      } else {
        reject(new Error('User not found'))
      }
    }, 1000)
  })
}

function showUser(id) {
  return fetchUser(id)
    .then((user) => {
      console.log('Usuário encontrado:', user)
    })
    .catch((error) => {
      console.error('Erro:', error.message)
    })
}

showUser(1)
showUser(99)
