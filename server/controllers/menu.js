const Menu = require("../models/menu");

function addMenu(req, res) {
    const { title, url, order, active } = req.body; 
    const menu = new Menu();
    menu.title = title;
    menu.url = url;
    menu.order = order;
    menu.active = active;

    menu.save((err, createdMenu) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor." });
        } else {
            if (!createdMenu) {
                res.status(404).send({ message: "Error al crear el menú." });
            }
            res.status(200).send({ message: "Menú creado correctamente." });
        }
    });
}

function getMenus(req, res) {    
    Menu.find()
    .sort({ order: "asc" })
    .exec((err, menus) => {
        if (err){
            res.status(500).send({ message: "Error del servidor." });
        } else {
            if (!menus) {
                res.status(404).send({ message: "No se ha encontrado ningún menú." });
            } else {
                res.status(200).send({ menus });
            }
        }
    });
}

function updateMenu(req, res) {
    let menuData = req.body;
    const params = req.params;

    Menu.findByIdAndUpdate(params.id, menuData, (err, menuUpdated ) => {
        if (err){
            res.status(500).send({ message: "Error del servidor." });
        } else {
            if (!menuUpdated) {
                res.status(404).send({ message: "No se ha encontrado ningún menú." });
            } else {
                res.status(200).send({ message: "Menú actualizado correctamente." });
            }
        }
    });
}

function activateMenu(req, res) {
    const { id } = req.params;
    const { active } = req.body;

    Menu.findByIdAndUpdate(id, { active }, (err, menuUpdated ) => {
        if (err){
            res.status(500).send({ message: "Error del servidor." });
        } else {
            if (!menuUpdated) {
                res.status(404).send({ message: "No se ha encontrado ningún menú." });
            } else {
                if (active === true) {
                    res.status(200).send({ message: "Menú activado correctamente." });
                } 
                res.status(200).send({ message: "Menú desactivado correctamente." });
            }
        }
    });
}

module.exports = {
    addMenu,
    getMenus,
    updateMenu,
    activateMenu,
};