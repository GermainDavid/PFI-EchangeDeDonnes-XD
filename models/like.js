import Model from './model.js';

export default class Like extends Model {
    constructor() {
        super();

        this.addField('idPost', 'string');
        this.addField('idAccount', 'string');
        
    }
}
