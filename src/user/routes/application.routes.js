import express from 'express';
import { body, validationResult } from 'express-validator';
import { GetAllApplications, AddApplication, GetApplicationById, DeleteApplicationById, } from '../controller/application.controller.js';
import jwtAuth from '../../../middlewares/jwtAuth.middleare.js';
const applicationRouter = express.Router();

// Middleware to parse incoming JSON requests
applicationRouter.use(express.query());

// Validation rules for adding a new application
const addNewApplicationRules = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('phoneNumber')
    .isMobilePhone()
    .withMessage('Phone Number must be 10 characters long'),
  body('name')
    .isLength({ min: 2 })
    .withMessage('Name should be at least 2 characters long'),
  body('description')
    .isLength({ min: 10 })
    .withMessage('Description should be at least 10 characters long'),
];

// Middleware to handle validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

// Route to add a new application
applicationRouter.post('/newapplication', addNewApplicationRules, validateRequest, AddApplication
);

// Route to get all applications
applicationRouter.get('/applications', jwtAuth, GetAllApplications);

// Route to get an application by ID
applicationRouter.get('/get/:applicationId', jwtAuth, GetApplicationById);

// Route to delete the application

applicationRouter.delete('/delete/:applicationId', jwtAuth, DeleteApplicationById);


export default applicationRouter;
