import ApplicationErrorHandler from "../../../utils/errorHandler.js";
import ApplicationModel from "./application.model.js";

export const AddApplication = async (data) => {
  try {
    const application = new ApplicationModel(data)
    await application.save();
    return data
  } catch (error) {
    throw new ApplicationErrorHandler(error.message, error.code || 500);
  }
}

export const GetAllApplications = async () => {
  try {
    const applications = await ApplicationModel.find();
    return applications;
  } catch (error) {
    throw new ApplicationErrorHandler(error.message, error.code || 500);
  }
}

export const GetApplicationById = async (id) => {

  try {
    const application = await ApplicationModel.findById(id);
    if (!application) {
      throw new ApplicationErrorHandler("Application not found", 404);
    }
    return application;
  } catch (error) {
    throw new ApplicationErrorHandler(error.message, error.code || 500);
  }
}

export const DeleteApplicationById = async (id) => {
  try {
    const application = await ApplicationModel.findByIdAndDelete(id);
    if (!application) {
      throw new ApplicationErrorHandler("Application not found", 404);
    }
    return application;
  } catch (error) {
    throw new ApplicationErrorHandler(error.message, error.code || 500);
  }
}
