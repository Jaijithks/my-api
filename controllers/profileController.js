import { about, skill, profilepic, resume } from "../models/profileMode.js";
import cloudinary from "../config/cloudinaryConfig.js";
import fs from "fs/promises";

export const createOrUpdateAbout = async (req, res, next) => {
    try {
        const { headline, status, projectNo } = req.body;

        let currentAbout = await about.findOne();

        if (currentAbout) {
            currentAbout = await about.findByIdAndUpdate(
                currentAbout._id,
                { headline, status, projectNo },
                { returnDocument: "after" }
            );
        } else {
            currentAbout = await about.create([{ headline, status, projectNo }]);
            currentAbout = currentAbout[0];
        }

        return res.status(200).json({
            success: true,
            message: "About profile saved successfully",
            data: {
                about: currentAbout
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to save about profile"
        });
    }
};

export const getAbout = async (req, res, next) => {
    try {
        const currentAbout = await about.findOne();

        if (!currentAbout) {
            return res.status(404).json({
                success: false,
                message: "No about profile found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "About profile fetched",
            data: {
                about: currentAbout
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch about profile"
        });
    }
};

export const createSkill = async (req, res, next) => {
    try {
        const { title, description, skills } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required"
            });
        }

        const normalizedSkills = Array.isArray(skills)
            ? skills
            : typeof skills === "string" && skills.trim()
                ? [skills.trim()]
                : [];

        const newSkill = await skill.create([{ title, description, skills: normalizedSkills }]);

        return res.status(201).json({
            success: true,
            message: "Skill added successfully",
            data: {
                skill: newSkill[0]
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to add skill"
        });
    }
};

export const getSkills = async (req, res, next) => {
    try {
        const allSkills = await skill.find({});

        return res.status(200).json({
            success: true,
            message: "Skills fetched successfully",
            data: {
                skills: allSkills
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch skills"
        });
    }
};

export const removeSkills = async (req, res, next) => {
    try {
        const { title } = req.params;

        const specificSkill = await skill.findOne({ title });

        if (!specificSkill) {
            return res.status(404).json({
                success: false,
                message: "A skill with that title was not found"
            });
        }

        await specificSkill.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Skill deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to remove the skill"
        });
    }
};

export const uploadProfilePicture = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Profile picture is required"
            });
        }

        const existingProfilePicture = await profilepic.findOne();

        const image = await cloudinary.uploader.upload(req.file.path, { folder: "uploads/profile" });

        if (existingProfilePicture?.public_id) {
            await cloudinary.uploader.destroy(existingProfilePicture.public_id);
        }

        let currentProfilePicture;

        if (existingProfilePicture) {
            currentProfilePicture = await profilepic.findByIdAndUpdate(
                existingProfilePicture._id,
                { profile_url: image.secure_url, public_id: image.public_id },
                { returnDocument: "after" }
            );
        } else {
            currentProfilePicture = await profilepic.create([{ profile_url: image.secure_url, public_id: image.public_id }]);
            currentProfilePicture = currentProfilePicture[0];
        }

        await fs.unlink(req.file.path).catch(() => {});

        return res.status(200).json({
            success: true,
            message: "Profile picture uploaded successfully",
            data: {
                profilePicture: currentProfilePicture
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to upload profile picture"
        });
    }
};

export const getProfilePicture = async (req, res, next) => {
    try {
        const currentProfilePicture = await profilepic.findOne();

        if (!currentProfilePicture) {
            return res.status(404).json({
                success: false,
                message: "No profile picture found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile picture fetched successfully",
            data: {
                profilePicture: currentProfilePicture
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch profile picture"
        });
    }
};
export const uploadResume = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume file is required"
            });
        }

        const existingResume = await resume.findOne();

        if (existingResume?.public_id) {
            await cloudinary.uploader.destroy(existingResume.public_id, { resource_type: "raw" }).catch(() => {});
        }

        const uploaded = await cloudinary.uploader.upload(req.file.path, { folder: "uploads/resume", resource_type: "raw" });

        if (!uploaded) {
            return res.status(500).json({
                success: false,
                message: "No file received from cloudinary"
            });
        }

        let currentResume;

        if (existingResume) {
            currentResume = await resume.findByIdAndUpdate(
                existingResume._id,
                { resume_url: uploaded.secure_url, public_id: uploaded.public_id },
                { returnDocument: "after" }
            );
        } else {
            const created = await resume.create([{ resume_url: uploaded.secure_url, public_id: uploaded.public_id }]);
            currentResume = created[0];
        }

        await fs.unlink(req.file.path).catch(() => {});

        return res.status(200).json({
            success: true,
            message: "Resume uploaded successfully",
            data: {
                resume: currentResume
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Uploading of new resume failed"
        });
    }

};
export const viewResume = async (req, res, next) => {
    try {
        const currentResume = await resume.findOne();

        if (!currentResume) {
            return res.status(404).json({
                success: false,
                message: "No resume found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Resume fetched successfully",
            data: {
                resume: currentResume
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch resume"
        });
    }

};

