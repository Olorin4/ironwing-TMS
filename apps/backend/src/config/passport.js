import passport from "passport";
import { prisma } from "./prisma.client.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { publicKey } from "../config/keys.generator.js";

// A function to extract the JWT from the HttpOnly cookie
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["jwt"];
    }
    return token;
};

// JWT Strategy (For API, Mobile, and Desktop Users)
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
    ]),
    secretOrKey: publicKey,
    algorithms: ["RS256"],
};

passport.use(
    new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { id: jwt_payload.id },
            });
            if (user) return done(null, user);
            return done(null, false);
        } catch (err) {
            return done(err, false);
        }
    })
);


export default passport;
