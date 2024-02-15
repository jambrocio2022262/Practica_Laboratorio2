const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') =>{
    return  new Promise((resolve, reject)=>{
        const paylod = { uid }
        jwt.sign(
            paylod,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '1h',
            },
            (err, token)=>{
                err ? (console.log(err),reject('No se puede generar el token')): resolve(token);
            }
        );
    });
};

module.exports ={
    generarJWT
}