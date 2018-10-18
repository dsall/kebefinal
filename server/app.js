var express = require('express')
var bodyParser = require('body-parser');
var app = express();
var http = require('http')
var socketio = require('socket.io');
var mongoose = require('mongoose');
var capteurs = require('./capteurs');


var server = http.Server(app);
var websocket = socketio(server);
var spaces = {};

mongoose.connect(
    "mongodb+srv://dsall:oycZskkK8cQaO15q@test-rbyf3.mongodb.net/kebzo",  { useNewUrlParser: true }
  );
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})
/*
identifiant , spaces  , occupe
*/
app.post('/upload',function(req, res ){
    const data = new capteurs({
        _id: new mongoose.Types.ObjectId(),
        uid: req.body.uid,
        space: req.body.space,
        status:req.body.status
    });
    capteurs.findOne({uid:req.body.uid})
    .exec()
    .then((doc) =>{
        if (!doc){
    
        data
        .save()
        .then((doc) => {
            console.log(doc);
          res.status(200).json({
         success: true,
               data: doc
            })
        })
        .catch((err) => {
             console.log(err);
            res.status(200).json({
                 success: false,
                 data: err
             })
         })  
         
        }
        else{
            capteurs.findOneAndUpdate({ uid: req.body.uid},{status: req.body.status})
            .exec()
            .then((nambe) => {
                res.status(200).json({
                    success:true,
                    message:'Donnees modifiees'
                })
                // TrouverDesEspaces();
            
            })
            .catch((err) =>{
                res.status(200).json({
                    success: false,
                    data: err
                })
            })

            }
         
    })
    .catch((err) => {
        console.log(err);
    })
    
})

TrouverDesEspaces = () => {
    capteurs.find({status: false})
    //    // Select nous permet de selectionner les parametre a retourner de la base de donnee {uid, space, status} on selectionne space uniquement
       .select('space')
    //    // Exec veux dire lancer la recherche avec mongoose
       .exec()
    //    // Try Catch pour la recherche dans la base de donnee avec kebe comme objet retournee de la recherche contenant tous les documents qui 
    //    //qui ont comme status false 
       .then((kebe) => {
    //        // Si Kebe est > 1 ca veux dire que il ya des places libres 
    //        //Si Kebe est inferieur a 1 ca veux dire qu'il n'y a pas de place 
          if(kebe.length<1){
    //           // Si Kebe est <1 voici la reponse 
            spaces =  {
                plein:true,
                message:'Boul  fi Diegue Parking bi da fessse  ', 
            }
            websocket.emit('test', spaces);
          }
          else{
    //         // Dans le cas ou c'est superieur a 1 
    //         // On 
            console.log(kebe.length);
            var spaces_disponibles = [];
            for(i=0; i < kebe.length; i++){
                spaces_disponibles.push(kebe[i].space);
            }
            spaces = {
                plein:false,
                espace: spaces_disponibles
            }
            websocket.emit('test', spaces);
            // socket.emit('test', response);
            
          }
       }).catch((err)=>{spaces = err;
        websocket.emit('test', spaces);
    })

}

app.get('/test', (req, res) => {
    res.send('ok');
})
// true oto mou ngui fa false oto nekoufa
app.get('/spaces',  (req, res) =>{
// On cherche dans la base de donnee les capteurs dont le status et false wui  veux dire des espaces librre sur le parking
   capteurs.find({status: false})
//    // Select nous permet de selectionner les parametre a retourner de la base de donnee {uid, space, status} on selectionne space uniquement
   .select('space')
//    // Exec veux dire lancer la recherche avec mongoose
   .exec()
//    // Try Catch pour la recherche dans la base de donnee avec kebe comme objet retournee de la recherche contenant tous les documents qui 
//    //qui ont comme status false 
   .then((kebe) => {
//        // Si Kebe est > 1 ca veux dire que il ya des places libres 
//        //Si Kebe est inferieur a 1 ca veux dire qu'il n'y a pas de place 
      if(kebe.length<1){
//           // Si Kebe est <1 voici la reponse 
        res.status(200).json({
            plein:true,
            message:'Boul  fi Diegue Parking bi da fessse  ', 
        })
      }
      else{
//         // Dans le cas ou c'est superieur a 1 
//         // On 
        console.log(kebe.length);
        var spaces_disponibles = [];
        for(i=0; i < kebe.length; i++){
            spaces_disponibles.push(kebe[i].space);
        }
        res.status(200).json({
            plein:false,
            espace: spaces_disponibles
        })
        websocket.emit('test',
             spaces_disponibles)
      }
   }).catch((err)=>{res.send(err)})

})


 
// app.listen(3000);
server.listen(3000, () => console.log('listening on *:3000'));
websocket.on('connection',  (socket) => {
    socket.emit('test', 'Welcome');
    
  });


