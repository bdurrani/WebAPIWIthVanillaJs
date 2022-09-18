export class DataStore{
    private _data: any
    constructor() {
        this._data = null;
    }

    get data(){
        return this._data;
    }

    set data(value){
        this._data = value;
    }
}
