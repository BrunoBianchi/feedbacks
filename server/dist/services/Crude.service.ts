import { PrismaClient } from "@prisma/client";
import { User } from "../interfaces/User.interface";
import bcrypt from "bcrypt"

const prisma = new PrismaClient();
export class CrudeService {
    public async findUser(email: string) {
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        }) || null;
        return user;
    }
    public async findUserById(userId: string) {
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        }) || null;
        return user;
    }

    public async createUser(user: User) {
        if (await this.findUser(user.email)) {
            throw 'Email already taken!'
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        const userObject = await prisma.user.create({
            data:
                user
        })
        return userObject;
    }

    public async getUserByEmailAndPassword(credentials: { email: string, password: string }) {
        const user = await this.findUser(credentials.email);

        if (!user) {
            throw "Email or password Incorrect!";
        }
        const result = await bcrypt.compare(credentials.password, user.password);
        if (!result) {
            throw "Email or password Incorrect!";
        }
        return user;
    }

    public async findFormWebsite(url: string) {
        const form = await prisma.website.findFirst({
            where: {
                url: url
            }
        }) || null;
        return form;
    }

    public async createFormWebsite(token: string, params: { url: string }) {
        if (!token) {
            console.log("a")
            throw "Permission Denied!"
        }
        if (await this.findFormWebsite(params.url)) {
            throw "website url already registered!"
        }
        if (!await this.findUserById(token)) {

            throw "Permission Denied!"
        }
        try {
            const website = await prisma.website.create({
                data: {

                    url: params.url,
                    userId: token
                }
            })

            return website;
        } catch (err) {
            console.log(err)
            throw "Permission Denied!"
        }

    }

    public async getAllFormsFromUser(userId: string) {
        const forms = await prisma.website.findMany({
            where: {
                userId: userId
            }
        }) || [];
        return forms;
    }

    public async getFormById(id: string) {
        const form = await prisma.website.findFirst({
            where: {
                id: id
            }
        }) || null;
        return form;
    }

    public async getFormByUrl(url: string) {
        const form = await prisma.website.findFirst({
            where: {
                url: url
            }
        }) || null;
        return form;
    }

    public async updateForm(formID: string, params: { form: string[], css: string }) {
        const form = await prisma.website.findFirst({
            where: {
                id: formID
            }
        })
        if (!form) throw "not found!";
        form.css = params.css;
        form.form = params.form;
        const newForm = await prisma.website.update({
            where: {
                id: formID
            },
            data: form
        })
        return newForm;
    }

    public async getFeedbackByEmailFromWebsite(formID: string, user: string) {
        const feedback = prisma.feedback.findFirst({
            where: {
                websiteId: formID,
                user: user
            }
        }) || null;
        return feedback;
    }

    public async getAllFeedbacks(formID: string) {
        const feedback = prisma.feedback.findMany({
            where: {
                websiteId: formID,
            }
        }) || null;
        return feedback;
    }

    public async createFeedback(formUrl: string, params: { user: string, comments: string[], rating: number }) {
        const form = await this.getFormByUrl(formUrl);
        if (!form) throw 'not found!';
        const alreadyFeedback = await this.getFeedbackByEmailFromWebsite(form.id, params.user);
        if (alreadyFeedback) throw 'user already sent feedback to this website!'
        const feedback = prisma.feedback.create({
            data: {
                rating: Number(params.rating),
                comments: params.comments,
                user: params.user,
                websiteId: form.id
            }
        })

        return feedback;
    }
}