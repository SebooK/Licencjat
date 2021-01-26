import asyncHandler from "express-async-handler";
import express from "express";
import auth from "../middleware/auth";
import role from "../middleware/role";

import SemiTrailerService from "../../services/semiTrailer_service";

const router = express.Router();

// /* SemiTrailers Router */

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const semiTrailer = await SemiTrailerService.getSemiTrailers();
    res.json({
      success: true,
      message: "SemiTrailers fetch successfully",
      data: semiTrailer,
    });
  })
);
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { params } = req;
    const semiTrailer = await SemiTrailerService.getSemiTrailers(params.id);
    res.json({
      success: true,
      message: "SemiTrailers fetch successfully",
      data: semiTrailer,
    });
  })
);
router.post(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const { body } = req;
    const semiTrailer = await SemiTrailerService.createSemiTrailer(body);
    res.json({
      success: true,
      message: "SemiTrailers created successfully",
      data: semiTrailer,
    });
  })
);
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { body } = req;
    const semiTrailer = await SemiTrailerService.updateSemiTrailer(body);
    res.json({
      success: true,
      message: "SemiTrailers updated successfully",
      data: semiTrailer,
    });
  })
);
router.delete(
  "/:id",
  [auth, role],
  asyncHandler(async (req, res) => {
    const semiTrailerId = req.params.id;
    const semiTrailer = await SemiTrailerService.deleteSemiTrailer(
      semiTrailerId
    );
    res.json({
      success: true,
      message: "SemiTrailers deleted successfully",
      data: semiTrailer,
    });
  })
);
