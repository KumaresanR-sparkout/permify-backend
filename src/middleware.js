import { client } from "./permify";

//Middleware function checks authorization works to allow user for particular role or not
export const authorize = (entityType, permissionType) => {
    return async (req, res, next) => {
        try {
            const check = await client.permission.check(
                {
                    tenantId: "t1",
                    metadata: {
                        snapToken: "",
                        schemaVersion: "",
                        depth: 20
                    },
                    entity: {
                        type: `${entityType}`,
                        id: "1"
                    },
                    permission: `${permissionType}`,
                    subject: {
                        type: "user",
                        id: 'alice'
                    }
                }
            )
            console.log("check", check)
            if (check.can != 1) {
                return res.status(401).json({ status_code: 401, status: false, message: 'Unauthorized acess' });
            }
            next();
        }
        catch (error) {
            return res.status(500).json({ status_code: 500, status: false, message: error.message });
        }
    }
};