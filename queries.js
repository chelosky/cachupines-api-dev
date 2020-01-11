const { pool } = require('./config');

const getSexos = (request, response) => {
    try {
        pool.query('SELECT * FROM SEXO', (error, results) => {
            if (error) {
                response.status(500).json({status: false, error});
            }else{
                response.status(200).json({status: true, body: results.rows});
            }
          });    
    } catch (error) {
        response.status(400).json({status: false, error});
    }
    
};

const getTamano = (request, response) => {
    try {
        pool.query('SELECT * FROM TAMANO', (error, results) => {
            if (error) {
                response.status(500).json({status: false, error});
            }else{
                response.status(200).json({status: true, body: results.rows});
            }
        });    
    } catch (error) {
        response.status(400).json({status: false, error});
    }
};

const getCaracteres = (request,response)=>{
    try{
        pool.query('SELECT * FROM CARACTER',(error,results)=>{
            if (error) {
                response.status(500).json({status: false, error});
            }else{
                response.status(200).json({status: true, body: results.rows});
            }
        });
    }catch(error){
        response.status(400).json({status:false,error});
    }
};

const getCachupines = (request,response)=>{
    try{
        pool.query(`SELECT p.idperro,p.nombreperro,p.colorperro,p.fechanacimiento,p.edad,
                            p.foto,p.estados_n,t.descripciontamano as tamano, s.descripcionsexo as sexo,
                            c.descripcioncaracter as caracter
                    FROM PERRO p, CARACTER c, TAMANO t, SEXO s
                    WHERE p.idtamano = t.idtamano and p.idsexo = s.idsexo and p.idcaracter = c.idcaracter
                    ORDER BY p.idperro ASC`,(error,results)=>{
            if (error) {
                response.status(500).json({status: false, error});
            }else{
                response.status(200).json({status: true, body: results.rows});
            }
        });
    }catch(error){
        response.status(400).json({status:false,error});
    }
};

const getCachupinById = (request,response) =>{
    try{
        const id = parseInt(request.params.id);
        pool.query(`SELECT p.idperro,p.nombreperro,p.colorperro,p.fechanacimiento,p.edad,
                    p.foto,p.estados_n,t.descripciontamano as tamano, s.descripcionsexo as sexo,
                    c.descripcioncaracter as caracter
                    FROM PERRO p, CARACTER c, TAMANO t, SEXO s
                    WHERE p.idtamano = t.idtamano and p.idsexo = s.idsexo and p.idcaracter = c.idcaracter
                          and p.idPerro = $1`, [id],(error,results)=>{
            if (error) {
                response.status(500).json({status: false, error});
            }else{
                if(results.rows.length > 0){
                    response.status(200).json({status: true, body: results.rows});
                }else{
                    response.status(200).json({status: false, error: 'No hay Tuplas'});
                }
            }
        });
    }catch(error){
        response.status(400).json({status:false,error});
    }
};

// app.post('/users', db.createUser)
// const createUser = (request, response) => {
//     const { name, email } = request.body
  
//     pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(201).send(`User added with ID: ${result.insertId}`)
//     })
//   }

// app.put('/users/:id', db.updateUser)
// const updateUser = (request, response) => {
//     const id = parseInt(request.params.id)
//     const { name, email } = request.body
  
//     pool.query(
//       'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//       [name, email, id],
//       (error, results) => {
//         if (error) {
//           throw error
//         }
//         response.status(200).send(`User modified with ID: ${id}`)
//       }
//     )
//   }

// app.delete('/users/:id', db.deleteUser)
// const deleteUser = (request, response) => {
//     const id = parseInt(request.params.id)
  
//     pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`User deleted with ID: ${id}`)
//     })
//   }

module.exports = {
    getSexos,
    getTamano,
    getCachupines,
    getCachupinById,
    getCaracteres
};
