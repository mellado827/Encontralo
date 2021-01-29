const jwt = require('jsonwebtoken');
const Usuarios = require("../models/Usuarios");

//valida que el token sea valido y si ya expiro, genera uno nuevo, de lo contrario no genera nada.
async function checkToken(token){
    let __id = null;
    try {
        const {_id}= await jwt.decode(token);
        __id = _id;
    } catch (e) {
        return false;
    }

    const user = await Usuarios.findOne({__id:__id});

    if (user){
        const token = jwt.sign({_id:__id}, 'clavesecretatoken', {expiresIn:'1d'});
        return {token};
    } else{
        return false;
    }
}

module.exports = {
    //genera el token
    encode: async (_id, nickname) => {
        const token = jwt.sign({_id:_id, nickname:nickname},'clavesecretatoken',{expiresIn: '1d'});
        return token;
    },
    //decodifica el token
    decode:async (token) => {
        try {
            const {_id} = await jwt.verify(token, 'clavesecretatoken');
            const user = await Usuarios.findOne({_id});
            if (user){
                return user
            } else{
                return false;
            }
        } catch (e) {
            const   newToken = await checkToken(token);
            return newToken;
        }
    }
}