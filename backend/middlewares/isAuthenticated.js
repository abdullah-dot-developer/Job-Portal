import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        console.log(req.cookies)
        const token = req.cookies.token;
        console.log("token", token);

        if (!token) {
            return res.status(401).json({
                message: "User is not authenticated!",
                success: false,
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        // console.log("decoded", decoded);

        if (!decoded) {
            return res.status(401).json({
                message: "Token not found!",
                success: false
            })
        }

        req.id = decoded.userId;
        next();
    } catch (error) {
        console.log("Error occured in isAuthenticated controller: ", error)
    }
}

export default isAuthenticated;