// Simula uma função assíncrona que retorna uma Promise
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) {
        resolve({ id: 1, name: 'Alice' })
      } else {
        reject(new Error('User not found'))
      }
    }, 3000)
  })
}

// Função marcada com async (açúcar sintático sobre Promise)
async function showUser(id) {
  try {
    const user = await fetchUser(id) // espera a Promise resolver
    console.log('Usuário encontrado:', user)
  } catch (error) {
    console.error('Erro:', error.message)
  }
}

// Testando
showUser(1) // sucesso
showUser(99) // erro
