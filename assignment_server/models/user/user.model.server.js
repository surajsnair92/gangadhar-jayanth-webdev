var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("userModel", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite;
userModel.deleteWebsite = deleteWebsite;


module.exports = userModel;

function addWebsite(websiteId,userId) {
    return userModel
        .findUserById(userId)
        .then(
            function (user) {
                user.websites.push(websiteId);
                return user.save();
            },
            function (error) {
                console.log('error ' + error);
                return error;
            }
        );

}

function deleteWebsite(userId,websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index,1);
            return user.save();

        })

}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findOne({_id:userId});
}

function findAllUsers() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({username : username});
}

function findUserByCredentials(username, password) {

    return userModel.findOne({username:username, password:password});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    return userModel.update({_id:userId},{$set:newUser});
}

function deleteUser(userId) {
    return userModel.remove({_id:userId});

}