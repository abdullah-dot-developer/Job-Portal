import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        // console.log(companyName);

        if (!companyName) {
            return res.status(400).json({
                message: "The name of company is mendatory!",
                success: false
            })
        }
        let company = await Company.findOne({ name: companyName })
        // console.log(company);
        if (company) {
            return res.status(401).json({
                message: "A company with this name already exist",
                success: false
            })
        }

        company = await Company.create({
            name: companyName,
            userId: req.id
        })
        return res.status(201).json({
            message: "Company registered successfully!",
            company,
            success: true
        })

    } catch (error) {
        console.log("Error occured in registerCompany controller: ", error)
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "You don't have any registered company yet!",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log("Error occured in getCompany controller: ", error)
    }
}
// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found!",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log("Error occured in getCompanyById controller: ", error)

    }
}
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        // console.log(name, description, website, location)
        const file = req.file;
        // console.log(file)
        if (!file) {
            return res.status(400).json({
                message: "File not provided",
                success: false,
            });
        }
        // idhar cloudinary ayega
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

        const updateData = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        // console.log(company)

        if (!company) {
            return res.status(404).json({
                message: "Company not found!",
                success: false
            })
        }
        await company.save();
        return res.status(200).json({
            message: "Company information updated!",
            success: true
        })

    } catch (error) {
        console.log("Error occured in updateCompany controller: ", error)

    }
}