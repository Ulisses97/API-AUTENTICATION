const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const User = require('../models/User')

module.exports = {
  async listarUsuarios(req, res){
    const users = await User.find();
    
    return res.json(users)
  },

  async listarUsuarioId(req, res){
    const id = req.params.id;

    const user = await User.findById(id);
    return res.status(201).json(user)
  },

  async register(req, res){
    // const {name, email, password} = req.body;
    const name = req.body.name, email = req.body.email, password = req.body.password;
    
    let newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = password;

    newUser.save( function(err, savedUser){
      if(err) {return res.status(500).send({mensage: 'Não foi possivel Cadastrar'}); }

      return res.status(200).send({newUser});
    });


  },
  async login(req,res){
    const email = req.body.email, password = req.body.password;
    
    const user = await User.findOne({email});
    if(!null){

      //const {password} = user;

      bcrypt.compare(password, user.password, (err, resultado) => {
        if(err){return res.status(401).send({mensagem: 'Falha na autenticação'})}

        if(resultado){
          const token = jwt.sign({
            id_usuario: user._id,
            name: user.name,
            email: user.email
          }, 'baguvix',{
            expiresIn: "1h"
          })

          return res.status(201).send({message: "Autenticado com sucesso", token: token})
        }

        return res.status(401).send({message: "Falha na autenticação do usuario"});
      })
      
    }else{
      return res.status(401).send('Não foi possível realizar o login');
    }
  },
  async auth(req,res){
    jwt.verify(req.token, 'baguvix', function(err,data){
      if(err){
        return res.status(403);
      }else{
        return res.json({auth: 'autenticado', data: data})
      }
    })
  }



}
