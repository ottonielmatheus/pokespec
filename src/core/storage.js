import { openDB } from 'idb'

const db = async () => {
  try {
    return await openDB('pokespec', 1, {
      upgrade (db) {
        const store = db.createObjectStore('pokemonsSearch', { keyPath: 'name' })
        store.createIndex('name', 'name', { unique: true })
      },
      terminated () {
        alert('indexedDB closed.')
      }
    })
  } catch (err) {
    alert(err)
  }
}

const store = (storeName) => {
  const transaction = async (mode, callback) => {
    const tx = (await db()).transaction(storeName, mode)
    const result = callback(tx.store)
    await tx.done

    return result
  }

  return {
    add: async (value) => {
      await transaction('readwrite', async store => {
        store.add(value)
      })
    },
    put: async (value) => {
      await transaction('readwrite', async store => {
        store.put(value)
      })
    },
    getAll: async (where, { offset }) => {
      return await transaction('readonly', async store => {
        const query = IDBKeyRange.bound(where.like, where.like + '\uffff')
        let cursor = await store.openCursor(query, 'nextunique')

        let count = 0
        const results = []
        while (cursor && count < offset) {
          results.push(cursor.value)
          cursor = await cursor.continue()
          count++
        }
        return results
      })
    }
  }
}

export {
  store
}