 export default class GotService{
constructor(){
    this._apiBase='https://www.anapioficeandfire.com/api';
}//1


   getResourse = async(url)=>{
        const res = await fetch(`${this._apiBase}${url}`);
    
        if(!res.ok){
            throw new Error(`Could not fetch ${url},status: ${res.status}`);
        }
        return await res.json()
    };//3
     getAllCharacters = async()=>{
        const res=await this.getResourse('/characters?page=5&pageSize=10')
        return res.map(this._transformCharacter)
    }
    getCharacter = async(id)=>{
       const character = await this.getResourse(`/characters/${id}`)
       return this._noData(this._transformCharacter(character))
    }//2
    getAllHouses = async()=>{
        const res = await this.getResourse('/houses')
        return res.map(this._transformHouse)
    }
    getHouse = async(id)=>{
        const house = await this.getResourse(`/houses/${id}`)
        return this._noData(this._transformHouse(house))
    }
    getAllBooks = async()=>{
        const res = await this.getResourse('/books')
        return res.map(this._transformBook);

    }
    getBook = async (id)=>{
        const book = await this.getResourse(`/books/${id}`)
        return this._noData(this._transformBook(book))
    }

    extractId=(url)=>{
        const numItem = url.lastIndexOf('/');
        return url.slice(numItem);
    }//5


    _transformCharacter(char){
        //const id = this.extractId(char.url)
        const numItem = char.url.lastIndexOf('/');
        const id =  char.url.slice(numItem+1);
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture,
            id
        }
        
    }//4

    _transformHouse(house){
        const numItem = house.url.lastIndexOf('/');
        const id =  house.url.slice(numItem+1);
        return{
            name:house.name,
            region:house.region,
            words:house.words,
            titles:house.titles,
            overlord:house.overlord,
            ancestralWeapons:house.ancestralWeapons,
            id,
            
        }
    }
    _transformBook(book){
        const numItem = book.url.lastIndexOf('/');
        const id =  book.url.slice(numItem+1);
        return{
            name:book.name,
            numberOfPages: book.numberOfPages,
            publisher:book.publisher,
            released:book.released,
            id,
        }
    }
    _noData(item){
        Object.keys(item).map((key)=>{
            if(!item[key]){
                item[key] = 'no data';
            }
        })
        return item;
    }
    }




const got = new GotService();//это новый екземпляр нашего сервиса
got.getAllCharacters()
    .then(res => {
        res.forEach(item =>console.log(item.name)); 
            }).catch((err)=>{});

got.getCharacter(130)
    .then(res => console.log(res))

got.getAllHouses()
 .then(res=>console.log(res))
 
got.getHouse(200)
 .then(res=>console.log(res)) 

 got.getAllBooks()
 .then(res=>console.log(res))
 
got.getBook(10)
 .then(res=>console.log(res)) 



