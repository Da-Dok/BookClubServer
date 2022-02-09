exports.join = (req, res, next) =>{
    res.send('This is join page haha');
}

exports.login = (req, res) =>{
    console.log(req.body);
}