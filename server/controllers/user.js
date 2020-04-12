const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const User = require("../models/user");
const fs = require("fs");
const path = require("path");

function signUp(req, res) {
    const user = new User();

    const { name, lastname, email, password, repeatPassword } = req.body;
    user.name = name;
    user.lastname = lastname;
    user.email = email.toLowerCase();
    user.role = "admin"; 
    user.active = false;

    if (!password || !repeatPassword) {
        res.status(404).send({ message: "Las contraseñas son obligatorias."});
    } else {
        if (password !== repeatPassword) {
            res.status(404).send({ message: "Las contraseñas no coinciden."});
        } else {
            bcrypt.hash(password, null, null, function(err, hash) {
                if(err){
                    res
                    .status(500)
                    .send({ message: "Error al encriptar la contrasela."} );
                }
                else{
                    user.password = hash;
                    
                    user.save((err, userStored) => {
                        if (err) {
                            res.status(500).send({message: "El usario ya existe ."});
                        }
                        else {
                            if (!userStored) {
                                res.status(404).send({message: "Error al crear el usuario."});
                            } else {
                                res.status(200).send({user: userStored});
                            }
                        } 
                    });
                }
            });
            /* res.status(200).send({message: "Usuario creado."});*/
        }
    }
}

function signIn(req, res) {    
    const params = req.body;
    const email = params.email.toLowerCase();
    const password = params.password;

    User.findOne({ email }, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor." });
        } else {
            if(!userStored) {
                res.status(404).send({ message: "Usuario no encontrado." });
            } else {
                bcrypt.compare(password, userStored.password, (err, isValid) => {
                    if (err) {
                        res.status(500).send({ message: "Error del servidor." });
                    } else if (!isValid) {
                        res.status(404).send({ message: "La contraseña no es correcta." });
                    } else if (!userStored.active) {
                            res.status(200).send({ code: 200, message: "El usuario no está activado." });
                        } else {
                            res.status(200).send({
                                accessToken: jwt.createAccessToken(userStored),
                                refreshToken: jwt.createRefreshToken(userStored)
                            });
                        }
                    }
                )
            }
        }
    });
}

function getUsers(req, res) {
    User.find().then(users => {
        if (!users) {
            res.status(404).send({ message: "No se ha encontrado ningún usuario" });
        } else {
            res.status(200).send({ users });
        }
    });
}

function getUsersActive(req, res) {
    const query = req.query;

    User.find({ active: query.active }).then(users => {
        if (!users) {
            res.status(404).send({ message: "No se ha encontrado ningún usuario" });
        } else {
            res.status(200).send({ users });
        }
    });
}

function upLoadAvatar(req, res) {
    const params = req.params;
    
    User.findById({ _id: params.id }, (err, userData) => {
        if (err) {
            return res.status(500).send({ message: "Error del servidor." });
        } else {
            if (!userData) {
                return res.status(404).send({ message: "No se ha localizado el usuario." });
            }
        }
        
        let user = userData;

        if (req.files) {
            let filePath = req.files.avatar.path;

            console.log("Ruta imagen:"+ filePath);

            let fileSplit = filePath.split("\\");
            let fileName = fileSplit[fileSplit.length - 1];
            let extensionSplit = fileName.split(".");
            let fileExt = extensionSplit[1]

            if (fileExt !== "png" && fileExt !== "jpg") {
                return res.status(400).send({ message: "Formato de imagen no es válida. Extensiones permitidas: jpg y png." });
            }
            user.avatar = fileName;
            User.findByIdAndUpdate( { _id: params.id}, user, (err, userResult) => {
                if (err) {
                    return res.status(500).send({ message: "Error del servidor." });
                } else {
                    if (!userResult) {
                        return res.status(404).send({ message: "No se ha localizado el usuario." });
                    }
                }
                res.status(200).send({ avatarName: fileName });
            });
        }
    });
}

function getAvatar(req, res) {
    const avatarName = req.params.avatarName;
    const filePath = "./uploads/avatar/" + avatarName;

    fs.exists(filePath, exists => {
        if (!exists) {
            res.status(404).send({ message: "El avatar no existe." });
        } else {
            res.sendFile(path.resolve(filePath));
        }
    });
}

module.exports = {
    signUp,
    signIn,
    getUsers,
    getUsersActive,
    upLoadAvatar,
    getAvatar,
};