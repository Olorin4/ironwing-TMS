import { prisma } from "../../config/prisma.client.js";
import { emailClient, emailAdmin } from "../../services/email.service.js";

export async function submitSignUpForm(formData) {
    const {
        firstName: first_name,
        lastName: last_name,
        email,
        phone,
        fleetSize: fleet_size,
        trailerType: trailer_type,
        plan,
    } = formData;

    if (
        !first_name ||
        !last_name ||
        !email ||
        !phone ||
        !fleet_size ||
        !trailer_type ||
        !plan
    ) {
        throw new Error("All fields are required.");
    }

    const result = await prisma.signUpForm.create({
        data: {
            first_name,
            last_name,
            email,
            phone,
            fleet_size,
            trailer_type,
            plan,
            status: "pending",
        },
    });

    await emailClient(
        email,
        "Thank You for Signing Up!",
        `<pre>
        Hello ${first_name},

        Thank you for signing up with Iron Wing Dispatching. 
        We will contact you shortly.
        </pre>`
    );

    await emailAdmin(
        "🚛 New Sign-Up Form Received",
        `<pre>
        📩 A new sign-up form has been received!

        👤 Name: ${first_name} ${last_name}
        📧 Email: ${email}
        📞 Phone: ${phone}
        🚛 Fleet Size: ${fleet_size}
        🛻 Trailer Type: ${trailer_type}
        📌 Plan Selected: ${plan} 

        🕒 Submitted At: ${new Date().toLocaleString()}
        </pre>`
    );

    return result;
}

export async function submitContactForm(formData) {
    const { email, phone, message } = formData;

    if (!email || !message) {
        throw new Error("Email and message are required.");
    }

    const result = await prisma.contactSubmission.create({
        data: formData,
    });

    await emailClient(
        email,
        "Thank You for contacting us!",
        `<pre>
        Hello,
        
        Thank you for contacting Iron Wing Dispatching. We will reach out soon.
        </pre>`
    );

    await emailAdmin(
        "🚛 New Contact Form submission",
        `<pre>
        📩 A visitor submitted a question!

        📧 Email: ${email}
        📞 Phone: ${phone}
        📝 Message: ${message}

        🕒 Submitted At: ${new Date().toLocaleString()} 
        </pre>`
    );

    return result;
}

export async function fetchAllSignUpForms(limit = 50, offset = 0) {
    return prisma.signUpForm.findMany({
        take: limit,
        skip: offset,
    });
}

export async function fetchAllContactForms(limit = 50, offset = 0) {
    return prisma.contactForm.findMany({
        take: limit,
        skip: offset,
    });
}