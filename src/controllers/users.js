import { createUser, findUserByEmail, verifyPassword } from "../models/users.js";


export async function processRegisterForm(req, res){

    
    const formData = req.body;
   
    //validation
    if (!formData.name || !formData.email || !formData.password) {
        req.flash("error","Missing Fields - Fill Out All Fields");
        return res.redirect("/register");
    }

    const user = await findUserByEmail(formData.email);
    if (user) {
        req.flash("error","Email Already In Use");
        return res.redirect("/register");
        }

    if(formData.password != formData.confirmPassword){

        req.flash("error","Passwords Do Not Match");
        return res.redirect("/register");
    }

    try{
        await createUser(formData.name, formData.email, formData.password);

        req.flash("success", "Sucessfully Created User");
        return res.redirect("/login"); //sign into newly created account

    }catch(error){

        req.flash("error","Internal Error - Could Not Create User");
        return res.redirect("/register");
    }

}

export async function processLoginForm(req, res){
    const formData = req.body;

    //validation
    if (!formData.email || !formData.password) {
        
        req.flash("error","Missing Fields - Fill Out All Fields");
        return res.redirect("/login");
    }


    try{
        const user = await findUserByEmail(formData.email);
        if (!user) {
            req.flash("error","User Not Found");
            return res.redirect("/login");
        }


        const isMatch = await verifyPassword(formData.password, user.passwordHash);
        if (!isMatch) {

            req.flash("error","Invalid Password");
            return res.redirect("/login");
        }

        // In the successful-login branch of the login controller
        req.session.user = {
        id: user._id.toString(),
        name: user.name,
        role: user.role.name // for example, 'customer' or 'admin'
        };
        req.flash("success","Logged In");
        return res.redirect('/');

    }catch(error){
        console.error("Error during login:", error);

        req.flash("error","Internal Service Error - Could Not Log In");
        return res.redirect("/login");
    }
}
export async function processLogout(req, res){
    if (req.session.user) {
        delete req.session.user;
    }

    req.flash('success', 'Logout successful!');
    res.redirect('/login');
};