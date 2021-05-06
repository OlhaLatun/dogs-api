

export default class DogService {

    _mainUrl = 'https://api.thedogapi.com/v1/'
    _APIkey = 'eb2192f6-4e42-4584-92d2-64673a3444a7'
    _headers = {
        'Content-Type': 'application/json',
        'x-api-key': this._APIkey
    }

    async getAllDogs() {
        const res = await fetch(this._mainUrl + 'breeds', {
            headers: this._headers
        })
        const dogs = await res.json()
        return this._transformDogs(dogs)
    }

    async getLimitedDogs(limit) {
        const res = await fetch(this._mainUrl + `breeds?limit=${limit}`, {
            headers: this._headers
        })
        const dogs = await res.json()
        return this._transformDogs(dogs)
    }

    async getDogsByPage(limit, page, order) {
        const res = await fetch(this._mainUrl + `breeds?limit=${limit}&page=${page}&order=${order}`, {
            headers: this._headers
        })
        const dogs = await res.json()
        return this._transformDogs(dogs)
    }

    async getRandomDog() {
        const res = await fetch(this._mainUrl + `images/search`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this._APIkey
            }
        })
        return await res.json()
    }

    async sendVote(content) {
        const res = await fetch(this._mainUrl + 'votes', {
            method: 'POST',
            body: JSON.stringify(content),
            headers: this._headers
        })
        return await res.json()
    }

    async sendFavs(content) {
        const res = await fetch(this._mainUrl + 'favourites', {
            method: 'POST',
            body: JSON.stringify(content),
            headers: this._headers
        })
        return await res.json()
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

