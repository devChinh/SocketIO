const User = require('../model/userModel')
const bcrypt = require('bcrypt')

module.exports.register = async (req , res , next) => {
    try {
    const {username , email , password } = req.body;


    // tìm và so sánh username vừa nhập và username trong database 
    // nếu trùng thì k được tạo 
    const usernameCheck = await User.findOne({ username})

    if(usernameCheck){
        return res.json({ msg : "username already used" , status : false})
    }

    //  tìm và so sánh email vừa nhập và username trong database 
    const emailCheck = await User.findOne({ email })

    if(emailCheck){
        return res.json({ msg : "email already used" , status : false})
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password , 10)

    const user = await User.create({
        username , email , password : hashedPassword
    })

    delete user.password

    return res.json({status : true , user})

    } catch (error) {
        next(error)
    }
}

module.exports.login = async (req , res , next) => {
    try {
    const {username  , password } = req.body;

    // tìm đến User có username vừa nhập 
    const userCheck = await User.findOne({ username})

    // nếu tìm k thấy user đăng nhập trong data base
    if(!userCheck){
        return res.json({ msg : "Incorrect username or password" , status : false})
    }

    // hàm compare so sáng password vừa nhập và password trong database
    const isPasswordValid = await bcrypt.compare(password, userCheck.password)
    
    // nếu k tìm thấy và trùng với password trong database thì báo lỗi 
    if(!isPasswordValid) {
        return res.json({ msg : "Incorrect usename or passwor" , status : false})
    }

    delete userCheck.password

    return res.json({status : true , userCheck })

    } catch (error) {
        next(error)
    }
}

module.exports.setAvatar = async (req , res , next) => {
    try {

        console.log('============= req.params',req.params)
        const userId = req.params.id;

        // link image avatar
        const avatarImage = req.body.image;

        const userData = await User.findByIdAndUpdate(userId , {
            isAvatarImageSet : true, // set avatar true
            avatarImage  // save link image avatar
        },
        {
            new : true
        }
        )

        console.log('============= userData',userData)

        return res.json({isSet : userData.isAvatarImageSet , image : userData.avatarImage })
    } catch (error) {
        next(error)
    }
}


module.exports.getAllUsers = async (req, res, next) => {
    try {
        console.log('============= req.params.id',req.params.id)
        const users = await User.find({_id:{$ne: req.params.id}}).select([
            "email" , "username" , "avatarImage", "_id"
         ])
         return res.json(users)
    } catch (error) {
        next(error);
    }
}