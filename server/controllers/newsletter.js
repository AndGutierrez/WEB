const NewsLetter = require("../models/newsletter");

function suscribeNewsletter(req, res) {
    const newsletter = new NewsLetter();
    
    const { email } = req.body;

    if (!email) {
        res.status(500).send({ message: "El correo electrónico es obligatoria."});
    } else {
        newsletter.email = email.toLowerCase();
        newsletter.save((err, newsletterStored) => {
                if (err) {
                    res.status(500).send({ message: "El correo electrónico ya está subscrito a las newsletter."} );
                }
                else {
                    if (!newsletterStored) {
                        res.status(404).send({message: "Error al suscribirse a las newsletter."});
                    }
                    res.status(200).send({message: "Correo electrónico suscrito a las newsletter correctamente."});
                } 
            });
        }    
}

module.exports = {
    suscribeNewsletter
};