const NewsLetter = require("../models/newsletter");

function suscribeNewsletter(req, res) {
    const newsletter = new NewsLetter();
    
    const email = req.params.email;

    if (!email) {
        res.status(500).send({ code: 500, message: "El correo electrónico es obligatorio."});
    } else {
        newsletter.email = email.toLowerCase();
        newsletter.save((err, newsletterStored) => {
                if (err) {
                    res.status(500).send({ code: 500, message: "El correo electrónico ya está subscrito a las newsletter."} );
                }
                else {
                    if (!newsletterStored) {
                        res.status(400).send({ code: 400, message: "Error al suscribirse a las newsletter."});
                    }
                    res.status(200).send({ code: 200, message: "Correo electrónico suscrito a las newsletter correctamente."});
                } 
            });
        }    
}

module.exports = {
    suscribeNewsletter
};