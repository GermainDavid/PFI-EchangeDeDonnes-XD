import Model from './model.js';
import Repository from './repository.js';
import Accounts from './user.js';
export default class Post extends Model {
    constructor() {
        super(true /* secured Id */);

        this.addField('Title', 'string');
        this.addField('Text', 'string');
        this.addField('Category', 'string');
        this.addField('Image', 'asset');
        this.addField('Date', 'integer');
        this.addField('UserId', 'string');
        this.setKey("Title");
    }

    bindExtraData(instance) {
        instance = super.bindExtraData(instance);
        this.addField('UserAvatar', 'string');
        this.addField('UserName', 'string');
        let userRepository = new Repository(new Accounts());
        let user = userRepository.get(instance.UserId);
        instance.UserAvatar = user.Avatar;
        instance.UserName = user.Name;
        return instance;
    }
}