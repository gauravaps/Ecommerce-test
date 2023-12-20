const bcrypt=require('bcryptjs')

exports. haspassword=async(password)=>{
    try {
        const round=10
        const securepassword=await bcrypt.hash(password,round)
        return securepassword
        
    } catch (error) {
        console.log('password not converted into bcrypt',error);
        return securepassword;
        
    }
}

exports.compare=async(password,hashingpassword)=>{
    return bcrypt.compare(password,hashingpassword)
}
