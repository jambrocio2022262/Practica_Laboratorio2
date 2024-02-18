const { Schema, model } = require('mongoose');

const EstudianteSchema = Schema({
    nombre:{
        type: String,
        require: [true, "El nombre es obligatorio"]
    },
    correo:{
        type: String,
        require: [true, "El correo es obligatorio"],
        unique: true
    },
    password:{
        type: String,
        require: [true, "La contraseña es Obligatoria"]
    },
    habilidad:{
        type: String,
        require: [true, "La habilidad debe ser definidad"]
    },
    role:{
        type: String,
        require: true,
        enum: ["TEACHER_ROLE", "STUDENT_ROLE"]
    },
    curso:{
        type: [Schema.Types.ObjectId],
        ref: 'Curso'
    },
    estado:{
        type: Boolean,
        default: true
    }
});

EstudianteSchema.methods.toJSON = function(){
    const{ __v, password, _id, ...estudiante } = this.toObject();
    estudiante.uid = _id;
    return estudiante;
}

module.exports = model ('Estudiante', EstudianteSchema);

