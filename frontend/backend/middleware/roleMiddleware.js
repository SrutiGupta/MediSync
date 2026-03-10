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

      // convert roles to lowercase for safe comparison
      const userRole = user.role.toLowerCase()
      const allowedRoles = roles.map(role => role.toLowerCase())

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          message: "Access denied. You do not have permission"
        })
      }

      // attach user to request
      req.user = user

      next()

    } catch (error) {
      return res.status(500).json({
        message: "Role authorization error",
        error: error.message
      })
    }
  }
}

export default authorizeRoles