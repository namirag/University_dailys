const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');//this will hash the password

const UserModel = require('./models/User');

mongoose.connect("mongodb://127.0.0.1:27017/newsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const username = 'user';
const password = 'admin';
// password-$2a$12$Rpznq9gCPpE9Jf8sftdvKOi2gBMHiR3ueVG4PXTto8kiU42oNsWf6

async function admincreate() {
    const hashedpwd = await bcrypt.hash(password, 12);
    const user = new UserModel({
        username,
        password: hashedpwd
    });
    user.save();//it will save data
}
admincreate();


