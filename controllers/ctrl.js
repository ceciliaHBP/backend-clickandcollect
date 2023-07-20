// const User = require('../models/users')
//const TestClient = require('../models/testUser.js')
//const TestUsers = require('../models/TestBDD/_users')
const Users = require('../models/TestBDD/__users')

const userValidation = require('../validation/uservalidation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db/db')

//enregistrer un user
// const signup = (req, res) => {

//     const { body} = req
//     console.log(req.body)
 
//     const { error } = userValidation(body)
//     if (error) return res.status(401).json({mssg:"erreur ici"})


//     bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
//         if(err){
//             return res.status(500).json({msg:"couldnt hash the password"})
//         } else if( passwordHash){
//             return User.create({...body, password:passwordHash})
//                     .then(() => {
//                     res.status(201).json({ msg: "user created"})
//                     console.log({...body, password:passwordHash})
//                     })
//                     .catch(error => res.status(500).json(error))
//         }
//     })
    
// }

const signup = (req, res) => {
    const { body } = req;
    console.log(req.body);
  
    const { error } = userValidation(body);
    if (error) {
      return res.status(400).json({ message: "Validation error", error: error.details });
    }
  
    bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
      if (err) {
        return res.status(500).json({ message: "Could not hash the password", error: err });
      }
  
      const userData = { ...body, password: passwordHash };
      if (req.body.storeId) {
        userData.storeId = req.body.storeId;
      }
    
      Users.create(userData)
        .then((user) => {
          const userId = user.userId;
           console.log('verif id', userData);
          res.status(201).json({ id: userId, message: "User created" });
          
        })
        .catch((error) => {
          res.status(500).json({ message: "Error creating user", error });
        });
    });
  };
  
  
  

//login d'un user
const login = (req, res) => {
  Users.findOne({where: {email: req.body.email}})
        .then(dbUser => {
            if(!dbUser){
                return res.status(404).json({message:"user not found (login)"})
            }
            else {
                bcrypt.compare(req.body.password, dbUser.password, (err, compaRes) => {
                    if (err){
                        return res.status(202).json({ msg : "error while checkin user password"})
                    } else if (compaRes) {
                        const token = jwt.sign({email: req.body.email}, 'secret', { expiresIn: '1h'})
                        //save user token
                       
                        dbUser.token = token
                        const user = {
                          userId: dbUser.userId,
                          storeId: dbUser.storeId,
                          firstname: dbUser.firstname,
                          lastname: dbUser.lastname,
                          email: dbUser.email
                        };
                        // res.status(200).json({msg : "user logged in", "token": token, "user": dbUser.firstname})
                        res.status(200).json({ message: "Utilisateur connecté", token:token, user: user });
                    } else {
                        res.status(401).json({msg : "invalid credentials"})
                    }
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
}

//lister tous les users
const getAll = (req, res) => {
  Users.findAll({
        attributes : {exclude: ['createdAt', "updatedAt"]}
    })
    .then((users) => {
        res.status(200).json(users)
    })
    .catch(error => res.statut(500).json(error))
}

//lister par id
const getOne = ( req, res) => {
    const { id} = req.params
    //findbyprimarykey
    Users.findByPk(id)
        .then( user => {
            if(!user) return res.status(404).json({msg:"user not found"})
            res.status(200).json(user)
        })
        .catch(error => res.statut(500).json(error))
}

//supprimer un user
const deleteOne = (req, res) => {
    const { id} = req.params
    Users.destroy({where : {id : id}})
    .then( user => {
        if(user === 0) return res.status(404).json({msg:"not found"})
        res.status(200).json({msg:"User deleted"})
    })
    .catch(error => res.statut(500).json(error))
}

//update le magasin rattaché au user
const updateOneUser = (req, res) => {
    const { id } = req.params;
    const { storeId } = req.body;
  
    Users.findByPk(id)
      .then((user) => {
        console.log('User found !!')
        if (!user) {
          console.log('error')
          return res.status(404).json({ msg: "User not found (updateone)" });
        }
  
        user
          .update({ storeId })
          .then(() => {
            res.status(200).json({ msg: "Magasin modifié"});
          })
          .catch((error) => {
            res.status(500).json({ error: "Error updating user" });
          });
      })
      .catch((error) => {
        res.status(500).json({ error: "Error finding user" });
      });
  };

// Modifier le rôle d'un utilisateur
const updateRole = (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    Users.findByPk(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ msg: "User not found" });
        }

        user
          .update({ role }) // Mettez à jour uniquement la propriété "role"
          .then(() => {
            res.status(200).json({ msg: "Rôle modifié" });
          })
          .catch((error) => {
            res.status(500).json({ error: "Error updating user" });
          });
      })
      .catch((error) => {
        res.status(500).json({ error: "Error finding user" });
      });
};

const verifyToken = (req, res) => {
  const token = req.headers['x-access-token'];
  
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', (err, decoded) => {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

      // if everything good, save to request for use in other routes
      req.userId = decoded.id;

      res.status(200).send({ auth: true, message: 'Token is valid.' });
  });
}

//modification du user
const modifyUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateData = req.body;

    // Recherche de l'utilisateur dans la base de données
    const user = await Users.findOne({ where: { userId: userId } });

    if (user) {
      // Mise à jour des champs de l'utilisateur avec les données de mise à jour
      await user.update(updateData);

      // Récupération de l'utilisateur mis à jour
      const updatedUser = await Users.findOne({ where: { userId: userId } });

      return res.status(200).json({ message: 'Utilisateur mis à jour', user: updatedUser });
    } else {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
}



  
module.exports = { signup, login, getAll, getOne, deleteOne, updateOneUser, updateRole, verifyToken, modifyUser };
  


// module.exports =  { signup,login,  getAll, getOne, deleteOne, updateOneUser }