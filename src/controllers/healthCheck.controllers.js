import { ApiResponse } from "../utils/api-response.js";

const healthCheack = (req, res) => {
  try {
    res
      .status(200)
      .json(
        new ApiResponse(200, { server: "running" }, "Health check success"),
      );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { healthCheack };
