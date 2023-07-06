const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');
const { convert } = require('html-to-text');
const juice = require('juice');
exports.sendEmail = async (email, subject, link, templateName, name) => {
    const templatePath = `templates/${templateName}.html`;
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST_MAIL,
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.PASS_MAIL,
            },
        });
        const options = {
            from: process.env.USER_MAIL,
            to: email,
            subject: subject,
        };
        if (templateName && fs.existsSync(templatePath)) {
            const template = fs.readFileSync(templatePath, 'utf-8');
            const html = ejs.render(template, { link: link, nameUser: name });

            // const text = convert(html);
            const htmlWithStylesInlined = juice(html);
            options.html = htmlWithStylesInlined;
            //options.text = text;
        }

        await transporter.sendMail(options);
        console.log('email sent sucessfully');
    } catch (error) {
        console.log(error, 'email not sent');
    }
};
