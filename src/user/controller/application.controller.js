import ResponseHandler from "../../../utils/responseHandler.js";
import { AddApplication as AddApplicationRepo, GetAllApplications as GetAllApplicationsRepo, GetApplicationById as GetApplicationByIdRepo, DeleteApplicationById as DeleteApplicationByIdRepo } from "../models/application.repository.js";

export const AddApplication = async (req, res, next) => {
  try {
    const application = req.body;
    const newApplication = await AddApplicationRepo(application);
    if (newApplication) {
      new ResponseHandler(201, "Applied successfully", application, true).sendResponse(res);
    }
  } catch (error) {
    next(error)
  }
}

export const GetAllApplications = async (req, res, next) => {
  try {
    const applications = await GetAllApplicationsRepo();
    if (applications.length > 0) {
      new ResponseHandler(200, "All applications retrieved successfully", applications, true).sendResponse(res);
    } else {
      new ResponseHandler(200, "No applications found", [], true).sendResponse(res);
    }
  } catch (error) {
    next(error);
  }
}

export const GetApplicationById = async (req, res, next) => {
  try {
    const { applicationId } = req.params
    console.log(applicationId);
    const application = await GetApplicationByIdRepo(applicationId);
    if (application) {
      new ResponseHandler(200, "Application retrieved successfully", application, true).sendResponse(res);
    } else {
      new ResponseHandler(404, "Application not found", null, false).sendResponse(res);
    }
  } catch (error) {
    next(error);
  }
}

export const DeleteApplicationById = async (req, res, next) => {
  try {
    // delete/:applicationId
    const { applicationId } = req.params
    const deletedApplication = await DeleteApplicationByIdRepo(applicationId);
    if (deletedApplication) {
      new ResponseHandler(200, "Application deleted successfully", deletedApplication, true).sendResponse(res);
    } else {
      new ResponseHandler(404, "Application not found", null, false).sendResponse(res);
    }
  } catch (error) {
    next(error);
  }
}
