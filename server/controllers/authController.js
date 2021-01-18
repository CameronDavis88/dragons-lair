const bcrypt = require('bcryptjs')

module.exports ={
    register: async(req, res) => {
        const {userName, password, isAdmin} = req.body;
        const db = req.app.get('db');
    const result = await db.get_user([userName]);
    const exitingUser = result[0]
    if(exitingUser){
        return res.status(409).send('Username taken')
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const registeredUser = await db.register_user([isAdmin, userName, hash]);

   user = registeredUser[0];

   req.session.user = {
       isAdmin: user.is_admin,
       id: user.id,
       username: user.username
   }

    res.status(201).send(req.session.user);
}
}