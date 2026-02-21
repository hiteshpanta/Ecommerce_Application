import jwt from 'jsonwebtoken';




export const checkUser = (req, res, next) => {
    const token = req.headers.authorization;
 
    if(!token) return res.status(401).json({
            status: 'Error',
            message: 'unauthoized'
        });
    try {
        const decode = jwt.verify(token, 'secret');
        // if ( !decode) return res.status(401).json({
        //     status: 'Error',
        //     data: 'you are not authoized'
        // });
        req.userId = decode.id;
        req.role = decode.role

        next();
        
    } catch (err) {
        return res.status(401).json({
            status: 'Error',
            message: err.message
        });
        
    }
    
}


export const checkAdmin = (req, res, next) => {
    if (req.role === 'admin') return next();
    return res.status(401).json({
        status: 'error',
        message: 'you are not authorized'
    });
}