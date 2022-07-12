import { openDB } from 'idb'

const db = async () => {
  return await openDB('pokespec', 1, {
    upgrade (db) {
      const store = db.createObjectStore('pokemonsSearch', { keyPath: 'name' })
      store.createIndex('name', 'name', { unique: true })
    }
  })
}

const store = (storeName) => {
  const transaction = async (callback) => {
    const tx = (await db()).transaction(storeName, 'readwrite')
    const result = callback(tx.store)
    await tx.done

    return result
  }

  return {
    add: async (value) => {
      await transaction(async instance => {
        instance.add(value)
      })
    },
    put: async (value) => {
      await transaction(async instance => {
        instance.put(value)
      })
    },
    getAll: async () => {
      return await transaction(async instance => {
        return await instance.getAll()
      })
    }
  }
}

export {
  store
}