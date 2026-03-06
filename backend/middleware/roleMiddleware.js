import User from "../models/user.model.js"

const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    try {

      const user = await User.findById(req.userId)

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        })
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({
          message: "Access denied. You do not have permission"
        })
      }

      next()

    } catch (error) {

      return res.status(500).json({
        message: "Role authorization error"
      })

    }
  }
}

export default authorizeRoles