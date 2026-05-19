import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

/**
const healthCheack = async (req, res,next) => {
  try {
    const user = await getUserFromDB()
    res
      .status(200)
      .json(
        new ApiResponse(200, { server: "running" }, "Health check success"),
      );
  } catch (error) {
     next(error)
  }
};
*/

const healthCheack = asyncHandler(async (req, res) => {
    res
    .status(200)
    .json(new ApiResponse(200,{message: 'server is running'}))
});

export { healthCheack };
