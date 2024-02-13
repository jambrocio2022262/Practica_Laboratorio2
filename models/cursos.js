const { Schema, model} = require('mongoose');

const CursoSchema = Schema({
    nombreC:{
        type: String,
        requiere: [true, "Nombre de Curso Obligatorio"]
    },
    estadoC:{
        type: Boolean,
        default: true
    },
    modalidadC:{
        type: String,
        require: [true, "La Modalidad es Obligatoria"]
    }
});

module.exports = model ('Curso', CursoSchema);

