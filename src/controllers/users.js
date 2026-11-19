import { createUser, findUserByEmail, verifyPassword } from "../models/users.js";


export async function register(req, res){

    
    const formData = req.body;
    console.log(formData);
    //validation
    if (!formData.name || !formData.email || !formData.password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if(formData.password != formData.confirmPassword){
        console.log(formData.password, formData.confirmPassword)
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try{
        await createUser(formData.name, formData.email, formData.password);
        return res.status(201).json({ message: "User created successfully" });
    }catch(error){
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Error creating user" });
    }

}

export async function login(req, res){
    const formData = req.body;

    //validation
    if (!formData.email || !formData.password) {
        return res.status(400).json({ message: "All fields are required" });
    }


    try{
        const user = await findUserByEmail(formData.email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user);

        const isMatch = await verifyPassword(formData.password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        return res.status(200).json({ message: "Login successful" });
    }catch(error){
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Error during login" });
    }
}
export async function logout(){}