export const getUsers = (req,res) => {
    try {
        return res.status(200).json({
            status: 'success',
            data: 'All users'
        })
    } catch (err) {
        return res.status(404).json({
            status: 'Error',
            data: err.message
        })
    }
};


export const getUser = (req,res) => {
    try {
        const { id } = req?.params || {}
        return res.status(200).json({
            status: 'success',
            data: `User ${id}`
        })
    } catch (err) {
        return res.status(404).json({
            status: 'Error',
            data: err.message
        })
    }
}

export const login = (req,res) => {
    try {
        const { id } = req?.params || {}
        return res.status(200).json({
            status: 'success',
            data: `User ${id}`
        })
    } catch (err) {
        return res.status(404).json({
            status: 'Error',
            data: err.message
        })
    }
}

export const register = (req,res) => {
    try {
        const { id } = req?.params || {}
        return res.status(200).json({
            status: 'success',
            data: `User ${id}`
        })
    } catch (err) {
        return res.status(404).json({
            status: 'Error',
            data: err.message
        })
    }
}