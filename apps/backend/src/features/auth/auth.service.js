import bcrypt from "bcryptjs";
import { prisma } from "../../config/prisma.client.js";

export async function registerUserService(data) {
    const { email, password, role, companyId } = data;

    if (!email || !password || !role || !companyId) {
        throw new Error(
            "All fields are required: email, password, role, companyId"
        );
    }

    console.log(`Attempting to create user: ${email}`);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        console.error("User already exists:", email);
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role,
        },
    });

    // Create profile based on role
    if (role === "driver") {
        await prisma.driver.create({
            data: { user_id: newUser.id, company_id: companyId },
        });
    } else if (role === "dispatcher") {
        await prisma.dispatcher.create({
            data: { user_id: newUser.id, company_id: companyId },
        });
    }

    console.log("User created successfully:", newUser);
    return newUser;
}

export async function validateLoginService({ email, password }) {
    
    console.log(`Validating login for email: ${email}`);
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        console.error(`Login failed: User not found for email ${email}`);
        throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        console.error(`Login failed: Invalid password for email ${email}`);
        throw new Error("Invalid credentials");
    }

    console.log(`Login successful for user: ${email}`);
    return user;
}
