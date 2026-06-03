import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail";

const genrateAccesAndRefreshTokens = async (userId) => {
  try {
    const user = User.findById(userId);
    const refreshToken = user.genrateRefreshToken();
    const accessToken = user.genrateAccessToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforesave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while genrating access token",
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // take data from frontend
  const { email, username, password, role } = req.body;

  // find the user if it is already exist
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  // if user exist throw an error
  if (existingUser) {
    throw new ApiError(409, "user already exist");
  }

  //  if not user not exist create new user
  const user = await User.create({
    email,
    username,
    password,
    isEmailVerfied: false,
  });

  //   new user get all these token
  const { unHashedToken, hashedToken, tokenExpiry } =
    user.genrateTemroraryToken();

  ((user.emailVerificationToken = hashedToken),
    (user.emailVerificationExpiry = tokenExpiry));

  user.save({ validateBeforesave: false });

  await sendEmail({
    email: user?.email,
    subject: "please verify youre email",
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      `${req.protocol}//${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`,
    ),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
  );
  if (!createdUser) {
    throw new ApiError(500, "something went wrong while register the user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { user: createdUser },
        "user registerd successfully and verifaction email has been sent to your email ",
      ),
    );
});

export {
  registerUser
}
