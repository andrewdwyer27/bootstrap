export default async function handler(req, res) {
    // check if get request
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    return res.status(200).json({ message: "hello" });
}