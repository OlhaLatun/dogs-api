

export default class DogService {

    _mainUrl = 'https://api.thedogapi.com/v1/'
    _APIkey = 'eb2192f6-4e42-4584-92d2-64673a3444a7'
   
    async getAllDogs() {
        const res = await fetch(this._mainUrl + 'breeds', {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this._APIkey
            }
        })
        const dogs = await res.json()
        return this._transformDogs(dogs)
    }

    async getLimitedDogs(limit) {
        const res = await fetch(this._mainUrl + `breeds?limit=${limit}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const dogs = await res.json()
        return this._transformDogs(dogs)
    }

    async getDogsByPage(page) {
        const res = await fetch(this._mainUrl + `breeds?limit=20&page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const dogs = await res.json()
        return this._transformDogs(dogs)
    }

    _transformDogs(arr) {
         return arr.map(item => {
            return {
            id: item.id,
            name: item.name,
            img: item.image.url
            }
        })

    }
}

